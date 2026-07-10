import type { EventBasic } from '@src/data';
import { SectionHeader, SectionMoreLink } from '@src/components/SectionHeader/SectionHeader';
import { EventDateHelper } from '@src/utils/eventDateHelper';
import { EventCard } from './EventCard/EventCard';
import './home-events.css';

type HomeEventsProps = {
  upcomingEvents: EventBasic[];
};

export function HomeEvents({ upcomingEvents }: HomeEventsProps) {
  return (
    <section className="home-events" id="home-events">
      <div className="width-container">
        <div className="home-page__divider"></div>
        <SectionHeader title="Upcoming Events" moreHref="#/events-ui" />
        <div className="home-events__grid">
          {upcomingEvents.map(event => {
            const dateHelper = new EventDateHelper(event.startTime);
            return (
              <EventCard
                key={event.id}
                event={{ ...event, dateTimeLabel: dateHelper.dateTimeLabel }}
              />
            );
          })}
        </div>
        <SectionMoreLink href="#/events-ui" variant="footer" />
      </div>
    </section>
  );
}
