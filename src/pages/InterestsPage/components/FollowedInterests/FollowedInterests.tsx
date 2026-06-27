import type { Interest, MemberFollower } from '../../../../data/dummyData';
import { FollowersMap } from './FollowersMap/FollowersMap';
import './followed-interests.css';

type FollowedInterestsProps = {
  followedInterests: Interest[];
  maxFollowed: number;
  mapFollowers: MemberFollower[];
  onUnfollow: (interestId: string) => void;
};

export function FollowedInterests({
  followedInterests,
  maxFollowed,
  mapFollowers,
}: FollowedInterestsProps) {
  return (
    <div className="followed-interests">
      <div className="followed-interests__header">
        <h2 className="followed-interests__title section-header__title">Following:</h2>
        {/* <h3 className="followed-interests__title">Following:</h3> */}
        <span className="followed-interests__count">
          ({followedInterests.length}/{maxFollowed})
        </span>
      </div>
      <div className="followed-interests__content">
        {followedInterests.length > 0 ? (
          <ul className="followed-interests__list">
            {followedInterests.map(interest => (
              <li key={interest.id} className="followed-interests__list-item">
                <a href="#" className="followed-interests__list-link">
                  {interest.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="followed-interests__description">
            Follow specific interests, to be notified when new related events are created
          </p>
        )}
      </div>
      <FollowersMap followers={mapFollowers} />
    </div>
  );
}
