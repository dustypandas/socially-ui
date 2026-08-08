import type { AddressLocation } from '@src/common-libs/types';
import { MapContainer, SectionTitle } from '@src/components';
import './event-location-details.css';

type EventLocationDetailsProps = {
  addressLocation: AddressLocation;
  isAttending: boolean;
};

export function EventLocationDetails({
  addressLocation,
  isAttending,
}: EventLocationDetailsProps) {
  return (
    <section className="event-location-details">
      <SectionTitle title="How to Find Us" hideMore />
      <div className="event-location-details__body">
        <div className="event-location-details__info">
          {isAttending ? (
            <>
              <div className="event-location-details__label">
                Address:
              </div>
              <div className="event-location-details__address">
                {addressLocation.address.map(line => (
                  <div key={line}>{line}</div>
                ))}
              </div>
              {addressLocation.nearestMetros.length > 0 && (
                <div className="event-location-details__metros">
                  <div className="event-location-details__label">
                    Nearest metro stations:
                  </div>
                  <ul className="event-location-details__metros-list">
                    {addressLocation.nearestMetros.map(metro => (
                      <li key={metro}>{metro}</li>
                    ))}
                  </ul>
                </div>
              )}
              {addressLocation.extraComments && (
                <p className="event-location-details__extra-notes">
                  {addressLocation.extraComments}
                </p>
              )}
            </>
          ) : (
            <>
              <div className="event-location-details__label">
                Area:
              </div>
              <div className="event-location-details__address">
                {addressLocation.label}
              </div>
              <div className="event-location-details__disclaimer">
                Exact location visible for attendees
              </div>
            </>
          )}
        </div>
        <div className="event-location-details__map">
          <MapContainer
            location={{
              lat: addressLocation.lat,
              lng: addressLocation.lng,
              label: addressLocation.label ?? '',
            }}
            zoom={13}
          />
        </div>
      </div>
    </section>
  );
}
