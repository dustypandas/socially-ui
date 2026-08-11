import IconMessage from '@src/assets/icon-message-outline.svg?react';
import IconMore from '@src/assets/icon-more-outline.svg?react';
import type { CommunityMember } from '@src/common-libs/types';
import { MemberItemBase } from './MemberItemBase';

type MemberItemBasicProps = {
  member: CommunityMember;
};

export function MemberItemBasic({ member }: MemberItemBasicProps) {
  return (
    <MemberItemBase
      member={member}
      engagementDetails={member}
      actions={(
        <div className="member-item__actions">
          <button type="button" className="member-item__action">
            <IconMessage className="member-item__action-icon" />
          </button>
          <button type="button" className="member-item__action">
            <IconMore className="member-item__action-icon member-item__action-icon--more" />
          </button>
        </div>
      )}
    />
  );
}
