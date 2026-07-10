import { events, eventsForOneInterest, futureEventsForOneCommunity, pastEventsForOneCommunity } from '../../dummyData.ts';
import type { Event, EventBasic } from '../../types.ts';
import { OpenToFilter, TimeFilter } from '../global-helpers.ts';
import { filterEvents } from './events-filters.ts';
import { shuffleArray } from './helpers.ts';

const EVENT_INTERESTS_BY_ID: Record<string, string[]> = {
  'lightning-talks': ['ai'],
  'psychedelic-sharing-circle': ['psychedelics'],
  'urban-sketching': ['painting'],
  'open-air-lindy-hop-class': ['tango'],
  'wine-tasting-event': ['cooking'],
};

let tempEvents: Event[] = events.map(event => ({
  ...event,
  hosts: [],
  location: { ...event.location, lat: 0, lng: 0 },
  eventInterests: EVENT_INTERESTS_BY_ID[event.id],
}));

export type EventsFilterParams = {
  interestQuery: string;
  timeFilter: TimeFilter;
  openToFilter: OpenToFilter;
};

export async function getFilteredEvents(params: EventsFilterParams): Promise<EventBasic[]> {
  return filterEvents(
    tempEvents,
    params.interestQuery,
    params.timeFilter,
    params.openToFilter,
  );
}

export async function getHomeUpcomingEvents(): Promise<EventBasic[]> {
  const MAX_HOME_UPCOMING_EVENTS = 8;

  return shuffleArray([...events]
    .sort((a, b) => a.startTime - b.startTime)
    .slice(0, MAX_HOME_UPCOMING_EVENTS),
  );
}

export async function getEventsForOneInterest(): Promise<EventBasic[]> {
  return eventsForOneInterest;
}

export async function getFutureEventsForOneCommunity(): Promise<EventBasic[]> {
  return futureEventsForOneCommunity;
}

export async function getPastEventsForOneCommunity(): Promise<EventBasic[]> {
  return pastEventsForOneCommunity;
}