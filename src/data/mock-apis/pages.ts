import { events, interests, MAX_FOLLOWED_INTERESTS, ORGANIZERS, sampleFullCommunity } from '../dummyData';
import type { CommunityOnePageData, EventOnePageData, EventsPageData, HomePageData, InterestOnePageData, InterestsPageData } from '../types.ts';
import { getCommunitiesForOneInterest, getCommunityForOneEvent } from './models/communities.ts';
import { getEventsForOneInterest, getFilteredEvents, getHomeUpcomingEvents } from './models/events.ts';
import { getCanFollowMore, getFilteredInterests, getFollowedInterests, getHomePopularInterests, getInterestExternalLinks, getInterestsMemberFollowers } from './models/interests.ts';
import { getAttendeesForOneEvent } from './models/members.ts';

export async function getHomePageData(): Promise<HomePageData> {
  return {
    popularInterests: await getHomePopularInterests(),
    upcomingEvents: await getHomeUpcomingEvents(),
  };
}

export async function getCommunityPageData(): Promise<CommunityOnePageData> {
  return sampleFullCommunity;
}

export async function getInterestsPageData(): Promise<InterestsPageData> {
  const followedInterests = await getFollowedInterests();

  const interestsPageData: InterestsPageData = {
    filteredInterests: await getFilteredInterests(''),
    followedInterests,
    memberFollowers: await getInterestsMemberFollowers(followedInterests.map(interest => interest.label)),
    maxFollowedInterests: MAX_FOLLOWED_INTERESTS,
    canFollowMore: await getCanFollowMore(),
  };

  return interestsPageData;
}

export async function getInterestOnePageData(): Promise<InterestOnePageData> {
  const targetInterest = interests.find(interest => interest.label === 'spanish')!;
  
  const interestOnePageData: InterestOnePageData = {
    interestLabel: targetInterest.label,
    memberFollowers: await getInterestsMemberFollowers(['spanish']),
    memberFollowersCount: (3 * (targetInterest.followerIds?.length ?? 0)),
    relatedEvents: await getEventsForOneInterest(),
    relatedCommunities: await getCommunitiesForOneInterest(),
    externalLinks: await getInterestExternalLinks(),
    // discussionPosts: [
    //   {
    //     id: 'post-spanish-conversation-tips',
    //     interestName: 'Spanish',
    //     authorId: 'member-3',
    //     body: 'Anyone have tips for keeping conversations going past small talk? I can order coffee fine, but I freeze once the chat moves past the weather.',
    //     createdAt: '2026-06-25T14:30:00.000Z',
    //     replies: [
    //       {
    //         id: 'reply-post-spanish-conversation-tips-1',
    //         authorId: 'member-1',
    //         body: 'Prepare two follow-up questions before you arrive — something about Madrid, food, or weekend plans usually works.',
    //         createdAt: '2026-06-25T16:10:00.000Z',
    //       },
    //       {
    //         id: 'reply-post-spanish-conversation-tips-2',
    //         authorId: 'member-12',
    //         body: 'I keep a note on my phone with phrases like "¿Qué te gusta hacer los fines de semana?" It feels silly but it helps.',
    //         createdAt: '2026-06-25T18:45:00.000Z',
    //       },
    //       {
    //         id: 'reply-post-spanish-conversation-tips-3',
    //         authorId: 'member-6',
    //         body: 'Language exchange nights at Café Comercial are great for this — low pressure and everyone is learning.',
    //         createdAt: '2026-06-26T09:20:00.000Z',
    //       },
    //     ],
    //   },
    //   {
    //     id: 'post-spanish-subjunctive',
    //     interestName: 'Spanish',
    //     authorId: 'member-5',
    //     body: 'Still struggling with when to use subjunctive after "creo que" vs "no creo que". Any simple rules of thumb?',
    //     createdAt: '2026-06-22T11:00:00.000Z',
    //     replies: [
    //       {
    //         id: 'reply-post-spanish-subjunctive-1',
    //         authorId: 'member-9',
    //         body: 'Affirmative "creo que" → indicative. Negative "no creo que" → subjunctive. That alone cleared up half my mistakes.',
    //         createdAt: '2026-06-22T13:15:00.000Z',
    //       },
    //       {
    //         id: 'reply-post-spanish-subjunctive-2',
    //         authorId: 'member-14',
    //         body: 'Also watch for doubt/emotion triggers — "es posible que", "me alegra que" always push you into subjunctive.',
    //         createdAt: '2026-06-22T19:40:00.000Z',
    //       },
    //     ],
    //   },
    //   {
    //     id: 'post-spanish-tapas-malasaña',
    //     interestName: 'Spanish',
    //     authorId: 'member-11',
    //     body: 'Best tapas bars in Malasaña for practicing Spanish with locals? Prefer somewhere not too touristy.',
    //     createdAt: '2026-06-18T20:00:00.000Z',
    //     replies: [
    //       {
    //         id: 'reply-post-spanish-tapas-malasaña-1',
    //         authorId: 'member-4',
    //         body: 'La Ardosa on Calle Colón — busy but friendly staff who will chat if you go on a weekday evening.',
    //         createdAt: '2026-06-19T10:30:00.000Z',
    //       },
    //     ],
    //   },
    // ],
  };

  return interestOnePageData;
}

export async function getEventsPageData(): Promise<EventsPageData> {
  return {
    filteredEvents: await getFilteredEvents({
      interestQuery: '',
      timeFilter: 'thisWeek',
      openToFilter: 'any',
    }),
  };
}

export async function getEventOnePageData(): Promise<EventOnePageData> {
  const targetEvent = events.find(event => event.id === 'lightning-talks')!;

  return {
    id: targetEvent.id,
    title: targetEvent.title,
    image: targetEvent.image,
    href: targetEvent.href,
    rating: targetEvent.rating,
    ratingCount: targetEvent.ratingCount,
    startTime: targetEvent.startTime, // 1741123200000,
    location: {
      label: 'Palacio',
      lat: 40.4254,
      lng: -3.7038,
    },
    openTo: targetEvent.openTo,
    details: `<p>
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
    community: await getCommunityForOneEvent(), // to denormalise
    hosts: [ORGANIZERS.achi, ORGANIZERS.peter],
    attendees: await getAttendeesForOneEvent(),
    date: {
      timelineLabels: [
        'Feb 4, 2026',
        'Tuesday, 7:10pm',
      ],
      pageLabels: {
        monthShort: 'Feb',
        dateShort: '04',
        dateLong: 'Tuesday, February 4, 2025',
        timeLong: '12:00pm - 1:00pm',
      },
    },
    eventInterests: ['public-speaking', 'technology', 'fresh'],
  };;
}
