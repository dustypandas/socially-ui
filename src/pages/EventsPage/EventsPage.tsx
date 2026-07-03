import { useMemo, useState } from 'react';
import { ColumnsLayout, PageHeader, PageLayout } from '../../components';
import { useAppSelector } from '../../store/hooks';
import { EventFilters, EventsGrid } from './components';
import { filterEvents, getTimeFilterLabel, type TimeFilter } from './helpers';
import './events-page.css';

export function EventsPage() {
  const [interestQuery, setInterestQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('thisWeek');
  const events = useAppSelector(state => state.events.items);
  const interests = useAppSelector(state => state.interests.items);

  const filteredEvents = useMemo(
    () => filterEvents(events, interests, interestQuery, timeFilter),
    [events, interests, interestQuery, timeFilter],
  );

  return (
    <PageLayout>
      <section className="events-page">
        <div className="width-container">
          <ColumnsLayout>
            <ColumnsLayout.Main>
              <PageHeader title={`Upcoming Events - ${getTimeFilterLabel(timeFilter)}`} />
              <EventsGrid events={filteredEvents} />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky={50}>
              <EventFilters
                interestQuery={interestQuery}
                onInterestQueryChange={setInterestQuery}
                timeFilter={timeFilter}
                onTimeFilterChange={setTimeFilter}
              />
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
