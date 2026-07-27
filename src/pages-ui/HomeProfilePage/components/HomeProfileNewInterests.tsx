import { SectionTitle } from '@src/components';
import type { Interest } from '@src/data';
import './home-profile-new-interests.css';

type HomeProfileNewInterestsProps = {
  popularInterests: Interest[];
};

export function HomeProfileNewInterests({ popularInterests }: HomeProfileNewInterestsProps) {
  const newPopularInterests = popularInterests.slice(0, 4);

  return (
    <section className="home-profile-new-interests">
      <SectionTitle title="New Popular Interests" moreHref="#/interests-ui" />
      <ul className="home-profile-new-interests__list">
        {newPopularInterests.map(interest => (
          <li key={interest.label} className="home-profile-new-interests__item">
            <a href="#/one-interest-ui" className="home-profile-new-interests__link">
              #{interest.label} ({interest.followerIds?.length ?? 0})
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
