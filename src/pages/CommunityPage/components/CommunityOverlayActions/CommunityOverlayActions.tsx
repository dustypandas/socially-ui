import { useEffect, useState } from 'react';
import { Overlay } from '@src/components';
import { leaveCommunity } from '@src/data';
import './community-overlay-actions.css';

type LeaveStatus = 'idle' | 'loading';

const ORGANIZER_OPTIONS = [
  'Update community details',
  'Contact members',
  'Transfer ownership',
] as const;

type CommunityOverlayActionsProps = {
  communityId: string;
  isOpen: boolean;
  isOrganizer?: boolean;
  onClose: () => void;
  onLeaveSuccess?: () => void;
};

export function CommunityOverlayActions({
  communityId,
  isOpen,
  isOrganizer,
  onClose,
  onLeaveSuccess,
}: CommunityOverlayActionsProps) {
  const [leaveStatus, setLeaveStatus] = useState<LeaveStatus>('idle');
  const isLeaving = leaveStatus === 'loading';

  useEffect(() => {
    if (isOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      setLeaveStatus('idle');
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const handleLeave = async () => {
    if (isLeaving) {
      return;
    }

    setLeaveStatus('loading');

    try {
      await leaveCommunity(communityId);
      onLeaveSuccess?.();
      onClose();
    } catch {
      setLeaveStatus('idle');
    }
  };

  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div className="community-overlay-actions__header">
        <h2 className="community-overlay-actions__title">
          {isOrganizer === true ? 'Manage Community' : 'My Membership'}
        </h2>
        <button
          type="button"
          className="community-overlay-actions__close"
          onClick={onClose}
          disabled={isLeaving}
        >
          <span className="community-overlay-actions__close-icon" />
        </button>
      </div>
      <div className="community-overlay-actions__options">
        {isOrganizer === true && (
          <>
            {ORGANIZER_OPTIONS.map(label => (
              <button
                key={label}
                type="button"
                className="community-overlay-actions__option"
                onClick={onClose}
                disabled={isLeaving}
              >
                {label}
              </button>
            ))}
            <div className="community-overlay-actions__divider" />
          </>
        )}
        <button
          type="button"
          className={[
            'community-overlay-actions__option',
            isLeaving && 'community-overlay-actions__option--loading',
          ].filter(Boolean).join(' ')}
          onClick={handleLeave}
          disabled={isLeaving}
        >
          Leave this community
        </button>
        <div className="community-overlay-actions__divider" />
        <button
          type="button"
          className="community-overlay-actions__option"
          onClick={onClose}
          disabled={isLeaving}
        >
          Cancel
        </button>
      </div>
    </Overlay>
  );
}
