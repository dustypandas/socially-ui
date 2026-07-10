import type { Interest } from '@src/data';
import { SectionHeader, SectionMoreLink } from '@src/components/SectionHeader/SectionHeader';
import { InterestsGrid } from './InterestsGrid/InterestsGrid';
import './home-interests.css';

type HomeInterestsProps = {
  popularInterests: Interest[];
};

export function HomeInterests({ popularInterests }: HomeInterestsProps) {
  return (
    <section className="home-interests" id="home-interests">
      <div className="width-container">
        <SectionHeader title="Popular Interests" moreHref="#/interests-ui" />
        <InterestsGrid popularInterests={popularInterests} />
        <SectionMoreLink href="#/interests-ui" variant="footer" />
      </div>
    </section>
  );
}
