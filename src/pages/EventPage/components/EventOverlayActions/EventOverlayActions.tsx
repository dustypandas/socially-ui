import { useEffect, useState } from 'react';
import IconCheckOutline from '@src/assets/icon-check-outline.svg?react';
import type { EventViewerStatus } from '@src/common-libs/types';
import { Overlay } from '@src/components';
import { attendEvent, lateEvent, notAttendEvent } from '@src/data';
import './event-overlay-actions.css';

type ActionStatus = 'idle' | 'attending' | 'late' | 'notAttending';
type AttendanceChoice = 'attending' | 'late' | 'notAttending';

const RSVP_OPTIONS: { value: AttendanceChoice; label: string }[] = [
  { value: 'attending', label: "I'm going" },
  { value: 'late', label: "I'll be late" },
  { value: 'notAttending', label: "I'm not going" },
];

const HOST_PRIMARY_OPTIONS = [
  'Edit event',
  'Manage attendees',
  'Send announcement',
] as const;

const HOST_SECONDARY_OPTIONS = [
  'Copy this event',
  'Cancel event',
] as const;

type EventOverlayActionsProps = {
  eventId: string;
  currentStatus: EventViewerStatus | null;
  isOpen: boolean;
  isHost?: boolean;
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

export function EventOverlayActions({
  eventId,
  currentStatus,
  isOpen,
  isHost = false,
  onClose,
  onAttendanceUpdate,
}: EventOverlayActionsProps) {
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
      <div className="event-overlay-actions__header">
        <h2 className="event-overlay-actions__title">
          {isHost === true ? 'Event options' : 'Change RSVP'}
        </h2>
        <button
          type="button"
          className="event-overlay-actions__close"
          onClick={onClose}
          disabled={isBusy}
        >
          <span className="event-overlay-actions__close-icon" />
        </button>
      </div>
      <div className="event-overlay-actions__options">
        {isHost === true ? (
          <>
            {HOST_PRIMARY_OPTIONS.map(label => (
              <button
                key={label}
                type="button"
                className="event-overlay-actions__option"
                onClick={onClose}
              >
                {label}
              </button>
            ))}
            <div className="event-overlay-actions__divider" />
            {HOST_SECONDARY_OPTIONS.map(label => (
              <button
                key={label}
                type="button"
                className="event-overlay-actions__option"
                onClick={onClose}
              >
                {label}
              </button>
            ))}
          </>
        ) : (
          RSVP_OPTIONS.map((option) => {
            const isSelected = isCurrentOption(option.value, currentStatus);

            return (
              <button
                key={option.value}
                type="button"
                className={[
                  'event-overlay-actions__option',
                  'event-overlay-actions__option--rsvp',
                  isSelected && 'event-overlay-actions__option--selected',
                  actionStatus === option.value && 'event-overlay-actions__option--loading',
                ].filter(Boolean).join(' ')}
                onClick={() => handleStatusChange(option.value)}
                disabled={isBusy}
              >
                <span className="event-overlay-actions__option-tick">
                  {isSelected && (
                    <IconCheckOutline className="event-overlay-actions__option-tick-icon" />
                  )}
                </span>
                {option.label}
              </button>
            );
          })
        )}
      </div>
    </Overlay>
  );
}
