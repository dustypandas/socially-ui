import { useEffect, useState } from 'react';
import IconCheckOutline from '@src/assets/icon-check-outline.svg?react';
import type { EventViewerStatus } from '@src/common-libs/types';
import { Overlay } from '@src/components';
import { attendEvent, lateEvent, notAttendEvent } from '@src/data';
import './event-overlay-change-rsvp.css';

type ActionStatus = 'idle' | 'attending' | 'late' | 'notAttending';
type AttendanceChoice = 'attending' | 'late' | 'notAttending';

const RSVP_OPTIONS: { value: AttendanceChoice; label: string }[] = [
  { value: 'attending', label: "I'm going" },
  { value: 'late', label: "I'll be late" },
  { value: 'notAttending', label: "I'm not going" },
];

type EventOverlayChangeRsvpProps = {
  eventId: string;
  currentStatus: EventViewerStatus | null;
  isOpen: boolean;
  onClose: () => void;
  onAttendanceUpdate?: (newStatus: AttendanceChoice) => void;
};

function isCurrentOption(
  option: AttendanceChoice,
  currentStatus: EventViewerStatus | null,
): boolean {
  if (option === 'notAttending') {
    return currentStatus === 'notAttending';
  }

  return currentStatus === option;
}

export function EventOverlayChangeRsvp({
  eventId,
  currentStatus,
  isOpen,
  onClose,
  onAttendanceUpdate,
}: EventOverlayChangeRsvpProps) {
  const [actionStatus, setActionStatus] = useState<ActionStatus>('idle');
  const isBusy = actionStatus !== 'idle';

  useEffect(() => {
    if (isOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActionStatus('idle');
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const handleStatusChange = async (newStatus: AttendanceChoice) => {
    if (isBusy) {
      return;
    }

    setActionStatus(newStatus);

    try {
      if (newStatus === 'attending') {
        await attendEvent(eventId);
      } else if (newStatus === 'late') {
        await lateEvent(eventId);
      } else {
        await notAttendEvent(eventId);
      }
      onAttendanceUpdate?.(newStatus);
      onClose();
    } catch {
      setActionStatus('idle');
    }
  };

  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div className="event-overlay-change-rsvp__header">
        <h2 className="event-overlay-change-rsvp__title">
          Change RSVP
        </h2>
        <button
          type="button"
          className="event-overlay-change-rsvp__close"
          onClick={onClose}
          disabled={isBusy}
        >
          <span className="event-overlay-change-rsvp__close-icon" />
        </button>
      </div>
      <div className="event-overlay-change-rsvp__options">
        {RSVP_OPTIONS.map((option) => {
          const isSelected = isCurrentOption(option.value, currentStatus);

          return (
            <button
              key={option.value}
              type="button"
              className={[
                'event-overlay-change-rsvp__option',
                isSelected && 'event-overlay-change-rsvp__option--selected',
                actionStatus === option.value && 'event-overlay-change-rsvp__option--loading',
              ].filter(Boolean).join(' ')}
              onClick={() => handleStatusChange(option.value)}
              disabled={isBusy}
            >
              <span className="event-overlay-change-rsvp__option-tick">
                {isSelected && (
                  <IconCheckOutline className="event-overlay-change-rsvp__option-tick-icon" />
                )}
              </span>
              {option.label}
            </button>
          );
        })}
      </div>
    </Overlay>
  );
}
