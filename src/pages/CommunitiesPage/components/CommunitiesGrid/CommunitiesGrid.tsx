import type { CommunityBasic } from '@src/data';
import { CommunityCard } from '@src/components';
import './communities-grid.css';

type CommunitiesGridProps = {
  communities: CommunityBasic[];
};

export function CommunitiesGrid({ communities }: CommunitiesGridProps) {
  if (communities.length === 0) {
    return (
      <div className="communities-grid__empty">No communities match your search</div>
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
