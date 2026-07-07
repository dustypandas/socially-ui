import { SectionHeader, SectionMoreLink } from '@src/pages/HomePage/components/SectionHeader/SectionHeader';
import { InterestsGrid } from './InterestsGrid/InterestsGrid';
import './interests-section.css';

export function InterestsSection() {
  return (
    <section className="interests-section" id="home-interests">
      <div className="width-container">
        <SectionHeader title="Popular Interests" moreHref="#/interests-ui" />
        <InterestsGrid />
        <SectionMoreLink href="#/interests-ui" variant="footer" />
      </div>
    </section>
  );
}
