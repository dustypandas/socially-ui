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
      <SectionHeader title="Active Communities" hideMore />
      {communities.length > 0 && (
        <ul className="member-communities__list">
          {communities.map(community => (
            <li key={community.id} className="member-communities__item">
              <CommunityAvatar community={community} />
              <div className="member-communities__engagement">
                {community.attendedCount} attended
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
