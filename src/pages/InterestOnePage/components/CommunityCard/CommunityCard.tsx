import IconGroup from '@src/assets/icon-group-outline.svg?react';
import IconStar from '@src/assets/icon-star.svg?react';
import type { Community } from '@src/data/dummyData';
import './community-card.css';

type CommunityCardProps = {
  community: Community;
};

export function CommunityCard({ community }: CommunityCardProps) {
  return (
    <a href={community.href} className="community-card" target="_blank">
      <img className="community-card__image" src={community.image} alt="" />
      <div className="community-card__body">
        <h3 className="community-card__title">
          {community.name}
        </h3>
        <div className="community-card__row">
          <IconGroup className="community-card__icon community-card__icon--members" />
          <span className="community-card__text">
            {community.memberCount} members
          </span>
        </div>
        <div className="community-card__row">
          <IconStar className="community-card__icon community-card__icon--rating" />
          <span className="community-card__text">
            {community.ratingCount ? community.rating : 'NEW'} ({community.ratingCount} ratings)
          </span>
        </div>
      </div>
    </a>
  );
}
