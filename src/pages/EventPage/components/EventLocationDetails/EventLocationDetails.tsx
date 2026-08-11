import type { AddressLocation } from '@src/common-libs/types';
import { MapContainer, SectionTitle } from '@src/components';
import './event-location-details.css';

type EventLocationDetailsProps = {
  addressLocation: AddressLocation;
  canViewExactAddress: boolean;
};

export function EventLocationDetails({
  addressLocation,
  canViewExactAddress,
}: EventLocationDetailsProps) {
  return (
    <section id="event-location-details" className="event-location-details">
      <SectionTitle title="How to Find Us" hideMore />
      <div className="event-location-details__body">
        <div className="event-location-details__info">
          {canViewExactAddress ? (
            <>
              <div className="event-location-details__label">
                Address:
              </div>
              <div className="event-location-details__address">
                <div className="event-location-details__name">{addressLocation.name}</div>
                {addressLocation.address.map(line => (
                  <div key={line}>{line}</div>
                ))}
                <div>{addressLocation.label}</div>
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
            locations={[{
              id: 'event-location',
              lat: addressLocation.lat,
              lng: addressLocation.lng,
              label: addressLocation.label ?? '',
            }]}
            zoom={13}
            isWide
          />
        </div>
      </div>
    </section>
  );
}
