import IconGroup from '@src/assets/icon-group-outline.svg?react';
import IconStar from '@src/assets/icon-star.svg?react';
import IconUser from '@src/assets/icon-user-outline.svg?react';
import type { CommunityOrganizer } from '@src/data/dummyData';
import { nameAndOthersLabel } from '@src/pages/CommunityOnePage/helpers';
import './community-intro-panel.css';

type CommunityIntroPanelProps = {
  name: string;
  memberCount: number;
  rating: number;
  ratingCount: number;
  organizers: CommunityOrganizer[];
};

export function CommunityIntroPanel({
  name,
  memberCount,
  rating,
  ratingCount,
  organizers,
}: CommunityIntroPanelProps) {
  return (
    <div className="community-intro-panel">
      <h1 className="community-intro-panel__title">{name}</h1>
      <div className="community-intro-panel__attributes">
        <div className="community-intro-panel__attribute">
          <IconGroup className="community-intro-panel__icon" />
          <span className="community-intro-panel__attribute-label">
            {memberCount} followers
          </span>
        </div>
        <div className="community-intro-panel__attribute">
          <IconUser className="community-intro-panel__icon" />
          <span className="community-intro-panel__attribute-label">
            Organized by {nameAndOthersLabel(organizers)}
          </span>
        </div>
        <div className="community-intro-panel__attribute">
          <IconStar className="community-intro-panel__icon community-intro-panel__icon--rating" />
          <span className="community-intro-panel__attribute-label">
            <strong>{rating}</strong> from {ratingCount} ratings
          </span>
        </div>
      </div>
      <button
        type="button"
        className="community-intro-panel__join-btn"
      >
        Join this community
      </button>
    </div>
  );
}
