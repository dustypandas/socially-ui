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
  interestQuery,
  onInterestQueryChange,
  timeFilter,
  onTimeFilterChange,
}: EventFiltersProps) {
  return (
    <div className="event-filters">
      <h2 className="global-title-text event-filters__title">Filters</h2>
      <label className="event-filters__field">
        <span className="event-filters__label">Interest:</span>
        <input
          type="search"
          className="event-filters__input"
          placeholder="search"
          value={interestQuery}
          onChange={event => onInterestQueryChange(event.target.value)}
          aria-label="Search by interest"
        />
      </label>
      <div className="event-filters__field">
        <span className="event-filters__label">When:</span>
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
    </div>
  );
}
