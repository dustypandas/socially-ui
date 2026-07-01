import { useAppSelector } from '../../../../store/hooks';
import { EventCard } from './EventCard/EventCard';
import { SectionHeader } from '../../../../components/SectionHeader/SectionHeader';
import './events-section.css';

export function EventsSection() {
  const events = useAppSelector(state => state.events.items);

  return (
    <section className="events-section" id="home-events">
      <div className="width-container">
        <div className="global__page-divider"></div>
        <SectionHeader title="Upcoming Events" moreHref="#/events-ui" />
        <div className="events-section__grid">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
