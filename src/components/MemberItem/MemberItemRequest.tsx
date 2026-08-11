import IconCheck from '@src/assets/icon-check-outline.svg?react';
import IconClose from '@src/assets/icon-close-outline.svg?react';
import type { CommunityMemberRequest } from '@src/common-libs/types';
import { MemberItemBase } from './MemberItemBase';

type MemberItemRequestProps = {
  member: CommunityMemberRequest;
  onAccept?: () => void;
  onDecline?: () => void;
};

export function MemberItemRequest({
  member,
  onAccept,
  onDecline,
}: MemberItemRequestProps) {
  return (
    <MemberItemBase
      member={member}
      questionResponses={[...member.basicDetails, ...member.otherDetails]}
      actions={(
        <div className="member-item__actions">
          <button
            type="button"
            className="member-item__action"
            onClick={onAccept}
          >
            <IconCheck className="member-item__action-icon" />
          </button>
          <button
            type="button"
            className="member-item__action"
            onClick={onDecline}
          >
            <IconClose className="member-item__action-icon" />
          </button>
        </div>
      )}
    />
  );
}
