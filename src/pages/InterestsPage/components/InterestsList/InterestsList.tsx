import { useMemo } from 'react';
import { followedInterestIds } from '../../../../data/dummyData.js';
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

export function InterestsList({ searchQuery }: InterestsListProps) {
  const interests = useAppSelector(state => state.interests.items);
  const followedSet = useMemo(() => new Set(followedInterestIds), []);
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
            {group.items.map(interest => (
              <li key={interest.id} className="interests-list__item">
                <a href="#" className="interests-list__link">
                  {interest.name} ({interest.followersCount})
                </a>
                {!followedSet.has(interest.id) && (
                  <span className="interests-list__follow-btn" aria-hidden="true">
                    +
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
