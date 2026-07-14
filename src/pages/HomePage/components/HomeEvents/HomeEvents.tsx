import type { EventBasic } from '@src/data';
import { EventCard, SectionTitle, SectionMoreLink } from '@src/components';
import './home-events.css';

type HomeEventsProps = {
  upcomingEvents: EventBasic[];
};

export function HomeEvents({ upcomingEvents }: HomeEventsProps) {
  return (
    <section className="home-events" id="home-events">
      <div className="width-container">
        <div className="home-page__divider"></div>
        <SectionTitle title="Upcoming Events" moreHref="#/events-ui" />
        <div className="home-events__grid">
          {upcomingEvents.map(event => {
            return (
              <EventCard
                key={event.id}
                event={event}
              />
            );
          })}
        </div>
        <SectionMoreLink href="#/events-ui" variant="footer" />
      </div>
    </section>
  );
}
