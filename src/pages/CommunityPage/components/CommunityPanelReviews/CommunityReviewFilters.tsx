import IconStar from '@src/assets/icon-star.svg?react';
import { ButtonsGroup } from '@src/components';
import './community-review-filters.css';

export type CommunityReviewFilterId = 'all' | '5' | '4' | '3' | '2' | '1';

export type CommunityReviewRatingCountsMap = Record<'1' | '2' | '3' | '4' | '5', number>;

const RATING_FILTERS = [
  { id: 'all', label: 'All' },
  { id: '5', stars: 5 },
  { id: '4', stars: 4 },
  { id: '3', stars: 3 },
  { id: '2', stars: 2 },
  { id: '1', stars: 1 },
] as const satisfies readonly (
  | { id: 'all'; label: string }
  | { id: '1' | '2' | '3' | '4' | '5'; stars: number }
)[];

type CommunityReviewFiltersProps = {
  query: string;
  onQueryChange: (value: string) => void;
  value: CommunityReviewFilterId;
  onChange: (value: CommunityReviewFilterId) => void;
  ratingCountsMap: CommunityReviewRatingCountsMap;
};

function renderRatingFilterLabel(filter: typeof RATING_FILTERS[number]) {
  if ('label' in filter) {
    return filter.label;
  }

  return (
    <span className="community-review-filters__stars">
      {Array.from({ length: filter.stars }, (_, index) => (
        <IconStar key={index} className="community-review-filters__star" />
      ))}
    </span>
  );
}

export function CommunityReviewFilters({
  query,
  onQueryChange,
  value,
  onChange,
  ratingCountsMap,
}: CommunityReviewFiltersProps) {
  return (
    <div className="community-review-filters">
      <input
        type="search"
        className="community-review-filters__search"
        placeholder="search..."
        value={query}
        onChange={event => onQueryChange(event.target.value)}
      />
      <div className="community-review-filters__field">
        <h3 className="community-review-filters__label">Rating</h3>
        <div className="community-review-filters__group">
          {RATING_FILTERS.map(filter => (
            <ButtonsGroup
              key={filter.id}
              selected={value === filter.id}
              onClick={() => onChange(filter.id)}
              className={filter.id === 'all' ? undefined : 'community-review-filters__rating-btn'}
            >
              {renderRatingFilterLabel(filter)}
              {filter.id !== 'all' && ` (${ratingCountsMap[filter.id]})`}
            </ButtonsGroup>
          ))}
        </div>
      </div>
    </div>
  );
}
