import type { EventAttendees, HomeProfileMember, MemberAvatar, CommunityMember, MemberPageData, MemberProfile } from '@src/common-libs/types';
import { attendeesForOneEvent, communityEngagementsForOneMember, interestEngagementsForOneMember, memberAboutForOneMember, memberAvatarsForOneCommunity, memberEngagementsForOneCommunity, memberForOneProfile } from '../stores/dummyData.ts';
import { homeNewMembers } from '../stores/userData/index.ts';

export async function getAttendeesForOneEvent(): Promise<EventAttendees> {
  return attendeesForOneEvent;
}

export async function getMemberAvatarsForOneCommunity(): Promise<MemberAvatar[]> {
  return memberAvatarsForOneCommunity;
}

export async function getMemberEngagementsForOneCommunity(): Promise<CommunityMember[]> {
  return memberEngagementsForOneCommunity;
}

export async function getOneMember(): Promise<MemberProfile> {
  return memberForOneProfile;
}

export async function getHomeNewMembers(): Promise<HomeProfileMember[]> {
  return [...homeNewMembers];
}

export async function getOneMemberAndEngagements(): Promise<MemberPageData> {
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
