import type { Interest } from '@src/data';
import { SectionTitle, SectionMoreLink } from '@src/components/SectionTitle/SectionTitle';
import { InterestsGrid } from './InterestsGrid/InterestsGrid';
import './home-interests.css';

type HomeInterestsProps = {
  popularInterests: Interest[];
};

export function HomeInterests({ popularInterests }: HomeInterestsProps) {
  return (
    <section className="home-interests" id="home-interests">
      <div className="width-container">
        <SectionTitle title="Popular Interests" moreHref="#/interests-ui" />
        <InterestsGrid popularInterests={popularInterests} />
        <SectionMoreLink href="#/interests-ui" variant="footer" />
      </div>
    </section>
  );
}
