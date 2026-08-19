import { forwardRef } from 'react';
import IconMore from '@src/assets/icon-more-outline.svg?react';
import type { EventAttendee, EventViewerStatus } from '@src/common-libs/types';
import { getAttendeesLabel } from '@src/helpers/labelHelpers';
import './event-attend-card.css';

type EventAttendCardProps = {
  profiles: EventAttendee[];
  attendeeCount: number;
  priceLabel?: string;
  className?: string;
  isFixedBar?: boolean;
  isFixedBarVisible?: boolean;
  eventViewerStatus: EventViewerStatus | null;
  onJoinBtnClick?: () => void;
  onUpdateClick?: () => void;
  onAddReviewClick?: () => void;
  onAttendeesClick: () => void;
  isJoinLoading?: boolean;
  isHost?: boolean;
  isPastEvent?: boolean;
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

function getPastEngagementLabel(isHost: boolean): string {
  return isHost ? 'Hosted' : 'Attended';
}

function getHeaderLabel(
  isPastEvent: boolean,
  isHost: boolean,
  hasRsvp: boolean,
): string {
  if (isPastEvent) {
    return 'Past';
  }

  if (isHost) {
    return 'Hosting';
  }

  if (hasRsvp) {
    return 'Attending';
  }

  return 'Attend';
}

type AttendeesSectionProps = {
  profiles: EventAttendee[];
  attendeeCount: number;
  isClickable: boolean;
  onAttendeesClick: () => void;
};

function AttendeesSection({
  profiles,
  attendeeCount,
  isClickable,
  onAttendeesClick,
}: AttendeesSectionProps) {
  const content = (
    <>
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
    </>
  );

  if (isClickable) {
    return (
      <button
        type="button"
        className="event-attend-card__attendees"
        onClick={onAttendeesClick}
      >
        {content}
      </button>
    );
  }

  return (
    <div className="event-attend-card__attendees event-attend-card__attendees--static">
      {content}
    </div>
  );
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
      onAddReviewClick,
      onAttendeesClick,
      isJoinLoading = false,
      isHost = false,
      isPastEvent = false,
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
    const canClickAttendees = !isPastEvent || isHost || hasRsvp;

    const actions = isPastEvent ? (
      isHost ? (
        <>
          <span className="event-attend-card__attending-label event-attend-card__attending-label--light">
            {getPastEngagementLabel(true)}
          </span>
          <button
            type="button"
            className="event-attend-card__btn event-attend-card__btn--update"
            onClick={onUpdateClick}
          >
            event
            <IconMore className="event-attend-card__btn-icon" />
          </button>
        </>
      ) : hasRsvp ? (
        <>
          <span className="event-attend-card__attending-label event-attend-card__attending-label--light">
            {getPastEngagementLabel(false)}
          </span>
          <button
            type="button"
            className="event-attend-card__btn"
            onClick={onAddReviewClick}
          >
            add review
          </button>
        </>
      ) : (
        <>
          <span className="event-attend-card__price">{priceLabel}</span>
          <button
            type="button"
            className="event-attend-card__btn"
            disabled
          >
            Past
          </button>
        </>
      )
    ) : hasRsvp ? (
      <>
        <span className="event-attend-card__attending-label">
          {isHost === true ? "I'm Hosting" : getEngagementLabel(eventViewerStatus)}
        </span>
        <button
          type="button"
          className="event-attend-card__btn event-attend-card__btn--update"
          onClick={onUpdateClick}
        >
          {isHost === true ? (
            <>
              event
              <IconMore className="event-attend-card__btn-icon" />
            </>
          ) : (
            'change'
          )}
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
    );

    const body = (
      <div className="event-attend-card__body">
        <div className="event-attend-card__left">
          <AttendeesSection
            profiles={profiles}
            attendeeCount={attendeeCount}
            isClickable={canClickAttendees}
            onAttendeesClick={onAttendeesClick}
          />
        </div>
        <div className="event-attend-card__actions">
          {actions}
        </div>
      </div>
    );

    return (
      <div
        ref={ref}
        className={[
          'event-attend-card',
          isHost && 'event-attend-card--host',
          isPastEvent && 'event-attend-card--past',
          isFixedBar && 'event-attend-card--fixed-bar',
          isFixedBar && isFixedBarVisible && 'event-attend-card--fixed-bar--visible',
          className,
        ].filter(Boolean).join(' ')}
      >
        {isFixedBar
          ? (<div className="width-container">{body}</div>)
          : (<>
            <div className="event-attend-card__header">
              <span className="event-attend-card__header-label">
                {getHeaderLabel(isPastEvent, isHost === true, hasRsvp)}
              </span>
            </div>
            {body}
          </>)
        }
      </div>
    );
  },
);
