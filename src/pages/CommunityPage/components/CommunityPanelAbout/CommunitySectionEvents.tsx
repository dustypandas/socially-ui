import type { EventBasic } from '@src/common-libs/types';
import { EventTimeline, SectionTitle, SectionMoreLink } from '@src/components';
import { getUpcomingEventsSectionTitle } from '@src/helpers/labelHelpers';
import './community-section-events.css';

const MAX_DISPLAYED_EVENTS = 3;

type CommunitySectionEventsProps = {
  events: EventBasic[];
  onMoreEventsClick?: () => void;
};

export function CommunitySectionEvents({ events, onMoreEventsClick }: CommunitySectionEventsProps) {
  const isEmpty = events.length === 0;
  const displayedEvents = events.slice(0, MAX_DISPLAYED_EVENTS);

  return (
    <section className="community-section-events">
      <SectionTitle
        title={getUpcomingEventsSectionTitle(events.length)}
        hideMore={events.length <= MAX_DISPLAYED_EVENTS}
        moreHref="#events"
        moreLabel="more events →"
        onMoreClick={(event) => {
          event.preventDefault();
          onMoreEventsClick?.();
        }}
      />
      {isEmpty ? (
        <div className="community-section-events__empty">No upcoming events</div>
      ) : (
        <EventTimeline events={displayedEvents} />
      )}
      {!isEmpty && (
        <div className="community-section-events__footer">
          <SectionMoreLink
            href="#events"
            label="See all events"
            variant="footer"
            onClick={(event) => {
              event.preventDefault();
              onMoreEventsClick?.();
            }}
          />
        </div>
      )}
    </section>
  );
}
