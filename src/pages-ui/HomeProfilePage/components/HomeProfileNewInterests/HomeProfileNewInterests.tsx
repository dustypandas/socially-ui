import { SectionTitle } from '@src/components';
import type { Interest } from '@src/data';
import './home-profile-new-interests.css';

const MAX_VISIBLE_INTERESTS = 12;

type HomeProfileNewInterestsProps = {
  interests: Interest[];
};

export function HomeProfileNewInterests({ interests }: HomeProfileNewInterestsProps) {
  const visibleInterests = interests.slice(0, MAX_VISIBLE_INTERESTS);

  return (
    <section id="fresh-interests" className="home-profile-new-interests">
      <SectionTitle
        title="Fresh Interests"
        moreHref="#/interests-ui"
        moreLabel="more interests →"
      />
      <ul className="home-profile-new-interests__list">
        {visibleInterests.map(interest => (
          <li key={interest.label} className="home-profile-new-interests__item">
            <a href="#/one-interest-ui" className="home-profile-new-interests__link">
              #{interest.label} ({interest.followerIds?.length ?? 0})
            </a>
          </li>
        ))}
      </ul>
      <div
        className="home-profile-section__end"
        data-section-id="fresh-interests"
      />
    </section>
  );
}
