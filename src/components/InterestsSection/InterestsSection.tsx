import { InterestsGrid } from '../InterestsGrid/InterestsGrid';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import './interests-section.css';

export function InterestsSection() {
  return (
    <section className="interests-section">
      <div className="width-container">
        <SectionHeader title="Popular Interests" />
        <InterestsGrid />
      </div>
    </section>
  );
}
