import { useEffect, useState } from 'react';
import IconCheckOutline from '@src/assets/icon-check-outline.svg?react';
import type { EventViewerStatus } from '@src/common-libs/types';
import { Overlay } from '@src/components';
import { attendEvent, lateEvent, notAttendEvent } from '@src/data';
import './event-attendance-overlay.css';

type ActionStatus = 'idle' | 'attending' | 'late' | 'notAttending';
type AttendanceChoice = 'attending' | 'late' | 'notAttending';

const ATTENDANCE_OPTIONS: { value: AttendanceChoice; label: string }[] = [
  { value: 'attending', label: "I'm going" },
  { value: 'late', label: 'Will be late' },
  { value: 'notAttending', label: "I'm not going" },
];

type EventAttendanceOverlayProps = {
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

export function EventAttendanceOverlay({
  eventId,
  currentStatus,
  isOpen,
  onClose,
  onAttendanceUpdate,
}: EventAttendanceOverlayProps) {
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
      <div className="event-attendance-overlay__header">
        <h2 className="event-attendance-overlay__title">
          Update RSVP
        </h2>
        <button
          type="button"
          className="event-attendance-overlay__close"
          onClick={onClose}
          disabled={isBusy}
        >
          <span className="event-attendance-overlay__close-icon" />
        </button>
      </div>
      <div className="event-attendance-overlay__options">
        {ATTENDANCE_OPTIONS.map((option) => {
          const isSelected = isCurrentOption(option.value, currentStatus);

          return (
            <button
              key={option.value}
              type="button"
              className={[
                'event-attendance-overlay__option',
                isSelected && 'event-attendance-overlay__option--selected',
                actionStatus === option.value && 'event-attendance-overlay__option--loading',
              ].filter(Boolean).join(' ')}
              onClick={() => handleStatusChange(option.value)}
              disabled={isBusy}
            >
              <span className="event-attendance-overlay__option-tick">
                {isSelected && (
                  <IconCheckOutline className="event-attendance-overlay__option-tick-icon" />
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
