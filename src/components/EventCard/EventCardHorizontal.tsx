import IconMapMarker from '@src/assets/icon-map-marker-outline.svg?react';
import IconStar from '@src/assets/icon-star.svg?react';
import type { EventBasic, MemberAvatar } from '@src/data';
import { getAttendeesLabel } from '@src/utils/labelHelpers.js';
import './event-card-horizontal.css';

type EventCardHorizontalProps = {
  event: EventBasic,
};

export function EventCardHorizontal({ event }: EventCardHorizontalProps) {
  const ratingLabel = `${event.rating} (${event.ratingCount} ratings)`;
  const attendeesLabel = getAttendeesLabel(event.attendees);

  return (
    <a href="#/one-event-ui" className="event-card-horizontal" target="_blank">
      <div className="event-card-horizontal__body">
        <h3 className="event-card-horizontal__title">
          {event.title}
        </h3>
        <div className="event-card-horizontal__row">
          <IconMapMarker className="event-card-horizontal__icon event-card-horizontal__icon--location" />
          <span className="event-card-horizontal__text">
            {event.location.label}
          </span>
        </div>
        <div className="event-card-horizontal__row">
          <IconStar className="event-card-horizontal__icon event-card-horizontal__icon--rating" />
          <span className="event-card-horizontal__text">
            {ratingLabel}
          </span>
        </div>
        {event.attendees.avatars.length > 0 && (
          <div className="event-card-horizontal__attendees">
            <div className="event-card-horizontal__attendees-img-container">
              {event.attendees.avatars.map((avatar: MemberAvatar, index: number) => (
                <img
                  key={avatar.id}
                  className="event-card-horizontal__attendee-img"
                  src={avatar.image}
                  alt=""
                  style={{ zIndex: event.attendees.avatars.length - index }}
                />
              ))}
            </div>
            <div className="event-card-horizontal__attendees-label">
              {attendeesLabel}
            </div>
          </div>
        )}
      </div>
      <img className="event-card-horizontal__image" src={event.image} alt="" />
    </a>
  );
}
