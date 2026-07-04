import type { CommunityMemberProfile } from '../../../../data/dummyData';
import './community-members.css';

type CommunityMembersProps = {
  memberCount: number;
  memberProfiles: CommunityMemberProfile[];
};

export function CommunityMembers({ memberCount, memberProfiles }: CommunityMembersProps) {
  return (
    <section className="community-members">
      <h3 className="global-heading-text global-h3 community-organizers__title">{`Members (${memberCount})`}</h3>

      <div className="community-members__grid">
        {memberProfiles.map(profile => (
          <img
            key={`${profile.name}-${profile.image}`}
            className="community-members__avatar"
            src={profile.image}
            alt=""
          />
        ))}
      </div>
    </section>
  );
}
