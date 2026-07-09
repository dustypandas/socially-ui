import type { MemberProfile } from '@src/data';
import './community-members.css';

type CommunityMembersProps = {
  memberCount: number;
  memberProfiles: MemberProfile[];
};

export function CommunityMembers({ memberCount, memberProfiles }: CommunityMembersProps) {
  return (
    <section className="community-members">
      <h3 className="community-organizers__title">{`Members (${memberCount})`}</h3>

      <div className="community-members__grid">
        {memberProfiles.map(profile => (
          <img
            key={profile.id}
            className="community-members__avatar"
            src={profile.avatar}
            alt=""
          />
        ))}
      </div>
    </section>
  );
}
