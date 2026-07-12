import { attendeesForOneEvent, communityEngagementsForOneMember, interestEngagementsForOneMember, memberAvatarsForOneCommunity, memberForOneProfile } from '../../dummyData.ts';
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
  return {
    ...memberForOneProfile,
    engagements: {
      interests: interestEngagementsForOneMember.sort((a, b) => b.attendedCount - a.attendedCount),
      communities: communityEngagementsForOneMember.sort((a, b) => b.attendedCount - a.attendedCount),
    },
  };
}
