import { SectionTitle } from '@src/components';
import './home-profile-new-members.css';

type HomeProfileNewMembersProps = {
  memberCount: number;
};

export function HomeProfileNewMembers({ memberCount }: HomeProfileNewMembersProps) {
  return (
    <section id="new-members" className="home-profile-new-members">
      <SectionTitle title="New Members" hideMore />
      <p className="home-profile-new-members__summary">
        {memberCount} new members have recently joined one of your communities.
      </p>
      <div className="home-profile-new-members__placeholder" />
      <div
        className="home-profile-section__end"
        data-section-id="new-members"
      />
    </section>
  );
}
