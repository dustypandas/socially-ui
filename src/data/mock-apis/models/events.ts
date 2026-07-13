import { events, eventsForOneInterest, futureEventsForOneCommunity, ORGANIZERS, pastEventsForOneCommunity, reviewsForOneEvent } from '../../dummyData.ts';
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

let tempEvents: EventBasic[] = events.map(event => ({
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
    .sort((a, b) => a.startTime.valueOf() - b.startTime.valueOf())
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

export async function getOneEvent(): Promise<Event> {
  return {
    ...events.find(event => event.id === 'lightning-talks')!,
    hosts: [ORGANIZERS.achi, ORGANIZERS.peter],
    location: {
      label: 'Palacio',
      lat: 40.4254,
      lng: -3.7038,
    },
    descriptionHtml: `<p>
        5 Speakers, 5 minute presentations, 5 diverse topics! 🙌⚡️
      </p>
      <p>
        Lightning Talks is a format where a number of speakers give <b>5 minute presentations</b> about <b>any topic of their choosing</b>, followed by 5 minutes of open questions.
      </p>
      <p>
        There will be <b>5-6 talks starting at 19:30</b>, followed by drinks and social.
      </p>
      <p>
        Come join us to hear and discuss some unexpected ideas across surprising topics, broaden our horizons and meet interesting people.
      </p>
      <p>
        You can find photos from some of our recent events here:<br/>
        <a href='#'><b>https://www.instagram.com/polylogue_madrid</b></a>
      </p>
      <p>
        or sign up here if you'd like to give a talk at our next event:<br/>
        <a href='#'><b>https://forms.gle/Nx2847ZENMxkBMut8</b></a>
      </p>
    `,
    interests: ['public-speaking', 'technology', 'fresh'],
    reviews: reviewsForOneEvent,
  };
}
