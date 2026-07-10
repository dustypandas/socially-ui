import IconCalendar from '@src/assets/icon-calendar-outline.svg?react';
import IconMapMarker from '@src/assets/icon-map-marker-outline.svg?react';
import IconGroup from '@src/assets/icon-group-outline.svg?react';
import IconStar from '@src/assets/icon-star.svg?react';
import type { EventBasic } from '@src/data';
import './event-card.css';

type EventCardProps = {
  event: EventCardEvent;
};

export type EventCardEvent = EventBasic & { dateTimeLabel: string };

export function EventCard({ event }: EventCardProps) {
  return (
    <a href="#/event-one-ui" className="event-card" target="_blank">
      <img className="event-card__image" src={event.image} alt="" />
      <div className="event-card__body">
        <h3 className="event-card__title">
          {event.title}
        </h3>
        <div className="event-card__row">
          <IconCalendar className="event-card__icon" />
          <span>
            {event.dateTimeLabel}
          </span>
        </div>
        <div className="event-card__row">
          <IconMapMarker className="event-card__icon event-card__icon--location" />
          <span className="event-card__text">
            {event.location.label}
          </span>
        </div>
        <div className="event-card__row">
          <IconGroup className="event-card__icon event-card__icon--attendees" />
          <span className="event-card__text">
            {event.attendees.count} going
          </span>
        </div>
        <div className="event-card__row">
          <IconStar className="event-card__icon event-card__icon--rating" />
          <span className="event-card__text">
            {event.rating} ({event.ratingCount} ratings)
          </span>
        </div>
      </div>
    </a>
  );
}
