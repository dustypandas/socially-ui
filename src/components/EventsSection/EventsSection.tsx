import { useAppSelector } from '../../store/hooks';
import { EventCard } from '../EventCard/EventCard';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import './events-section.css';

export function EventsSection() {
  const events = useAppSelector(state => state.events.items);

  return (
    <section className="events-section">
      <div className="width-container">
        <div className="events-section__section-divider"></div>
        <SectionHeader title="Upcoming Events" />
        <div className="events-section__grid">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
