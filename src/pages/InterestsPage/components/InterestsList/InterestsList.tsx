import { useMemo } from 'react';
import { useAppSelector } from '../../../../store/hooks';
import type { Interest } from '../../../../store/slices/interestsSlice';
import {
  INTEREST_CATEGORY_LABELS,
  INTEREST_CATEGORY_ORDER,
  MAX_ITEMS_PER_CATEGORY,
} from '../../interestsCategories';
import './interests-list.css';

type InterestsListProps = {
  searchQuery: string;
  followedIds: string[];
  maxFollowed: number;
  canFollowMore: boolean;
  onFollow: (interestId: string) => void;
  onUnfollow: (interestId: string) => void;
};

type CategoryGroup = {
  category: string;
  label: string;
  items: Interest[];
};

function groupInterestsByCategory(
  interests: Interest[],
  searchQuery: string,
): CategoryGroup[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = normalizedQuery
    ? interests.filter(interest =>
        interest.name.toLowerCase().includes(normalizedQuery),
      )
    : interests;

  const grouped = new Map<string, Interest[]>();

  for (const interest of filtered) {
    const category = interest.category ?? 'general';
    const items = grouped.get(category) ?? [];
    items.push(interest);
    grouped.set(category, items);
  }

  return INTEREST_CATEGORY_ORDER.flatMap(category => {
    const items = grouped.get(category);
    if (!items?.length) return [];

    return [{
      category,
      label: INTEREST_CATEGORY_LABELS[category] ?? category,
      items: items.slice(0, MAX_ITEMS_PER_CATEGORY),
    }];
  });
}

export function InterestsList({
  searchQuery,
  followedIds,
  canFollowMore,
  onFollow,
  onUnfollow,
}: InterestsListProps) {
  const interests = useAppSelector(state => state.interests.items);
  const followedSet = useMemo(() => new Set(followedIds), [followedIds]);
  const categoryGroups = useMemo(
    () => groupInterestsByCategory(interests, searchQuery),
    [interests, searchQuery],
  );

  return (
    <div className="interests-list">
      {categoryGroups.map(group => (
        <section key={group.category} className="interests-list__category">
          <h3 className="interests-list__category-title">{group.label}</h3>
          <ul className="interests-list__grid">
            {group.items.map(interest => {
              const isFollowed = followedSet.has(interest.id);

              return (
              <li
                key={interest.id}
                className={[
                  'interests-list__item',
                  isFollowed && 'interests-list__item--followed',
                ].filter(Boolean).join(' ')}
              >
                <a
                  href="#"
                  className="interests-list__link"
                >
                  {interest.name} ({interest.followersCount})
                </a>
                {canFollowMore && !isFollowed && (
                  <button
                    type="button"
                    className="interests-list__follow-btn"
                    aria-label={`Follow ${interest.name}`}
                    onClick={() => onFollow(interest.id)}
                  >
                    <span className="interests-list__btn-icon">+</span>
                  </button>
                )}
                {isFollowed && (
                  <button
                    type="button"
                    className="interests-list__unfollow-btn"
                    aria-label={`Unfollow ${interest.name}`}
                    onClick={() => onUnfollow(interest.id)}
                  >
                    <span className="interests-list__btn-icon">+</span>
                  </button>
                )}                
              </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
