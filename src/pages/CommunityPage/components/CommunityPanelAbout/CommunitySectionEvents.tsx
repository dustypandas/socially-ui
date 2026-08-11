import type { EventBasic } from '@src/common-libs/types';
import { EventTimeline, SectionTitle, SectionMoreLink } from '@src/components';
import { getUpcomingEventsSectionTitle } from '@src/helpers/labelHelpers';
import './community-section-events.css';

type CommunitySectionEventsProps = {
  events: EventBasic[];
};

export function CommunitySectionEvents({ events }: CommunitySectionEventsProps) {
  const isEmpty = events.length === 0;

  return (
    <section className="community-section-events">
      <SectionTitle
        title={getUpcomingEventsSectionTitle(events.length)}
        hideMore={events.length <= 3}
        moreHref="#"
        moreLabel="more events →"
      />
      {isEmpty ? (
        <div className="community-section-events__empty">No upcoming events</div>
      ) : (
        <EventTimeline events={events} />
      )}
      {!isEmpty && (
        <div className="community-section-events__footer">
          <SectionMoreLink href="#" label="See all events" variant="footer" />
        </div>
      )}
    </section>
  );
}
