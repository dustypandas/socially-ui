import type { EventAttendees, EventAttendee, HomeProfileMember, CommunityMember, CommunityMemberRequest, MemberPageData, MemberProfile } from '@src/common-libs/types';
import { attendeesForOneEvent, attendeesListForOneEvent, memberCommunitiesForOneMember, memberInterestsForOneMember, memberAboutForOneMember, communityMembersForOneCommunity, communityMemberRequestsForOneCommunity, memberForOneProfile } from '../stores/dummyData.ts';
import { homeNewMembers } from '../stores/userData/index.ts';

export async function getAttendeesForOneEvent(): Promise<EventAttendees> {
  return attendeesForOneEvent;
}

export async function getEventAttendeesListForOneEvent(): Promise<EventAttendee[]> {
  return attendeesListForOneEvent;
}

export async function getCommunityMembersForOneCommunity(): Promise<CommunityMember[]> {
  return communityMembersForOneCommunity;
}

export async function getCommunityMemberRequestsForOneCommunity(): Promise<CommunityMemberRequest[]> {
  return communityMemberRequestsForOneCommunity;
}

export async function getOneMember(): Promise<MemberProfile> {
  return memberForOneProfile;
}

export async function getHomeNewMembers(): Promise<HomeProfileMember[]> {
  return [...homeNewMembers];
}

export async function getPageDataForOneMember(): Promise<MemberPageData> {
  const MAX_ENGAGEMENT_INTERESTS = 6;
  const MAX_ENGAGEMENT_COMMUNITIES = 5;

  return {
    ...memberForOneProfile,
    memberInterests: memberInterestsForOneMember.sort((a, b) => b.attendedCount - a.attendedCount).slice(0, MAX_ENGAGEMENT_INTERESTS),
    memberCommunities: memberCommunitiesForOneMember.sort((a, b) => b.attendedCount - a.attendedCount).slice(0, MAX_ENGAGEMENT_COMMUNITIES),
    about: memberAboutForOneMember,
  };
}
