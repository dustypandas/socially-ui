import IconCalendar from '../../../../../assets/icon-calendar-outline.svg?react';
import IconMapMarker from '../../../../../assets/icon-map-marker-outline.svg?react';
import IconGroup from '../../../../../assets/icon-group-outline.svg?react';
import IconStar from '../../../../../assets/icon-star.svg?react';
import type { HomeEvent } from '../../../../../store/slices/eventsSlice';
import './event-card.css';

type EventCardProps = {
  event: HomeEvent;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <a href="#/event-ui" className="event-card">
      <img className="event-card__image" src={event.image} alt="" />
      <div className="event-card__body">
        <h3 className="event-card__title">
          <a href="#/event-ui" className="event-card__title-link">
            {event.title}
          </a>
        </h3>
        <div className="event-card__row">
          <IconCalendar className="event-card__icon" />
          <span>
            {event.dateLabel}, {event.timeLabel}
          </span>
        </div>
        <div className="event-card__row">
          <IconMapMarker className="event-card__icon event-card__icon--location" />
          <span className="event-card__link">
            {event.location.name}
          </span>
        </div>
        <div className="event-card__row">
          <IconGroup className="event-card__icon event-card__icon--attendees" />
          <span className="event-card__link">
            {event.attendees.count} going
          </span>
        </div>
        <div className="event-card__row">
          <IconStar className="event-card__icon event-card__icon--rating" />
          <span className="event-card__link">
            {event.rating} ({event.ratingCount} ratings)
          </span>
        </div>
      </div>
    </a>
  );
}
