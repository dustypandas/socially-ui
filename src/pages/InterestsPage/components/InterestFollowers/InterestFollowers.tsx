import type { Interest, InterestFollower } from '../../../../data/dummyData';
import { FollowersMap } from './FollowersMap/FollowersMap';
import './interest-followers.css';

type InterestFollowersProps = {
  followedInterests: Interest[];
  maxFollowed: number;
  mapFollowers: InterestFollower[];
};

export function InterestFollowers({
  followedInterests,
  maxFollowed,
  mapFollowers,
}: InterestFollowersProps) {
  return (
    <div className="interest-followers">
      <div className="interest-followers__header">
        <h3 className="interest-followers__title">Following:</h3>
        <span className="interest-followers__count">
          ({followedInterests.length}/{maxFollowed})
        </span>
      </div>
      <div className="interest-followers__content">
        {followedInterests.length > 0 ? (
          <ul className="interest-followers__list">
            {followedInterests.map(interest => (
              <li key={interest.id} className="interest-followers__list-item">
                <a href="#" className="interest-followers__list-link">
                  {interest.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="interest-followers__description">
            Follow specific interests, to be notified when new related events are created
          </p>  
        )}
      </div>
      <FollowersMap followers={mapFollowers} />
    </div>
  );
}
