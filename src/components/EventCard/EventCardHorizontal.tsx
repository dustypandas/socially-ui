import IconGroup from '@src/assets/icon-group-outline.svg?react';
import IconMapMarker from '@src/assets/icon-map-marker-outline.svg?react';
import IconStar from '@src/assets/icon-star.svg?react';
import type { EventAttendee, EventBasic } from '@src/common-libs/types';
import { getAttendeesLabel, getEventTimeLabel } from '@src/helpers/labelHelpers.js';
import './event-card-horizontal.css';

type EventCardHorizontalProps = {
  event: EventBasic,
};

export function EventCardHorizontal({ event }: EventCardHorizontalProps) {
  const timeLabel = getEventTimeLabel(event.startTime);
  const ratingLabel = `${event.rating} (${event.ratingCount} ratings)`;
  const attendeesLabel = getAttendeesLabel(event.attendees);

  return (
    <a href="#/one-event-ui" className="event-card-horizontal" target="_blank">
      <img className="event-card-horizontal__image" src={event.image} alt="" />
      <div className="event-card-horizontal__body">
        <div className="event-card-horizontal__meta">
          <div className="event-card-horizontal__meta-left">
            <div className="event-card-horizontal__time">
              {timeLabel}
            </div>
          </div>
          <div className="event-card-horizontal__meta-right">
            <div className="event-card-horizontal__row">
              <IconStar className="event-card-horizontal__icon event-card-horizontal__icon--rating" />
              <span className="event-card-horizontal__text">
                {ratingLabel}
              </span>
            </div>
          </div>
        </div>
        <h3 className="event-card-horizontal__title">
          {event.title}
        </h3>
        <div className="event-card-horizontal__row">
          <IconGroup className="event-card-horizontal__icon" />
          <span className="event-card-horizontal__text">
            {event.community.name}
          </span>
        </div>
        <div className="event-card-horizontal__meta">
          <div className="event-card-horizontal__meta-left">
            <div className="event-card-horizontal__row">
              <IconMapMarker className="event-card-horizontal__icon event-card-horizontal__icon--location" />
              <span className="event-card-horizontal__text">
                {event.location.label}
              </span>
            </div>
          </div>
          <div className="event-card-horizontal__meta-right">
            {event.attendees.avatars.length > 0 && (
              <div className="event-card-horizontal__attendees">
                <div className="event-card-horizontal__attendees-img-container">
                  {event.attendees.avatars.map((avatar: EventAttendee, index: number) => (
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
        </div>
        <div className="event-card-horizontal__description">
          {event.description}
        </div>
      </div>
    </a>
  );
}
