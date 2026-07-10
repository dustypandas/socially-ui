import type { MemberAvatar } from '@src/data';
import './community-members.css';

type CommunityMembersProps = {
  membersCount: number;
  memberProfiles: MemberAvatar[];
};

export function CommunityMembers({ membersCount, memberProfiles }: CommunityMembersProps) {
  return (
    <section className="community-members">
      <h3 className="community-organizers__title">{`Members (${membersCount})`}</h3>

      <div className="community-members__grid">
        {memberProfiles.map(profile => (
          <img
            key={profile.id}
            className="community-members__avatar"
            src={profile.image}
            alt=""
          />
        ))}
      </div>
    </section>
  );
}
