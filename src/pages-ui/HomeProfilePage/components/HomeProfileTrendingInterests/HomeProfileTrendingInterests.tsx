import { SectionTitle } from '@src/components';
import type { HomeProfileTrendingInterest } from '../../data/homeProfileData';
import './home-profile-trending-interests.css';

const MAX_VISIBLE_INTERESTS = 12;

type HomeProfileTrendingInterestsProps = {
  interests: HomeProfileTrendingInterest[];
};

export function HomeProfileTrendingInterests({ interests }: HomeProfileTrendingInterestsProps) {
  const visibleInterests = interests.slice(0, MAX_VISIBLE_INTERESTS);

  return (
    <section id="trending-interests" className="home-profile-trending-interests">
      <SectionTitle
        title="Trending Interests"
        moreHref="#/interests-ui"
        moreLabel="more interests →"
      />
      <ul className="home-profile-trending-interests__list">
        {visibleInterests.map(interest => (
          <li key={interest.label} className="home-profile-trending-interests__item">
            <a href="#/one-interest-ui" className="home-profile-trending-interests__link">
              #{interest.label} ({interest.followerIds?.length ?? 0})
            </a>
            {interest.newFollowersCount != null && interest.newFollowersCount > 0 && (
              <div className="home-profile-trending-interests__new-followers">
                +{interest.newFollowersCount}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div
        className="home-profile-section__end"
        data-section-id="trending-interests"
      />
    </section>
  );
}
