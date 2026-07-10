import { forwardRef } from 'react';
import type { MemberAvatar } from '@src/data';
import { getAttendeesLabel } from '@src/utils/getAttendeesLabel';
import './event-attend-card.css';

type EventAttendCardProps = {
  profiles: MemberAvatar[];
  attendeeCount: number;
  priceLabel?: string;
  className?: string;
  isFixedBar?: boolean;
  isFixedBarVisible?: boolean;
};

export const EventAttendCard = forwardRef<HTMLDivElement, EventAttendCardProps>(
  function EventAttendCard(
    {
      profiles,
      attendeeCount,
      priceLabel = 'Free',
      className = '',
      isFixedBar = false,
      isFixedBarVisible = false,
    },
    ref,
  ) {
    const body = (
      <div className="event-attend-card__body">
        <div className="event-attend-card__left">
          <div className="event-attend-card__attendees">
            <div className="event-attend-card__avatars">
              {profiles.map((profile, index) => (
                <img
                  key={profile.id}
                  className="event-attend-card__avatar"
                  src={profile.image}
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
    );

    return (
      <div
        ref={ref}
        className={[
          'event-attend-card',
          isFixedBar && 'event-attend-card--fixed-bar',
          isFixedBar && isFixedBarVisible && 'event-attend-card--fixed-bar--visible',
          className,
        ].filter(Boolean).join(' ')}
      >
        {isFixedBar
          ? (<div className="width-container">{body}</div>)
          : (<>
            <div className="event-attend-card__header">
              <span className="event-attend-card__header-label">Attend</span>
            </div>
            {body}
          </>)
        }
      </div>
    );
  },
);
