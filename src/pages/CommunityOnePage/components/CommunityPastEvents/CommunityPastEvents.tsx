import type { EventBasic } from '@src/data';
import { EventsGrid } from '@src/pages/EventsPage/components/EventsGrid/EventsGrid';
import { SectionHeader } from '@src/components/SectionHeader/SectionHeader';
import { EventDateHelper } from '@src/utils/eventDateHelper';
import './community-past-events.css';

type CommunityPastEventsProps = {
  count: number;
  events: EventBasic[];
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
      <EventsGrid events={events.map(event => {
        const dateHelper = new EventDateHelper(event.startTime, 'community');
        return { ...event, dateTimeLabel: dateHelper.dateLabel };
      })} />
    </section>
  );
}
