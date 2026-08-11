import type { HomeProfileMember } from '@src/common-libs/types';
import { MemberItemBase } from './MemberItemBase';

type MemberItemNewProps = {
  member: HomeProfileMember;
};

export function MemberItemNew({ member }: MemberItemNewProps) {
  return (
    <MemberItemBase
      member={member}
      questionResponses={[...member.basicDetails, ...member.otherDetails]}
      headline={(
        <>
          <span className="member-item__name member-item__name--bold">{member.label}</span>
          {' '}just joined{' '}
          <span className="member-item__community-name">
            {member.communityName}
          </span>
        </>
      )}
      footer={(
        <div className="member-item__welcome-input-wrapper">
          <input
            type="text"
            className="member-item__welcome-input"
            placeholder="say hello..."
          />
        </div>
      )}
    />
  );
}
