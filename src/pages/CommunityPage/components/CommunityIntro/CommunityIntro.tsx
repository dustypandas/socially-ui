import IconGroup from '@src/assets/icon-group-outline.svg?react';
import IconStar from '@src/assets/icon-star.svg?react';
import type { CommunityViewerStatus } from '@src/common-libs/types';
import { CommunityActionButtons } from '../CommunityActionButtons/CommunityActionButtons';
import type { CommunityPanelId } from '../CommunityNav/CommunityNav';
import './community-intro.css';

type CommunityIntroProps = {
  name: string;
  memberCount: number;
  rating: number;
  ratingCount: number;
  viewerStatus?: CommunityViewerStatus;
  isOrganiser?: boolean;
  onJoinBtnClick?: () => void;
  onMemberBtnClick?: () => void;
  onNavigate?: (panelId: CommunityPanelId) => void;
  // organisers: MemberAvatar[];
};

export function CommunityIntro({
  name,
  memberCount,
  rating,
  ratingCount,
  viewerStatus,
  isOrganiser,
  onJoinBtnClick,
  onMemberBtnClick,
  onNavigate,
  // organisers,
}: CommunityIntroProps) {
  return (
    <div className="community-intro">
      <h1 className="community-intro__title">{name}</h1>
      <div className="community-intro__attributes">
        <a
          href="#members"
          className="community-intro__attribute"
          onClick={(event) => {
            event.preventDefault();
            onNavigate?.('members');
          }}
        >
          <IconGroup className="community-intro__icon" />
          <span className="community-intro__attribute-label">
            {memberCount} members
          </span>
        </a>
        <a
          href="#reviews"
          className="community-intro__attribute"
          onClick={(event) => {
            event.preventDefault();
            onNavigate?.('reviews');
          }}
        >
          <IconStar className="community-intro__icon community-intro__icon--rating" />
          <span className="community-intro__attribute-label">
            <strong>{rating}</strong> from {ratingCount} ratings
          </span>
        </a>
      </div>
      <div className="community-intro__actions-container">
        <CommunityActionButtons
          viewerStatus={viewerStatus}
          isOrganiser={isOrganiser}
          onJoinBtnClick={onJoinBtnClick}
          onMemberBtnClick={onMemberBtnClick}
        />
      </div>
    </div>
  );
}
