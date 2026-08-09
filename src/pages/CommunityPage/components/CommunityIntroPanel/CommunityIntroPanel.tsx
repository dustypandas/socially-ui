import IconGroup from '@src/assets/icon-group-outline.svg?react';
import IconStar from '@src/assets/icon-star.svg?react';
import type { CommunityEngagement } from '@src/common-libs/types';
// import IconUser from '@src/assets/icon-user-outline.svg?react';
// import type { MemberAvatar } from '@src/data';
// import { nameAndOthersLabel } from '@src/pages/CommunityPage/helpers';
import { CommunityActionButtons } from '../CommunityActionButtons/CommunityActionButtons';
import './community-intro-panel.css';

type CommunityIntroPanelProps = {
  name: string;
  memberCount: number;
  rating: number;
  ratingCount: number;
  memberEngagementStatus: CommunityEngagement['status'] | null;
  onJoinClick?: () => void;
  onMembershipClick?: () => void;
  // organizers: MemberAvatar[];
};

export function CommunityIntroPanel({
  name,
  memberCount,
  rating,
  ratingCount,
  memberEngagementStatus,
  onJoinClick,
  onMembershipClick,
  // organizers,
}: CommunityIntroPanelProps) {
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
        <div className="community-intro-panel__attribute">
          <IconStar className="community-intro-panel__icon community-intro-panel__icon--rating" />
          <span className="community-intro-panel__attribute-label">
            <strong>{rating}</strong> from {ratingCount} ratings
          </span>
        </div>
      </div>
      <div className="community-intro-panel__actions-container">
        <CommunityActionButtons
          membershipStatus={memberEngagementStatus}
          onJoinClick={onJoinClick}
          onMembershipClick={onMembershipClick}
        />
      </div>
    </div>
  );
}
