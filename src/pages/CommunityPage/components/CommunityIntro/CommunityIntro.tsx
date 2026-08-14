import IconGroup from '@src/assets/icon-group-outline.svg?react';
import IconStar from '@src/assets/icon-star.svg?react';
import type { CommunityViewerStatus } from '@src/common-libs/types';
import { CommunityActionButtons } from '../CommunityActionButtons/CommunityActionButtons';
import './community-intro.css';

type CommunityIntroProps = {
  name: string;
  memberCount: number;
  rating: number;
  ratingCount: number;
  viewerStatus?: CommunityViewerStatus;
  isOrganiser?: boolean;
  onJoinClick?: () => void;
  onMembershipClick?: () => void;
  // organisers: MemberAvatar[];
};

export function CommunityIntro({
  name,
  memberCount,
  rating,
  ratingCount,
  viewerStatus,
  isOrganiser,
  onJoinClick,
  onMembershipClick,
  // organisers,
}: CommunityIntroProps) {
  return (
    <div className="community-intro">
      <h1 className="community-intro__title">{name}</h1>
      <div className="community-intro__attributes">
        <div className="community-intro__attribute">
          <IconGroup className="community-intro__icon" />
          <span className="community-intro__attribute-label">
            {memberCount} members
          </span>
        </div>
        <div className="community-intro__attribute">
          <IconStar className="community-intro__icon community-intro__icon--rating" />
          <span className="community-intro__attribute-label">
            <strong>{rating}</strong> from {ratingCount} ratings
          </span>
        </div>
      </div>
      <div className="community-intro__actions-container">
        <CommunityActionButtons
          viewerStatus={viewerStatus}
          isOrganiser={isOrganiser}
          onJoinClick={onJoinClick}
          onMembershipClick={onMembershipClick}
        />
      </div>
    </div>
  );
}
