import type { MemberFollower } from '@src/data/dummyData';
import { MapContainer } from '@src/components';
import './followers-section.css';

type FollowersSectionProps = {
  followers: MemberFollower[];
  followersCount: number;
};

export function FollowersSection({ followers, followersCount }: FollowersSectionProps) {
  return (
    <div className="followers-section">
      <h3 className="followers-section__title">
        {followersCount}+ followers
      </h3>
      <MapContainer followers={followers} />
    </div>
  );
}
