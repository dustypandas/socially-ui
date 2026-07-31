import { SectionTitle } from '@src/components';
import type { HomeProfileMember } from '../../data/homeProfileData';
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
          <HomeProfileNewMembersRow key={member.id} member={member} />
        ))}
      </ul>
      <div
        className="home-profile-section__end"
        data-section-id="new-members"
      />
    </section>
  );
}

function HomeProfileNewMembersRow({ member }: { member: HomeProfileMember }) {
  return (
    <li className="home-profile-new-members__item">
      <a href={member.href} className="home-profile-new-members__avatar-link">
        <img
          className="home-profile-new-members__avatar"
          src={member.image}
          alt=""
        />
        <div className="home-profile-new-members__content">
          <div className="home-profile-new-members__community">
            <span className="home-profile-new-members__name">{member.label}</span>
            {' '}just joined{' '}
            <span className="home-profile-new-members__community-name">
              {member.community.name}
            </span>
          </div>
          {member.basicDetails.length > 0 && (
            <div className="home-profile-new-members__detail">
              {member.basicDetails.map((detail, index) => (
                <HomeProfileNewMembersDetailResponse
                  key={detail.question}
                  detail={detail}
                  showLeadingComma={index > 0}
                />
              ))}
            </div>
          )}
          {member.otherDetails.map(detail => (
            <div key={detail.question} className="home-profile-new-members__detail">
              <HomeProfileNewMembersDetailResponse detail={detail} />
            </div>
          ))}
        </div>
      </a>
      <div className="home-profile-new-members__welcome-input-wrapper">
        <input
          type="text"
          className="home-profile-new-members__welcome-input"
          placeholder="say hello..."
        />
      </div>
    </li>
  );
}

function HomeProfileNewMembersDetailResponse({
  detail,
  showLeadingComma = false,
}: {
  detail: HomeProfileMember['basicDetails'][number];
  showLeadingComma?: boolean;
}) {
  return (
    <span>
      <span className="home-profile-new-members__question">
        {showLeadingComma && ', '}
        {detail.question}:&nbsp;
      </span>
      <span className="home-profile-new-members__response">
        {detail.response}
      </span>
    </span>
  );
}
