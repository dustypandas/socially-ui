import { ButtonsGroup } from '@src/components';
import './community-member-filters.css';

export type CommunityMemberFilterId = 'all' | 'organisers' | 'requests';

const FILTERS = [
  { id: 'requests', label: 'Requests' },
  { id: 'all', label: 'All Members' },
  { id: 'organisers', label: 'Organisers' },
] as const satisfies readonly { id: CommunityMemberFilterId; label: string }[];

type CommunityMemberFiltersProps = {
  query: string;
  onQueryChange: (value: string) => void;
  value: CommunityMemberFilterId;
  onChange: (value: CommunityMemberFilterId) => void;
  isOrganiser?: boolean;
  requestBadgeCount?: number;
};

export function CommunityMemberFilters({
  query,
  onQueryChange,
  value,
  onChange,
  isOrganiser = false,
  requestBadgeCount = 0,
}: CommunityMemberFiltersProps) {
  const filters = isOrganiser
    ? FILTERS
    : FILTERS.filter(filter => filter.id !== 'requests');
  return (
    <div className="community-member-filters">
      <input
        type="search"
        className="community-member-filters__search"
        placeholder="search..."
        value={query}
        onChange={event => onQueryChange(event.target.value)}
      />
      <div className="community-member-filters__field">
        {/* <h3 className="community-member-filters__label">Show:</h3> */}
        <div className="community-member-filters__group">
          {filters.map(filter => (
            <ButtonsGroup
              key={filter.id}
              selected={value === filter.id}
              onClick={() => onChange(filter.id)}
              className={filter.id === 'requests' ? 'community-member-filters__requests-btn' : undefined}
            >
              {filter.label}
              {filter.id === 'requests' && requestBadgeCount > 0 && (
                <span className="badge-num">{requestBadgeCount}</span>
              )}
            </ButtonsGroup>
          ))}
        </div>
      </div>
    </div>
  );
}
