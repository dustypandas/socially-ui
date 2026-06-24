import IconCalendar from '../../assets/icon-calendar-outline.svg?react';
import IconFeaturedPin from '../../assets/icon-featured-pin.svg?react';
import IconMapMarker from '../../assets/icon-map-marker.svg?react';
import IconStar from '../../assets/icon-star.svg?react';
import type { HomeEvent } from '../../store/slices/eventsSlice';
import './event-card.css';

type EventCardProps = {
  event: HomeEvent;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="event-card">
      <a href="#/event-ui" className="event-card__image-link">
        <img className="event-card__image" src={event.image} alt="" />
      </a>
      <div className="event-card__body">
        <h3 className="event-card__title">
          <a href="#/event-ui" className="event-card__title-link">
            {event.title}
          </a>
        </h3>
        <div className="event-card__row">
          <IconFeaturedPin className="event-card__icon event-card__icon--host" />
          <a href={event.host.href} className="event-card__link">
            {event.host.name}
          </a>
        </div>
        <div className="event-card__row">
          <IconCalendar className="event-card__icon" />
          <span>
            {event.dateLabel}, {event.timeLabel}
          </span>
        </div>
        <div className="event-card__row">
          <IconMapMarker className="event-card__icon event-card__icon--location" />
          <a href={event.location.href} className="event-card__link">
            {event.location.name}
          </a>
        </div>
        <div className="event-card__row">
          <IconStar className="event-card__icon event-card__icon--rating" />
          <a href="#" className="event-card__link">
            {event.rating} ({event.ratingCount} ratings)
          </a>
        </div>
      </div>
    </article>
  );
}
