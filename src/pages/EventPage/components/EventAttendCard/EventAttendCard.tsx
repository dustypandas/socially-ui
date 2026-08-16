import { forwardRef } from 'react';
import type { EventViewerStatus, MemberAvatar } from '@src/common-libs/types';
import { getAttendeesLabel } from '@src/helpers/labelHelpers';
import './event-attend-card.css';

type EventAttendCardProps = {
  profiles: MemberAvatar[];
  attendeeCount: number;
  priceLabel?: string;
  className?: string;
  isFixedBar?: boolean;
  isFixedBarVisible?: boolean;
  eventViewerStatus: EventViewerStatus | null;
  onJoinBtnClick?: () => void;
  onUpdateClick?: () => void;
  isJoinLoading?: boolean;
};

function getJoinButtonLabel(status: EventViewerStatus | null): string {
  if (status === 'pending') {
    return 'Join request pending';
  }

  return 'Join event';
}

function getEngagementLabel(status: EventViewerStatus | null): string {
  if (status === 'late') {
    return "I'll Be Late";
  }

  if (status === 'waitlisted') {
    return 'Waitlisted';
  }

  if (status === 'notAttending') {
    return 'Not Attending';
  }

  return "I'm Attending";
}

export const EventAttendCard = forwardRef<HTMLDivElement, EventAttendCardProps>(
  function EventAttendCard(
    {
      profiles,
      attendeeCount,
      priceLabel = 'Free',
      className = '',
      isFixedBar = false,
      isFixedBarVisible = false,
      eventViewerStatus,
      onJoinBtnClick,
      onUpdateClick,
      isJoinLoading = false,
    },
    ref,
  ) {
    const hasRsvp =
      eventViewerStatus === 'attending'
      || eventViewerStatus === 'late'
      || eventViewerStatus === 'waitlisted'
      || eventViewerStatus === 'notAttending';
    const isJoinDisabled =
      isJoinLoading
      || eventViewerStatus === 'pending'
      || eventViewerStatus === 'banned';

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
              {getAttendeesLabel({ count: attendeeCount, avatars: profiles })}
            </span>
          </div>
        </div>
        <div className="event-attend-card__actions">
          {hasRsvp ? (
            <>
              <span className="event-attend-card__attending-label">
                {getEngagementLabel(eventViewerStatus)}
              </span>
              <button
                type="button"
                className="event-attend-card__btn event-attend-card__btn--update"
                onClick={onUpdateClick}
              >
                change
              </button>
            </>
          ) : (
            <>
              <span className="event-attend-card__price">{priceLabel}</span>
              <button
                type="button"
                className={[
                  'event-attend-card__btn',
                  isJoinLoading && 'event-attend-card__btn--loading',
                ].filter(Boolean).join(' ')}
                onClick={onJoinBtnClick}
                disabled={isJoinDisabled}
              >
                {getJoinButtonLabel(eventViewerStatus)}
              </button>
            </>
          )}
        </div>
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
