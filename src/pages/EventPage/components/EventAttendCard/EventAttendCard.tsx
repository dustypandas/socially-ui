import { forwardRef, type ReactNode } from 'react';
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
  hasReviewed?: boolean;
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
      eventViewerStatus,
      onJoinBtnClick,
      onUpdateClick,
      onAddReviewClick,
      onAttendeesClick,
      isJoinLoading = false,
      isHost = false,
      isPastEvent = false,
      hasReviewed = false,
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

    const actionStatus = getEventAttendCardActionStatus(
      isPastEvent,
      isHost,
      hasRsvp,
      hasReviewed,
    );

    const actionComponents = getEventCardActionComponents({
      status: actionStatus,
      eventViewerStatus,
      priceLabel,
      isJoinLoading,
      isJoinDisabled,
      onJoinBtnClick,
      onUpdateClick,
      onAddReviewClick,
    });

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
          {actionComponents}
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


type EventAttendCardActionStatus =
  | 'pastVisitor'
  | 'pastHost'
  | 'pastAttended'
  | 'pastReviewed'
  | 'upcomingJoin'
  | 'upcomingRsvp'
  | 'upcomingHost';

function getEventAttendCardActionStatus(
  isPastEvent: boolean,
  isHost: boolean,
  hasRsvp: boolean,
  hasReviewed: boolean,
): EventAttendCardActionStatus {
  if (isPastEvent) {
    if (isHost) {
      return 'pastHost';
    }

    if (hasRsvp) {
      return hasReviewed ? 'pastReviewed' : 'pastAttended';
    }

    return 'pastVisitor';
  }

  if (hasRsvp) {
    return isHost ? 'upcomingHost' : 'upcomingRsvp';
  }

  return 'upcomingJoin';
}

type EventCardActionComponentsParams = {
  status: EventAttendCardActionStatus;
  eventViewerStatus: EventViewerStatus | null;
  priceLabel: string;
  isJoinLoading: boolean;
  isJoinDisabled: boolean;
  onJoinBtnClick?: () => void;
  onUpdateClick?: () => void;
  onAddReviewClick?: () => void;
};

function getEventCardActionComponents({
  status,
  eventViewerStatus,
  priceLabel,
  isJoinLoading,
  isJoinDisabled,
  onJoinBtnClick,
  onUpdateClick,
  onAddReviewClick,
}: EventCardActionComponentsParams): ReactNode {
  switch (status) {
    case 'pastHost':
      return (
        <>
          <span className="event-attend-card__attending-label event-attend-card__attending-label--light">
            Hosted
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
      );
    case 'pastReviewed':
      return (
        <span className="event-attend-card__attending-label event-attend-card__attending-label--light">
          Reviewed 👍
        </span>
      );
    case 'pastAttended':
      return (
        <>
          <span className="event-attend-card__attending-label event-attend-card__attending-label--light">
            Attended
          </span>
          <button
            type="button"
            className="event-attend-card__btn"
            onClick={onAddReviewClick}
          >
            add review
          </button>
        </>
      );
    case 'pastVisitor':
      return (
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
      );
    case 'upcomingHost':
      return (
        <>
          <span className="event-attend-card__attending-label">
            {"I'm Hosting"}
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
      );
    case 'upcomingRsvp':
      return (
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
      );
    case 'upcomingJoin':
      return (
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
            {eventViewerStatus === 'pending' ? 'Join request pending' : 'Join event'}
          </button>
        </>
      );
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
}