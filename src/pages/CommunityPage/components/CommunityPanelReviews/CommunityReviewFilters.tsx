import { ButtonsGroup } from '@src/components';
import './community-review-filters.css';

export type CommunityReviewFilterId = 'all' | '5' | '4' | '3' | '2' | '1';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: '5', label: '5' },
  { id: '4', label: '4' },
  { id: '3', label: '3' },
  { id: '2', label: '2' },
  { id: '1', label: '1' },
] as const satisfies readonly { id: CommunityReviewFilterId; label: string }[];

type CommunityReviewFiltersProps = {
  query: string;
  onQueryChange: (value: string) => void;
  value: CommunityReviewFilterId;
  onChange: (value: CommunityReviewFilterId) => void;
};

export function CommunityReviewFilters({
  query,
  onQueryChange,
  value,
  onChange,
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
          {FILTERS.map(filter => (
            <ButtonsGroup
              key={filter.id}
              selected={value === filter.id}
              onClick={() => onChange(filter.id)}
            >
              {filter.label}
            </ButtonsGroup>
          ))}
        </div>
      </div>
    </div>
  );
}
