import type { MemberFollower } from '../../../../data/dummyData';
import { MapContainer } from '../../../../components';
import './followers-section.css';

type FollowersSectionProps = {
  followers: MemberFollower[];
  followersCount: number;
};

export function FollowersSection({ followers, followersCount }: FollowersSectionProps) {
  return (
    <div className="followers-section">
      <h3 className="global-heading-text followers-section__title">
        {followersCount}+ followers
      </h3>
      <MapContainer followers={followers} />
    </div>
  );
}
