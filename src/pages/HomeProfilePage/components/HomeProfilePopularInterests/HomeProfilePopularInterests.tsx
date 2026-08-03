import { SectionTitle } from '@src/components';
import type { HomeProfilePopularInterest } from '@src/common-libs/types';
import './home-profile-popular-interests.css';

const MAX_VISIBLE_INTERESTS = 12;

type HomeProfilePopularInterestsProps = {
  interests: HomeProfilePopularInterest[];
};

export function HomeProfilePopularInterests({ interests }: HomeProfilePopularInterestsProps) {
  const visibleInterests = interests.slice(0, MAX_VISIBLE_INTERESTS);

  return (
    <section id="popular-interests" className="home-profile-popular-interests">
      <SectionTitle
        title="Popular Interests"
        moreHref="#/interests-ui"
        moreLabel="more interests →"
      />
      <ul className="home-profile-popular-interests__list">
        {visibleInterests.map(interest => (
          <li key={interest.label} className="home-profile-popular-interests__item">
            <a href="#/one-interest-ui" className="home-profile-popular-interests__link">
              #{interest.label} ({interest.followerIds?.length ?? 0})
            </a>
            {interest.newFollowersCount != null && interest.newFollowersCount > 0 && (
              <div className="home-profile-popular-interests__new-followers">
                +{interest.newFollowersCount}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div
        className="home-profile-section__end"
        data-section-id="popular-interests"
      />
    </section>
  );
}
