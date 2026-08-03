import { SectionTitle } from '@src/components';
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
  const allDetails = [...member.basicDetails, ...member.otherDetails];

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
              {member.communityName}
            </span>
          </div>
          {allDetails.length > 0 && (
            <div className="home-profile-new-members__details">
              {allDetails.map(detail => (
                <HomeProfileNewMembersDetailResponse
                  key={detail.question}
                  detail={detail}
                />
              ))}
            </div>
          )}
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
}: {
  detail: HomeProfileMember['basicDetails'][number];
}) {
  return (
    <div className="home-profile-new-members__detail-block">
      <span className="home-profile-new-members__question">
        {detail.question}:&nbsp;
      </span>
      <span className="home-profile-new-members__response">
        {detail.response}
      </span>
    </div>
  );
}
