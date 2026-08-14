import type { ReactNode } from 'react';
import type { CommunityMember, MemberAvatar, MemberQuestionResponse } from '@src/common-libs/types';
import { getReviewTimeLabel } from '@src/helpers/labelHelpers';
import './member-item.css';

type MemberItemEngagementDetails = Pick<
  CommunityMember,
  'isOrganiser' | 'joinedSince' | 'lastActivity'
>;

type MemberItemBaseProps = {
  member: MemberAvatar;
  questionResponses?: MemberQuestionResponse[];
  engagementDetails?: MemberItemEngagementDetails;
  headline?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
};

export function MemberItemBase({
  member,
  questionResponses,
  engagementDetails,
  headline,
  actions,
  footer,
}: MemberItemBaseProps) {
  return (
    <li className="member-item">
      <div className="member-item__main">
        <a href={member.href} className="member-item__avatar-link" target="_blank">
          <img
            className="member-item__avatar"
            src={member.image}
            alt=""
          />
          <div className="member-item__content">
            <div className="member-item__headline">
              {headline ?? (
                <span className="member-item__name">{member.label}</span>
              )}
            </div>
            {questionResponses && questionResponses.length > 0 && (
              <div className="member-item__details">
                {questionResponses.map(detail => (
                  <MemberItemDetailResponse
                    key={detail.id}
                    detail={detail}
                  />
                ))}
              </div>
            )}
            {engagementDetails && (
              <MemberItemEngagement details={engagementDetails} />
            )}
          </div>
        </a>
        {actions}
      </div>
      {footer}
    </li>
  );
}

function MemberItemDetailResponse({
  detail,
}: {
  detail: MemberQuestionResponse;
}) {
  return (
    <div className="member-item__detail-block">
      <span className="member-item__question">
        {detail.question}:&nbsp;
      </span>
      <span className="member-item__response">
        {detail.response}
      </span>
    </div>
  );
}

function MemberItemEngagement({
  details,
}: {
  details: MemberItemEngagementDetails;
}) {
  const roleLabel = details.isOrganiser === true ? 'Organiser' : 'Member';
  const joinedLabel = details.joinedSince.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <>
      <div className="member-item__meta">
        {roleLabel}
        <span className="member-item__dot">·</span>
        Joined {joinedLabel}
      </div>
      <div className="member-item__meta">
        Last visited {getReviewTimeLabel(details.lastActivity)}
      </div>
    </>
  );
}
