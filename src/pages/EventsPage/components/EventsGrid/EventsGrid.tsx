import type { EventBasic } from '@src/data';
import { EventCard } from '@src/components';
import './events-grid.css';

type EventsGridProps = {
  events: EventBasic[];
};

export function EventsGrid({ events }: EventsGridProps) {
  if (events.length === 0) {
    return (
      <div className="events-grid__empty">No events match your filters.</div>
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
