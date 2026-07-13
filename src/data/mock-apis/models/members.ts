import { attendeesForOneEvent, communityEngagementsForOneMember, interestEngagementsForOneMember, memberAboutForOneMember, memberAvatarsForOneCommunity, memberForOneProfile } from '../../dummyData.ts';
import type { EventAttendees, MemberAvatar, MemberOnePageData, MemberProfile } from '../../types.ts';

export async function getAttendeesForOneEvent(): Promise<EventAttendees> {
  return attendeesForOneEvent;
}

export async function getMemberAvatarsForOneCommunity(): Promise<MemberAvatar[]> {
  return memberAvatarsForOneCommunity;
}

export async function getOneMember(): Promise<MemberProfile> {
  return memberForOneProfile;
}

export async function getOneMemberAndEngagements(): Promise<MemberOnePageData> {
  const MAX_ENGAGEMENT_INTERESTS = 6;
  const MAX_ENGAGEMENT_COMMUNITIES = 5;

  return {
    ...memberForOneProfile,
    engagements: {
      interests: interestEngagementsForOneMember.sort((a, b) => b.attendedCount - a.attendedCount).slice(0, MAX_ENGAGEMENT_INTERESTS),
      communities: communityEngagementsForOneMember.sort((a, b) => b.attendedCount - a.attendedCount).slice(0, MAX_ENGAGEMENT_COMMUNITIES),
    },
    about: memberAboutForOneMember,
  };
}
