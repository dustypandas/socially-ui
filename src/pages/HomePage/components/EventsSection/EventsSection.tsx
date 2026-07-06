import { useAppSelector } from '../../../../store/hooks';
import { SectionHeader, SectionMoreLink } from '../SectionHeader/SectionHeader';
import { EventCard } from './EventCard/EventCard';
import './events-section.css';

export function EventsSection() {
  const events = useAppSelector(state => state.events.items);

  return (
    <section className="events-section" id="home-events">
      <div className="width-container">
        <div className="home-page__divider"></div>
        <SectionHeader title="Upcoming Events" moreHref="#/events-ui" />
        <div className="events-section__grid">
          {events.map(event => (
            <EventCard key={event.id} event={{ ...event, dateTimeLabel: `${event.dateLabel}, ${event.timeLabel}` }} />
          ))}
        </div>
        <SectionMoreLink href="#/events-ui" variant="footer" />
      </div>
    </section>
  );
}
