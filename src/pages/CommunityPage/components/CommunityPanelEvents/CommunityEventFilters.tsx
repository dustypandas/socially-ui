import { ButtonsGroup } from '@src/components';
import './community-event-filters.css';

export type CommunityEventFilterId = 'upcoming' | 'past';

const FILTERS = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
] as const satisfies readonly { id: CommunityEventFilterId; label: string }[];

type CommunityEventFiltersProps = {
  value: CommunityEventFilterId;
  onChange: (value: CommunityEventFilterId) => void;
};

export function CommunityEventFilters({
  value,
  onChange,
}: CommunityEventFiltersProps) {
  return (
    <div className="community-event-filters">
      <div className="community-event-filters__group">
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
  );
}
