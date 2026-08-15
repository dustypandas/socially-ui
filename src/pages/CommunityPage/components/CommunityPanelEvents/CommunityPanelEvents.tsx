import { useState } from 'react';
import type { EventBasic } from '@src/common-libs/types';
import { ColumnsLayout, CommunityLocations, EventTimeline } from '@src/components';
import { SectionTitle } from '@src/components/SectionTitle/SectionTitle';
import {
  getPastEventsSectionTitle,
  getUpcomingEventsSectionTitle,
} from '@src/helpers/labelHelpers';
import { getMapLocationsFromEvents } from '@src/pages/CommunityPage/helpers';
import { EventsGrid } from '@src/pages/EventsPage/components/EventsGrid/EventsGrid';
import {
  CommunityEventFilters,
  type CommunityEventFilterId,
} from './CommunityEventFilters';
import './community-panel-events.css';

const UPCOMING_PAGE_SIZE = 10;
const PAST_PAGE_SIZE = 9;

type CommunityPanelEventsProps = {
  futureEvents: EventBasic[];
  pastEvents: EventBasic[];
  eventFilter: CommunityEventFilterId;
  onEventFilterChange: (filter: CommunityEventFilterId) => void;
  onScrollToTop?: () => void;
};

export function CommunityPanelEvents({
  futureEvents,
  pastEvents,
  eventFilter,
  onEventFilterChange,
  onScrollToTop,
}: CommunityPanelEventsProps) {
  const pageSize = eventFilter === 'upcoming' ? UPCOMING_PAGE_SIZE : PAST_PAGE_SIZE;
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const events = eventFilter === 'upcoming' ? futureEvents : pastEvents;
  const hasMoreItems = events.length > visibleCount;
  const sectionTitle = eventFilter === 'upcoming'
    ? getUpcomingEventsSectionTitle(events.length)
    : getPastEventsSectionTitle(events.length);

  const handleFilterChange = (filter: CommunityEventFilterId) => {
    onEventFilterChange(filter);
    onScrollToTop?.();
  };

  return (
    <ColumnsLayout>
      <ColumnsLayout.Main>
        <section className="community-panel-events">
          <SectionTitle title={sectionTitle} hideMore />
          {events.length === 0 ? (
            <div className="community-panel-events__empty">
              {eventFilter === 'upcoming' ? 'No upcoming events' : 'No past events'}
            </div>
          ) : (
            <>
              {eventFilter === 'upcoming' ? (
                <EventTimeline events={events.slice(0, visibleCount)} />
              ) : (
                <EventsGrid events={events.slice(0, visibleCount)} />
              )}
              {hasMoreItems && (
                <button
                  type="button"
                  className="community-panel-events__show-more btn-clear-grey"
                  onClick={() => setVisibleCount(current => current + pageSize)}
                >
                  Show more
                </button>
              )}
            </>
          )}
        </section>
      </ColumnsLayout.Main>
      <ColumnsLayout.Aside sticky={58} asideWidth="min(380px, 38%)">
        <div className="community-page__aside">
          <div className="community-page__aside-spacer" />
          <div className="community-page__divider--hidden" />

          <CommunityEventFilters
            value={eventFilter}
            onChange={handleFilterChange}
          />
          <div className="community-page__divider--hidden" />
          <CommunityLocations
            title={eventFilter === 'upcoming' ? 'Upcoming locations' : 'Past locations'}
            locations={getMapLocationsFromEvents(events)}
          />
        </div>
      </ColumnsLayout.Aside>
    </ColumnsLayout>
  );
}
