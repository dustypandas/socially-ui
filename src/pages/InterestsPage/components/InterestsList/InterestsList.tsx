import { useMemo } from 'react';
import type { Interest } from '@src/common-libs/types';
import type { InterestsPageMode } from '../InterestModeSelect/InterestModeSelect';
import './interests-list.css';
import { groupInterestsByCategory } from '../../helpers';

type InterestsListProps = {
  interests: Interest[];
  followedInterests: Interest[];
  canFollowMore: boolean;
  mode: InterestsPageMode;
  onFollow: (interest: Interest) => void;
  onUnfollow: (interestLabel: string) => void;
};

export function InterestsList({
  interests,
  followedInterests,
  canFollowMore,
  mode,
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

  const isFollowMode = mode === 'follow';

  return (
    <div className={[
      'interests-list',
      isFollowMode && 'interests-list--follow-mode',
    ].filter(Boolean).join(' ')}>
      {categoryGroups.map(group => (
        <section key={group.category} className="interests-list__category">
          <div className="interests-list__category-title">{group.category}</div>
          <ul className="interests-list__grid">
            {group.items.map(interest => {
              const isFollowed = followedSet.has(interest.label);
              const label = `#${interest.label} (${interest.followerIds?.length ?? 0})`;

              return (
              <li
                key={interest.label}
                className={[
                  'interests-list__item',
                  isFollowed && 'interests-list__item--followed',
                ].filter(Boolean).join(' ')}
              >
                {isFollowMode ? (
                  <button
                    type="button"
                    className="interests-list__item-btn"
                    disabled={!isFollowed && !canFollowMore}
                    onClick={() => isFollowed
                      ? onUnfollow(interest.label)
                      : onFollow(interest)}
                  >
                    {label}
                    <span className="interests-list__btn-icon">+</span>
                  </button>
                ) : (
                  <a
                    href="#/one-interest-ui"
                    className="interests-list__link"
                  >
                    {label}
                  </a>
                )}
              </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
