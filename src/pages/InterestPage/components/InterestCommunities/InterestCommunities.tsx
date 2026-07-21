import type { CommunityBasic } from '@src/data';
import { CommunityCard } from '@src/components';
import './interest-communities.css';

type InterestCommunitiesProps = {
  communities: CommunityBasic[];
};

export function InterestCommunities({ communities }: InterestCommunitiesProps) {
  return (
    <section className="interest-communities">
      <h3 className="interest-communities__title">Related Communities</h3>
      {communities.length === 0 ? (
        <div className="interest-communities__empty">No related communities yet</div>
      ) : (
        <div className="interest-communities__grid">
          {communities.map(community => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      )}
      <div className="interest-communities__create">
        <button
          type="button"
          className="interest-communities__create-btn"
        >
          {communities.length > 0 ? 'Create Another Community?' : 'Create a Community?'}
        </button>
      </div>
    </section>
  );
}
