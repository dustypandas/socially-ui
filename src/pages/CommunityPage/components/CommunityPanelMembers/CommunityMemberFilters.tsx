import { ButtonsGroup } from '@src/components';
import './community-member-filters.css';

export type CommunityMemberFilterId = 'all' | 'organizers' | 'requests';

const FILTERS = [
  { id: 'all', label: 'All Members' },
  { id: 'organizers', label: 'Organizers' },
  { id: 'requests', label: 'Requests' },
] as const satisfies readonly { id: CommunityMemberFilterId; label: string }[];

type CommunityMemberFiltersProps = {
  query: string;
  onQueryChange: (value: string) => void;
  value: CommunityMemberFilterId;
  onChange: (value: CommunityMemberFilterId) => void;
};

export function CommunityMemberFilters({
  query,
  onQueryChange,
  value,
  onChange,
}: CommunityMemberFiltersProps) {
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
