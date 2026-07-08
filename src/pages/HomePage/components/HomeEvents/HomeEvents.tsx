import { useAppSelector } from '@src/store/hooks';
import { SectionHeader, SectionMoreLink } from '@src/pages/HomePage/components/SectionHeader/SectionHeader';
import { EventCard } from './EventCard/EventCard';
import './home-events.css';

export function HomeEvents() {
  const events = useAppSelector(state => state.events.items);

  return (
    <section className="home-events" id="home-events">
      <div className="width-container">
        <div className="home-page__divider"></div>
        <SectionHeader title="Upcoming Events" moreHref="#/events-ui" />
        <div className="home-events__grid">
          {events.map(event => (
            <EventCard key={event.id} event={{ ...event, dateTimeLabel: `${event.dateLabel}, ${event.timeLabel}` }} />
          ))}
        </div>
        <SectionMoreLink href="#/events-ui" variant="footer" />
      </div>
    </section>
  );
}
