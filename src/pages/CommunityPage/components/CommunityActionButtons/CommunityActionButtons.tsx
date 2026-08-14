import IconMore from '@src/assets/icon-more-outline.svg?react';
import type { MemberCommunity } from '@src/common-libs/types';
import './community-action-buttons.css';

type CommunityActionButtonsProps = {
  membershipStatus: MemberCommunity['status'] | null;
  isOrganiser?: boolean;
  onJoinClick?: () => void;
  onMembershipClick?: () => void;
};

export function CommunityActionButtons({
  membershipStatus,
  isOrganiser,
  onJoinClick,
  onMembershipClick,
}: CommunityActionButtonsProps) {
  const isJoinPending = membershipStatus === 'pending';
  const isMember = membershipStatus === 'member';

  return (
    <div className="community-action-buttons">
      {isMember ? (
        <button
          type="button"
          className="community-action-buttons__membership-btn"
          onClick={onMembershipClick}
        >
          {isOrganiser === true ? 'My Community' : 'My membership'}
          <IconMore className="community-action-buttons__membership-btn-icon" />
        </button>
      ) : (
        <button
          type="button"
          className="community-action-buttons__join-btn"
          onClick={onJoinClick}
          disabled={isJoinPending}
        >
          Join this community
        </button>
      )}
      {isOrganiser === true && (
        <button type="button" className="community-action-buttons__create-event-btn">
          Create event
        </button>
      )}
    </div>
  );
}
