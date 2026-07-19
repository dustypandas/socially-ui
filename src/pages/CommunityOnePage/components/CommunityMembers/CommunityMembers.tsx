import type { MemberAvatar } from '@src/data';
import './community-members.css';

type CommunityMembersProps = {
  membersCount: number;
  memberAvatars: MemberAvatar[];
};

export function CommunityMembers({ membersCount, memberAvatars }: CommunityMembersProps) {
  return (
    <section className="community-members">
      <h3 className="community-organizers__title">
        {`${membersCount} ${membersCount === 1 ? 'Member' : 'Members'}`}
      </h3>

      <div className="community-members__grid">
        {memberAvatars.map(member => (
          <img
            key={member.id}
            className="community-members__avatar"
            src={member.image}
            alt=""
          />
        ))}
      </div>
    </section>
  );
}
