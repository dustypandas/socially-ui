import type { EventBasic } from '@src/data';
import { EventsGrid } from '@src/pages/EventsPageClient/components/EventsGrid/EventsGrid';
import { SectionTitle } from '@src/components/SectionTitle/SectionTitle';
import { getPastEventsSectionTitle } from '@src/utils/labelHelpers';
import './community-past-events.css';

type CommunityPastEventsProps = {
  count: number;
  events: EventBasic[];
};

export function CommunityPastEvents({ count, events }: CommunityPastEventsProps) {
  return (
    <section className="community-past-events">
      <SectionTitle
        title={getPastEventsSectionTitle(count)}
        hideMore={count <= 3}
        moreHref="#"
        moreLabel="past events →"
      />
      <EventsGrid events={events} />
    </section>
  );
}
