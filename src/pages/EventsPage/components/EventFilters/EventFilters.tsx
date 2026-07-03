import { BulletButton } from '../../../../components';
import { TIME_FILTER_OPTIONS, type TimeFilter } from '../../helpers';
import './event-filters.css';

type EventFiltersProps = {
  interestQuery: string;
  onInterestQueryChange: (value: string) => void;
  timeFilter: TimeFilter;
  onTimeFilterChange: (value: TimeFilter) => void;
};

export function EventFilters({
  // interestQuery,
  // onInterestQueryChange,
  timeFilter,
  onTimeFilterChange,
}: EventFiltersProps) {
  return (
    <div className="event-filters">
      <div className="event-filters__field">
        <h3 className="global-heading-text event-filters__label">When:</h3>
        <div
          className="event-filters__time-group"
          role="radiogroup"
          aria-label="Filter by time"
        >
          {TIME_FILTER_OPTIONS.map(option => (
            <BulletButton
              key={option.value}
              selected={timeFilter === option.value}
              onClick={() => onTimeFilterChange(option.value)}
            >
              {option.label}
            </BulletButton>
          ))}
        </div>
      </div>
      
      {/*

      all events / my communities / my interests
      ratings (3 / 4 / 5)
      nearest metro (search)
      */}

      {/* <h2 className="global-title-text event-filters__title">Something specific</h2> */}
      {/* <label className="event-filters__field">
        <input
          type="filter"
          className="event-filters__input"
          placeholder="search..."
          value={interestQuery}
          onChange={event => onInterestQueryChange(event.target.value)}
          aria-label="Search by interest"
        />
      </label> */}
    </div>
  );
}
