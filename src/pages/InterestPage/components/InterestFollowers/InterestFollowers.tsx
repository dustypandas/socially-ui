import type { MemberFollower } from '@src/data';
import { MapContainer } from '@src/components';
import './interest-followers.css';

type InterestFollowersProps = {
  followers: MemberFollower[];
  followersCount: number;
};

export function InterestFollowers({ followers, followersCount }: InterestFollowersProps) {
  return (
    <div className="interest-followers">
      <h3 className="interest-followers__title">
        {followersCount}+ followers
      </h3>
      <MapContainer followers={followers} />
    </div>
  );
}
