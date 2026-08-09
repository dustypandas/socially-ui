import IconCaretDown from '@src/assets/icon-caret-down-outline.svg?react';
import IconGroup from '@src/assets/icon-group-outline.svg?react';
import IconStar from '@src/assets/icon-star.svg?react';
import type { CommunityEngagement } from '@src/common-libs/types';
// import IconUser from '@src/assets/icon-user-outline.svg?react';
// import type { MemberAvatar } from '@src/data';
// import { nameAndOthersLabel } from '@src/pages/CommunityPage/helpers';
import './community-intro-panel.css';

type CommunityIntroPanelProps = {
  name: string;
  memberCount: number;
  rating: number;
  ratingCount: number;
  memberEngagementStatus: CommunityEngagement['status'] | null;
  onJoinClick?: () => void;
  // organizers: MemberAvatar[];
};

export function CommunityIntroPanel({
  name,
  memberCount,
  rating,
  ratingCount,
  memberEngagementStatus,
  onJoinClick,
  // organizers,
}: CommunityIntroPanelProps) {
  const isJoinPending = memberEngagementStatus === 'pending';
  const isMember = memberEngagementStatus === 'member';

  return (
    <div className="community-intro-panel">
      <h1 className="community-intro-panel__title">{name}</h1>
      <div className="community-intro-panel__attributes">
        <div className="community-intro-panel__attribute">
          <IconGroup className="community-intro-panel__icon" />
          <span className="community-intro-panel__attribute-label">
            {memberCount} members
          </span>
        </div>
        {/* <div className="community-intro-panel__attribute">
          <IconUser className="community-intro-panel__icon" />
          <span className="community-intro-panel__attribute-label">
            Organized by {nameAndOthersLabel(organizers)}
          </span>
        </div> */}
        <div className="community-intro-panel__attribute">
          <IconStar className="community-intro-panel__icon community-intro-panel__icon--rating" />
          <span className="community-intro-panel__attribute-label">
            <strong>{rating}</strong> from {ratingCount} ratings
          </span>
        </div>
      </div>
      <button
        type="button"
        className={isMember ? 'community-page__my-membership-btn' : 'community-page__join-btn'}
        onClick={onJoinClick}
        disabled={isJoinPending}
      >
        {isMember
          ? (
            <>
              My membership
              <IconCaretDown className="community-page__my-membership-btn-caret" />
            </>
          )
          : isJoinPending
            ? 'Join request pending'
            : 'Join this community'}
      </button>
    </div>
  );
}
