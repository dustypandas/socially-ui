import type { CommunityEngagement } from '@src/data';
import { SectionHeader } from '@src/components/SectionHeader/SectionHeader';
import { CommunityAvatar } from '../CommunityAvatar/CommunityAvatar';
import './member-communities.css';

type MemberCommunitiesProps = {
  communities: CommunityEngagement[];
};

export function MemberCommunities({ communities }: MemberCommunitiesProps) {
  return (
    <section className="member-communities">
      <SectionHeader title="Active Communities" />
      {communities.length === 0 ? (
        <div className="member-communities__empty">No active communities</div>
      ) : (
        <ul className="member-communities__list">
          {communities.map(community => (
            <li key={community.id} className="member-communities__item">
              <CommunityAvatar community={community} />
              <div className="member-communities__engagement">
                {community.status === 'rejected' && (
                  <div className="member-communities__rejected">Rejected</div>
                )}
                {community.status === 'banned' && (
                  <div className="member-communities__banned">Banned</div>
                )}
                {community.status === 'pending' && (
                  <div className="member-communities__pending">Pending</div>
                )}
                {community.isHost && (
                  <div className="member-communities__host">Host</div>
                )}
                {community.isContributor && (
                  <div className="member-communities__contributor">Star!</div>
                )}
                {community.attendedCount > 0 && (
                  <div className="member-communities__attended">
                    {community.attendedCount} attended
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
