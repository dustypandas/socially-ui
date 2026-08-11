import { MemberItemNew, SectionTitle } from '@src/components';
import type { HomeProfileMember } from '@src/common-libs/types';
import './home-profile-new-members.css';

type HomeProfileNewMembersProps = {
  members: HomeProfileMember[];
};

const MAX_MEMBERS_TO_SHOW = 3;

export function HomeProfileNewMembers({ members }: HomeProfileNewMembersProps) {
  return (
    <section id="new-members" className="home-profile-new-members">
      <SectionTitle
        title="New Members"
        moreHref="#/one-member"
        moreLabel="more new members →"
        hideMore={members.length <= MAX_MEMBERS_TO_SHOW} />
      <div className="home-profile-new-members__summary">
        {members.length} new members recently joined one of your communities.
      </div>
      <ul className="home-profile-new-members__list">
        {members.slice(0, MAX_MEMBERS_TO_SHOW).map(member => (
          <MemberItemNew key={member.id} member={member} />
        ))}
      </ul>
      <div
        className="home-profile-section__end"
        data-section-id="new-members"
      />
    </section>
  );
}
