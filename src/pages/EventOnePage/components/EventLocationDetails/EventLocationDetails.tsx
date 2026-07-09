import type { EventPageLocation } from '@src/data';
import { MapContainer } from '@src/components';
import './event-location-details.css';

type EventLocationDetailsProps = {
  location: EventPageLocation;
};

export function EventLocationDetails({ location }: EventLocationDetailsProps) {
  return (
    <section className="event-location-details">
      <h3 className="event-location-details__title">How to Find Us</h3>
      <div className="event-location-details__map">
        <MapContainer
          location={{
            lat: location.lat,
            lng: location.lng,
            label: location.name,
          }}
          zoom={13}
        />
      </div>
    </section>
  );
}
