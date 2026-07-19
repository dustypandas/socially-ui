import { ORGANIZERS } from '../dummyData'; // pages shouldn't import any data from dummyData directly, only through model apis
import type { CommunitiesPageData, CommunityOnePageData, EventOnePageData, EventsPageData, HomePageData, InterestOnePageData, InterestsPageData, MemberOnePageData } from '../types.ts';
import { getCommunitiesForOneInterest, getCommunityForOneEvent, getFilteredCommunities, getOneCommunity, type CommunityScope } from './models/communities.ts';
import { getEventsForOneInterest, getFilteredEvents, getFutureEventsForOneCommunity, getHomeUpcomingEvents, getOneEvent, getPastEventsForOneCommunity } from './models/events.ts';
import { getCanFollowMore, getFilteredInterests, getFollowedInterests, getHomePopularInterests, getInterestExternalLinks, getInterestsMemberFollowers, getMaxFollowedInterests, getOneInterest } from './models/interests.ts';
import { getAttendeesForOneEvent, getMemberAvatarsForOneCommunity, getOneMemberAndEngagements } from './models/members.ts';
import { getReviewsForOneEvent } from './models/reviews.ts';

export async function getHomePageData(): Promise<HomePageData> {
  return {
    popularInterests: await getHomePopularInterests(),
    upcomingEvents: await getHomeUpcomingEvents(),
  };
}

export async function getInterestsPageData(): Promise<InterestsPageData> {
  const followedInterests = await getFollowedInterests();
  const maxFollowedInterests = await getMaxFollowedInterests();

  const interestsPageData: InterestsPageData = {
    filteredInterests: await getFilteredInterests(''),
    followedInterests,
    maxFollowedInterests,
    memberFollowers: await getInterestsMemberFollowers(followedInterests.map(interest => interest.label)),
    canFollowMore: await getCanFollowMore(),
  };

  return interestsPageData;
}

export async function getInterestOnePageData(): Promise<InterestOnePageData> {
  const targetInterest = await getOneInterest();
  
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
  const targetEvent = await getOneEvent();

  const eventOnePageData: EventOnePageData = {
    ...targetEvent,
    community: await getCommunityForOneEvent(), // to denormalise
    attendees: await getAttendeesForOneEvent(),
    reviews: await getReviewsForOneEvent(),
  };

  return eventOnePageData;
}

export async function getCommunitiesPageData(
  searchQuery: string,
  communityScope: CommunityScope,
): Promise<CommunitiesPageData> {
  const communitiesPageData: CommunitiesPageData = {
    filteredCommunities: await getFilteredCommunities(searchQuery, communityScope),
  };

  return communitiesPageData;
}

export async function getCommunityOnePageData(): Promise<CommunityOnePageData> {
  const targetCommunity = await getOneCommunity();

  const communityOnePageData: CommunityOnePageData = {
    ...targetCommunity,
    futureEventsTotalCount: 5,
    pastEventsTotalCount: 25,
    descriptionHtml: `
      <p>
        Polylogue is a community for meeting people who share diverse interests, eclectic curiosities, wayward stories and uncommon perspectives. 🎓📚💫
      </p>
      <p>
        Come join us for fortnightly "Lightning Talks" - where a number of speakers give 5 minute presentations about any topic of their choosing, followed by 5 minutes of open questions.
      </p>
    `,
    interests: ['public-speaking', 'technology', 'fresh'],
    organizers: [ORGANIZERS.achi, ORGANIZERS.peter, ORGANIZERS.maria],
    memberAvatars: await getMemberAvatarsForOneCommunity(),
    futureEvents: await getFutureEventsForOneCommunity(),
    pastEvents: await getPastEventsForOneCommunity(),
  };

  return communityOnePageData;
}

export async function getMemberOnePageData(): Promise<MemberOnePageData> {
  const targetMemberAndEngagements = await getOneMemberAndEngagements();

  return {
    ...targetMemberAndEngagements,
  };
}

