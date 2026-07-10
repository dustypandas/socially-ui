import { events, eventsForInterest } from '@src/data/dummyData.ts';
import type { EventBasic } from '../../types.ts';
import { shuffleArray } from './helpers.ts';

// export async function getEventPageData(): Promise<FullEvent> {
//   return sampleFullEvent;
// }

export async function getHomeUpcomingEvents(): Promise<EventBasic[]> {
  const MAX_HOME_UPCOMING_EVENTS = 12;

  return shuffleArray([...events]
    .sort((a, b) => a.startTime - b.startTime)
    .slice(0, MAX_HOME_UPCOMING_EVENTS),
  );
}

export async function getEventsByInterest(): Promise<EventBasic[]> {
  return eventsForInterest;
}