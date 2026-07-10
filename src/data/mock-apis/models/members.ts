import { attendeesForOneEvent, membersForOneCommunity } from '../../dummyData.ts';
import type { EventAttendees, MemberAvatar } from '../../types.ts';

export async function getAttendeesForOneEvent(): Promise<EventAttendees> {
  return attendeesForOneEvent;
}

export async function getMembersForOneCommunity(): Promise<MemberAvatar[]> {
  return membersForOneCommunity;
}