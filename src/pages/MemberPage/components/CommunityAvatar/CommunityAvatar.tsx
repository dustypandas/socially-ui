import type { CommunityAvatar } from '@src/data';
import './community-avatar.css';

type CommunityAvatarProps = {
  community: CommunityAvatar;
};

export function CommunityAvatar({ community }: CommunityAvatarProps) {
  return (
    <a href={community.href} className="community-avatar" target="_blank">
      <img
        className="community-avatar__img"
        src={community.image}
        alt=""
      />
      <div className="community-avatar__title-group">
        <div className="community-avatar__name">{community.name}</div>
        <div className="community-avatar__description">
          {community.description}
        </div>
      </div>
    </a>
  );
}
