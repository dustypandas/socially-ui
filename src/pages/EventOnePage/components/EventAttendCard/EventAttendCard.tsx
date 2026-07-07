import { forwardRef } from 'react';
import { getAttendeesLabel } from '@src/utils/getAttendeesLabel';
import './event-attend-card.css';

type AttendeeProfile = {
  name: string;
  img: string;
};

type EventAttendCardProps = {
  profiles: AttendeeProfile[];
  attendeeCount: number;
  priceLabel?: string;
  className?: string;
  isFixedBar?: boolean;
};

export const EventAttendCard = forwardRef<HTMLDivElement, EventAttendCardProps>(
  function EventAttendCard(
    {
      profiles,
      attendeeCount,
      priceLabel = 'Free',
      className = '',
      isFixedBar = false,
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={[
          'event-attend-card',
          isFixedBar && 'event-attend-card--fixed-bar',
          className,
        ].filter(Boolean).join(' ')}
      >
        {!isFixedBar && (
          <div className="event-attend-card__header">
            <span className="event-attend-card__header-label">Attend</span>
          </div>
        )}
        <div className="event-attend-card__body">
          <div className="event-attend-card__left">
            <div className="event-attend-card__attendees">
              <div className="event-attend-card__avatars">
                {profiles.map((profile, index) => (
                  <img
                    key={profile.name}
                    className="event-attend-card__avatar"
                    src={profile.img}
                    alt=""
                    style={{ zIndex: 20 - index }}
                  />
                ))}
              </div>
              <span className="event-attend-card__attendees-label">
                {getAttendeesLabel(attendeeCount, profiles.length)}
              </span>
            </div>
            <span className="event-attend-card__price">{priceLabel}</span>
          </div>
          <button type="button" className="event-attend-card__btn">
            Join event
          </button>
        </div>
      </div>
    );
  },
);
