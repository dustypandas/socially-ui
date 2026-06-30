import { EventCard } from '../../../HomePage/components/EventsSection/EventCard/EventCard';
import type { HomeEvent } from '../../../../store/slices/eventsSlice';
import './events-grid.css';

type EventsGridProps = {
  events: HomeEvent[];
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
