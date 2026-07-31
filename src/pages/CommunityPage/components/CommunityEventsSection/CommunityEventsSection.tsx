import type { EventBasic } from '@src/data';
import { EventTimeline, SectionTitle, SectionMoreLink } from '@src/components';
import { getUpcomingEventsSectionTitle } from '@src/helpers/labelHelpers';
import './community-events-section.css';

type CommunityEventsSectionProps = {
  events: EventBasic[];
};

export function CommunityEventsSection({ events }: CommunityEventsSectionProps) {
  const isEmpty = events.length === 0;

  return (
    <section className="community-events-section">
      <SectionTitle
        title={getUpcomingEventsSectionTitle(events.length)}
        hideMore={events.length <= 3}
        moreHref="#"
        moreLabel="more events →"
      />
      {isEmpty ? (
        <div className="community-events-section__empty">No upcoming events</div>
      ) : (
        <EventTimeline events={events} />
      )}
      {!isEmpty && (
        <div className="community-events-section__footer">
          <SectionMoreLink href="#" label="See all events" variant="footer" />
        </div>
      )}
    </section>
  );
}
