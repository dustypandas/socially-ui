import { useMemo } from 'react';
import IconMapMarker from '../../../../assets/icon-map-marker-outline.svg?react';
import IconStar from '../../../../assets/icon-star.svg?react';
import { memberAvatarUrls } from '../../../../data/dummyData.js';
import type { HomeEvent } from '../../../../store/slices/eventsSlice.js';
import './event-card-horizontal.css';
import { getAttendeesLabel } from '../../../../utils/getAttendeesLabel.js';

type EventCardHorizontalProps = {
  event: HomeEvent;
};

function pickMemberAvatars(eventId: string, count: number): string[] {
  if (count <= 0) return [];

  let seed = 0;
  for (let i = 0; i < eventId.length; i += 1) {
    seed = (seed * 31 + eventId.charCodeAt(i)) | 0;
  }

  const shuffled = [...memberAvatarUrls];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    seed = (seed * 1103515245 + 12345) | 0;
    const j = (seed >>> 0) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function EventCardHorizontal({ event }: EventCardHorizontalProps) {
  const avatarCount = Math.min(event.attendees.count, 3);
  const avatarUrls = useMemo(
    () => pickMemberAvatars(event.id, avatarCount),
    [event.id, avatarCount],
  );
  const ratingLabel = `${event.rating} (${event.ratingCount} ratings)`;
  const attendeesLabel = getAttendeesLabel(event.attendees.count, avatarUrls.length);

  return (
    <a href="#/event-one-ui" className="event-card-horizontal">
      <div className="event-card-horizontal__body">
        <h3 className="event-card-horizontal__title">
          <span className="event-card-horizontal__title-text">{event.title}</span>
        </h3>
        <div className="event-card-horizontal__row">
          <IconMapMarker className="event-card-horizontal__icon event-card-horizontal__icon--location" />
          <span className="event-card-horizontal__text">
            {event.location.name}
          </span>
        </div>
        <div className="event-card-horizontal__row">
          <IconStar className="event-card-horizontal__icon event-card-horizontal__icon--rating" />
          <span className="event-card-horizontal__text">
            {ratingLabel}
          </span>
        </div>
        {avatarCount > 0 && (
          <div className="event-card-horizontal__attendees">
            <div className="event-card-horizontal__attendees-img-container">
              {avatarUrls.map((url, index) => (
                <img
                  key={url}
                  className="event-card-horizontal__attendee-img"
                  src={url}
                  alt=""
                  style={{ zIndex: avatarUrls.length - index }}
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
