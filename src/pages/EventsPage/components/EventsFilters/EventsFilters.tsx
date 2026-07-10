import { ButtonsGroup } from '@src/components';
import {
  OPEN_TO_FILTER_OPTIONS,
  TIME_FILTER_OPTIONS,
  type OpenToFilter,
  type TimeFilter,
} from '@src/data';
import './events-filters.css';

type EventsFiltersProps = {
  // interestQuery: string;
  // onInterestQueryChange: (value: string) => void;
  timeFilter: TimeFilter;
  onTimeFilterChange: (value: TimeFilter) => void;
  openToFilter: OpenToFilter;
  onOpenToFilterChange: (value: OpenToFilter) => void;
};

export function EventsFilters({
  timeFilter,
  onTimeFilterChange,
  openToFilter,
  onOpenToFilterChange,
}: EventsFiltersProps) {
  return (
    <div className="events-filters">
      <div className="events-filters__field">
        <h3 className="events-filters__label">When:</h3>
        <div className="events-filters__time-group">
          {TIME_FILTER_OPTIONS.map(option => (
            <ButtonsGroup
              key={option.value}
              selected={timeFilter === option.value}
              onClick={() => onTimeFilterChange(option.value)}
            >
              {option.label}
            </ButtonsGroup>
          ))}
        </div>
      </div>

      <div className="events-filters__field">
        <h3 className="events-filters__label">Open to:</h3>
        <div className="events-filters__time-group">
          {OPEN_TO_FILTER_OPTIONS.map(option => (
            <ButtonsGroup
              key={option.value}
              selected={openToFilter === option.value}
              onClick={() => onOpenToFilterChange(option.value)}
            >
              {option.label}
            </ButtonsGroup>
          ))}
        </div>
      </div>

      {/*

      all events / Attending (/ by my communities / of my interests)
      ratings (3 / 4 / 5)
      nearest metro (search)
      */}

      {/* <h2 className="global-title-text events-filters__title">Something specific</h2> */}
      {/* <label className="events-filters__field">
        <input
          type="filter"
          className="events-filters__input"
          placeholder="search..."
          value={interestQuery}
          onChange={event => onInterestQueryChange(event.target.value)}
        />
      </label> */}
    </div>
  );
}
