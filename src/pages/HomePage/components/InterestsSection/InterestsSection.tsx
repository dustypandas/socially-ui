import { InterestsGrid } from './InterestsGrid/InterestsGrid';
import { SectionHeader } from '../../../../components/SectionHeader/SectionHeader';
import './interests-section.css';

export function InterestsSection() {
  return (
    <section className="interests-section">
      <div className="width-container">
        <SectionHeader title="Popular Interests" moreHref="#/interests-ui" />
        <InterestsGrid />
      </div>
    </section>
  );
}
