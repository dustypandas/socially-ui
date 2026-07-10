import { useMemo } from 'react';
import { useAppSelector } from '@src/store/hooks';
import type { Interest } from '@src/store/slices/interestsSlice';
import './interests-list.css';

type InterestsListProps = {
  searchQuery: string;
  followedInterests: string[];
  maxFollowed: number;
  canFollowMore: boolean;
  onFollow: (interestName: string) => void;
  onUnfollow: (interestName: string) => void;
};

type CategoryGroup = {
  category: string;
  items: Interest[];
};

function isGeneralCategory(category: string): boolean {
  return category.toLowerCase() === 'general';
}

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

  return [...grouped.entries()]
    .map(([category, items]) => ({
      category,
      items,
      totalFollowers: items.reduce((sum, interest) => sum + (interest.followerIds?.length ?? 0), 0),
    }))
    .sort((a, b) => {
      const aGeneral = isGeneralCategory(a.category);
      const bGeneral = isGeneralCategory(b.category);
      if (aGeneral !== bGeneral) return aGeneral ? 1 : -1;

      return b.totalFollowers - a.totalFollowers
        || a.category.localeCompare(b.category);
    })
    .map(({ category, items }) => ({ category, items }));
}

export function InterestsList({
  searchQuery,
  followedInterests,
  canFollowMore,
  onFollow,
  onUnfollow,
}: InterestsListProps) {
  const interests = useAppSelector(state => state.interests.items);
  const followedSet = useMemo(() => new Set(followedInterests), [followedInterests]);
  const categoryGroups = useMemo(
    () => groupInterestsByCategory(interests, searchQuery),
    [interests, searchQuery],
  );

  return (
    <div className="interests-list">
      {categoryGroups.map(group => (
        <section key={group.category} className="interests-list__category">
          <h3 className="interests-list__category-title">{group.category}</h3>
          <ul className="interests-list__grid">
            {group.items.map(interest => {
              const isFollowed = followedSet.has(interest.name);

              return (
              <li
                key={interest.name}
                className={[
                  'interests-list__item',
                  isFollowed && 'interests-list__item--followed',
                ].filter(Boolean).join(' ')}
              >
                <a
                  href="#/interest-one-ui"
                  className="interests-list__link"
                >
                  {interest.name} ({interest.followerIds?.length ?? 0})
                </a>
                {isFollowed
                  ? (<button
                      type="button"
                      className="interests-list__unfollow-btn"
                      onClick={() => onUnfollow(interest.name)}
                    >
                      <span className="interests-list__btn-icon">+</span>
                    </button>
                  )
                  : (<button
                      type="button"
                      className='interests-list__follow-btn'
                      disabled={!canFollowMore}
                      onClick={() => onFollow(interest.name)}
                    >
                      <span className="interests-list__btn-icon">+</span>
                    </button>
                  )
                }
              </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
