import { useEffect, useState } from 'react';
import type { EventAttendee } from '@src/common-libs/types';
import { Overlay } from '@src/components';
import { getEventAttendeesListForOneEvent } from '@src/data';
import './event-overlay-attendees.css';

const PAGE_SIZE = 20;

type FetchState = 'idle' | 'loading' | 'complete';

type EventOverlayAttendeesProps = {
  isOpen: boolean;
  onClose: () => void;
  attendeeCount: number;
  attendees: EventAttendee[] | null;
  onAttendeesLoaded: (attendees: EventAttendee[]) => void;
};

export function EventOverlayAttendees({
  isOpen,
  onClose,
  attendeeCount,
  attendees,
  onAttendeesLoaded,
}: EventOverlayAttendeesProps) {
  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const isOverlayVisible = isOpen && fetchState === 'complete';
  const attendeeList = attendees ?? [];
  const visibleAttendees = attendeeList.slice(0, visibleCount);
  const hasMoreAttendees = attendeeList.length > visibleCount;

  useEffect(() => {
    if (isOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      setVisibleCount(PAGE_SIZE);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (attendees !== null) {
      const timer = window.setTimeout(() => {
        setFetchState('complete');
      }, 0);
      return () => window.clearTimeout(timer);
    }

    let cancelled = false;

    const timer = window.setTimeout(() => {
      setFetchState('loading');

      getEventAttendeesListForOneEvent()
        .then(list => {
          if (cancelled) {
            return;
          }

          onAttendeesLoaded(list);
          setFetchState('complete');
        })
        .catch(() => {
          if (!cancelled) {
            setFetchState('idle');
          }
        });
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [isOpen, attendees, onAttendeesLoaded]);

  return (
    <Overlay
      isOpen={isOverlayVisible}
      onClose={onClose}
      title={`${attendeeCount} attendees`}
    >
      <div className="event-overlay-attendees__list">
        {visibleAttendees.map(attendee => (
          <AttendeeItem key={attendee.id} attendee={attendee} />
        ))}
        {hasMoreAttendees && (
          <button
            type="button"
            className="event-overlay-attendees__show-more"
            onClick={() => setVisibleCount(current => current + PAGE_SIZE)}
          >
            Show more
          </button>
        )}
      </div>
    </Overlay>
  );
}

function AttendeeItem({ attendee }: { attendee: EventAttendee }) {
  return (
    <a href={attendee.href} className="event-overlay-attendees__item" target="_blank">
      <img
        className="event-overlay-attendees__avatar"
        src={attendee.image}
        alt=""
      />
      <div className="event-overlay-attendees__content">
        <span className="event-overlay-attendees__name">{attendee.label}</span>
        <span className="event-overlay-attendees__interests">
          {attendee.topInterests
            .map(interest => `#${interest.label}`)
            .join(' • ')
          }
        </span>
      </div>
    </a>
  );
}