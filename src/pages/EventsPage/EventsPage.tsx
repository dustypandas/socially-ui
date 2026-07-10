import { useState } from 'react';
import { ColumnsLayout, PageHeader, PageLayout } from '@src/components';
import { EventsFilters, EventsGrid } from './components';
import { TIME_FILTER_LABELS, type OpenToFilter, type TimeFilter, } from '@src/data';
import { useEventsStates } from './useEventsStates';
import './events-page.css';

export function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('thisWeek');
  const [openToFilter, setOpenToFilter] = useState<OpenToFilter>('any');
  const { filteredEvents } = useEventsStates(searchQuery, timeFilter, openToFilter);

  const filterProps = {
    interestQuery: searchQuery,
    onInterestQueryChange: setSearchQuery,
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
                title={`Events - ${TIME_FILTER_LABELS[timeFilter]}`}
                backLabel="←&thinsp;Home"
                backHref="#/home-ui"
              />
              <div className="events-page__filters events-page__filters--main">
                <EventsFilters {...filterProps} />
              </div>
              <EventsGrid events={filteredEvents} />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky={50} className="events-page__aside">
              <EventsFilters {...filterProps} />
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
    </PageLayout>
  );
}
