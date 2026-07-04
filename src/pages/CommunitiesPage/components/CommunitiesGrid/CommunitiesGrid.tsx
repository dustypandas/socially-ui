import type { Community } from '../../../../data/dummyData';
import { CommunityCard } from '../../../InterestOnePage/components/CommunityCard/CommunityCard';
import './communities-grid.css';

type CommunitiesGridProps = {
  communities: Community[];
};

export function CommunitiesGrid({ communities }: CommunitiesGridProps) {
  if (communities.length === 0) {
    return (
      <p className="communities-grid__empty">No communities match your search</p>
    );
  }

  return (
    <div className="communities-grid">
      {communities.map(community => (
        <CommunityCard key={community.id} community={community} />
      ))}
    </div>
  );
}
