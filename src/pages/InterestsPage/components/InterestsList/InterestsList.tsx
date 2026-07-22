import { useMemo } from 'react';
import type { Interest } from '@src/data';
import './interests-list.css';
import { groupInterestsByCategory } from '../../helpers';

type InterestsListProps = {
  interests: Interest[];
  followedInterests: Interest[];
  canFollowMore: boolean;
  onFollow: (interest: Interest) => void;
  onUnfollow: (interestLabel: string) => void;
};

export function InterestsList({
  interests,
  followedInterests,
  canFollowMore,
  onFollow,
  onUnfollow,
}: InterestsListProps) {
  const followedSet = useMemo(
    () => new Set(followedInterests.map(interest => interest.label)),
    [followedInterests],
  );

  const categoryGroups = useMemo(() => {
    return groupInterestsByCategory(interests);
  }, [interests]);

  return (
    <div className="interests-list">
      {categoryGroups.map(group => (
        <section key={group.category} className="interests-list__category">
          <div className="interests-list__category-title">{group.category}</div>
          <ul className="interests-list__grid">
            {group.items.map(interest => {
              const isFollowed = followedSet.has(interest.label);

              return (
              <li
                key={interest.label}
                className={[
                  'interests-list__item',
                  isFollowed && 'interests-list__item--followed',
                ].filter(Boolean).join(' ')}
              >
                <a
                  href="#/one-interest-ui"
                  className="interests-list__link"
                >
                  #{interest.label} ({interest.followerIds?.length ?? 0})
                </a>
                {isFollowed
                  ? (<button
                      type="button"
                      className="interests-list__unfollow-btn"
                      onClick={() => onUnfollow(interest.label)}
                    >
                      <span className="interests-list__btn-icon">+</span>
                    </button>
                  )
                  : (<button
                      type="button"
                      className='interests-list__follow-btn'
                      disabled={!canFollowMore}
                      onClick={() => onFollow(interest)}
                    >
                      <span className="interests-list__btn-icon">+</span>
                    </button>
                  )
                }
              </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
