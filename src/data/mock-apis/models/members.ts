import { attendeesForOneEvent } from '../../dummyData.ts';
import type { EventAttendees } from '../../types.ts';

export async function getAttendeesForOneEvent(): Promise<EventAttendees> {
  return attendeesForOneEvent;
}
