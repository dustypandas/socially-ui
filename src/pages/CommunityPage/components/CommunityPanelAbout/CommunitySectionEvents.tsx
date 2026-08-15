import type { EventBasic } from '@src/common-libs/types';
import { EventTimeline, SectionTitle, SectionMoreLink } from '@src/components';
import { getUpcomingEventsSectionTitle } from '@src/helpers/labelHelpers';
import './community-section-events.css';

type CommunitySectionEventsProps = {
  events: EventBasic[];
  onMoreEventsClick?: () => void;
};

export function CommunitySectionEvents({ events, onMoreEventsClick }: CommunitySectionEventsProps) {
  const isEmpty = events.length === 0;

  return (
    <section className="community-section-events">
      <SectionTitle
        title={getUpcomingEventsSectionTitle(events.length)}
        hideMore={isEmpty || events.length <= 3}
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
        <EventTimeline events={events} />
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
