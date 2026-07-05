import type { Community } from '../../../../data/dummyData';
import { CommunityCard } from '../CommunityCard/CommunityCard';
import './communities-section.css';

type CommunitiesSectionProps = {
  communities: Community[];
};

export function CommunitiesSection({ communities }: CommunitiesSectionProps) {
  return (
    <section className="communities-section">
      <h3 className="communities-section__title">Related Communities</h3>
      {communities.length === 0 ? (
        <p className="communities-section__empty">No related communities yet</p>
      ) : (
        <div className="communities-section__grid">
          {communities.map(community => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      )}
      <div className="communities-section__create">
        <button
          type="button"
          className="communities-section__create-btn"
        >
          {communities.length > 0 ? 'Create Another Community?' : 'Create a Community?'}
        </button>
      </div>
    </section>
  );
}
