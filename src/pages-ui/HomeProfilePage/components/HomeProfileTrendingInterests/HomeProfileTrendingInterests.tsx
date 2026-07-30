import { SectionTitle } from '@src/components';
import type { Interest } from '@src/data';
import './home-profile-trending-interests.css';

const MAX_VISIBLE_INTERESTS = 12;

type HomeProfileTrendingInterestsProps = {
  interests: Interest[];
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
