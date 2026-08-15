import IconMore from '@src/assets/icon-more-outline.svg?react';
import type { CommunityViewerStatus } from '@src/common-libs/types';
import './community-action-buttons.css';

type CommunityActionButtonsProps = {
  viewerStatus?: CommunityViewerStatus;
  isOrganiser?: boolean;
  onJoinBtnClick?: () => void;
  onMemberBtnClick?: () => void;
};

export function CommunityActionButtons({
  viewerStatus,
  isOrganiser,
  onJoinBtnClick,
  onMemberBtnClick,
}: CommunityActionButtonsProps) {
  const isJoinPending = viewerStatus === 'pending';
  const isMember = viewerStatus === 'member';

  return (
    <div className="community-action-buttons">
      {isMember ? (
        <button
          type="button"
          className="community-action-buttons__membership-btn"
          onClick={onMemberBtnClick}
        >
          {isOrganiser === true ? 'My Community' : 'My membership'}
          <IconMore className="community-action-buttons__membership-btn-icon" />
        </button>
      ) : (
        <button
          type="button"
          className="community-action-buttons__join-btn"
          onClick={onJoinBtnClick}
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
