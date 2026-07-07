import { useMemo, useState } from 'react';
import { ColumnsLayout, PageHeader, PageLayout } from '@src/components';
import { useAppSelector } from '@src/store/hooks';
import { EventFilters, EventsGrid } from './components';
import {
  filterEvents,
  getTimeFilterLabel,
  type OpenToFilter,
  type TimeFilter,
} from './helpers';
import './events-page.css';

export function EventsPage() {
  const [interestQuery, setInterestQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('thisWeek');
  const [openToFilter, setOpenToFilter] = useState<OpenToFilter>('any');
  const events = useAppSelector(state => state.events.items);
  const interests = useAppSelector(state => state.interests.items);

  const filteredEvents = useMemo(
    () => filterEvents(events, interests, interestQuery, timeFilter, openToFilter),
    [events, interests, interestQuery, timeFilter, openToFilter],
  );

  const filterProps = {
    interestQuery,
    onInterestQueryChange: setInterestQuery,
    timeFilter,
    onTimeFilterChange: setTimeFilter,
    openToFilter,
    onOpenToFilterChange: setOpenToFilter,
  };

  return (
    <PageLayout>
      <section className="events-page">
        <div className="width-container">
          <ColumnsLayout>
            <ColumnsLayout.Main>
              <PageHeader
                title={`Events - ${getTimeFilterLabel(timeFilter)}`}
                backLabel="←&thinsp;Home"
                backHref="#/home-ui"
              />
              <div className="events-page__filters events-page__filters--main">
                <EventFilters {...filterProps} />
              </div>
              <EventsGrid events={filteredEvents.map(event => ({ ...event, dateTimeLabel: `${event.dateLabel}, ${event.timeLabel}` }))} />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky={50} className="events-page__aside">
              <EventFilters {...filterProps} />
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
