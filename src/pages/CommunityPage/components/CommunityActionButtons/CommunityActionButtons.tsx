import IconCaretDown from '@src/assets/icon-caret-down-outline.svg?react';
import type { CommunityEngagement } from '@src/common-libs/types';
import './community-action-buttons.css';

type CommunityActionButtonsProps = {
  membershipStatus: CommunityEngagement['status'] | null;
  onJoinClick?: () => void;
  onMembershipClick?: () => void;
};

export function CommunityActionButtons({
  membershipStatus,
  onJoinClick,
  onMembershipClick,
}: CommunityActionButtonsProps) {
  const isJoinPending = membershipStatus === 'pending';
  const isMember = membershipStatus === 'member';

  return (isMember ? (
    <button
      type="button"
      className="community-action-buttons__membership-btn"
      onClick={onMembershipClick}
    >
      My membership
      <IconCaretDown className="community-action-buttons__membership-btn-caret" />
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
  ));
}
