import type { HomeEvent } from '../../../../data/dummyData';
import { EventsGrid } from '../../../EventsPage/components/EventsGrid/EventsGrid';
import { SectionHeader } from '../../../HomePage/components/SectionHeader/SectionHeader';
import './community-past-events.css';

type CommunityPastEventsProps = {
  count: number;
  events: HomeEvent[];
};

export function CommunityPastEvents({ count, events }: CommunityPastEventsProps) {
  return (
    <section className="community-past-events">
      <SectionHeader
        title={`Past Events (${count})`}
        hideMore={count <= 3}
        moreHref="#"
        moreLabel="past events →"
      />
      <EventsGrid events={events} />
    </section>
  );
}

