import { attendeesForOneEvent, memberAvatarsForOneCommunity, memberForOneProfile } from '../../dummyData.ts';
import type { EventAttendees, MemberAvatar, MemberProfile } from '../../types.ts';

export async function getAttendeesForOneEvent(): Promise<EventAttendees> {
  return attendeesForOneEvent;
}

export async function getMemberAvatarsForOneCommunity(): Promise<MemberAvatar[]> {
  return memberAvatarsForOneCommunity;
}

export async function getOneMember(): Promise<MemberProfile> {
  return memberForOneProfile;
}
