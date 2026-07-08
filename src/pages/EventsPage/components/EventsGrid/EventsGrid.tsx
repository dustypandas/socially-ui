import { EventCard, EventCardEvent } from '@src/pages/HomePage/components/HomeEvents/EventCard/EventCard';
import './events-grid.css';

type EventsGridProps = {
  events: EventCardEvent[];
};

export function EventsGrid({ events }: EventsGridProps) {
  if (events.length === 0) {
    return (
      <p className="events-grid__empty">No events match your filters.</p>
    );
  }

  return (
    <div className="events-grid">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
