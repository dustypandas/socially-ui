import { useEffect, useState } from 'react';
import { Overlay } from '@src/components';
import { leaveCommunity } from '@src/data';
import './community-membership-overlay.css';

type LeaveStatus = 'idle' | 'loading';

type CommunityMembershipOverlayProps = {
  communityId: string;
  isOpen: boolean;
  onClose: () => void;
  onLeaveSuccess?: () => void;
};

export function CommunityMembershipOverlay({
  communityId,
  isOpen,
  onClose,
  onLeaveSuccess,
}: CommunityMembershipOverlayProps) {
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
      <div className="community-membership-overlay__header">
        <h2 className="community-membership-overlay__title">
          My Membership
        </h2>
        <button
          type="button"
          className="community-membership-overlay__close"
          onClick={onClose}
          disabled={isLeaving}
        >
          <span className="community-membership-overlay__close-icon" />
        </button>
      </div>
      <div className="community-membership-overlay__options">
        <button
          type="button"
          className={[
            'community-membership-overlay__option',
            isLeaving && 'community-membership-overlay__option--loading',
          ].filter(Boolean).join(' ')}
          onClick={handleLeave}
          disabled={isLeaving}
        >
          Leave this community
        </button>
        <button
          type="button"
          className="community-membership-overlay__option"
          onClick={onClose}
          disabled={isLeaving}
        >
          Cancel
        </button>
      </div>
    </Overlay>
  );
}
