import { ORGANIZERS } from './stores/dummyData.ts'; // pages shouldn't import any data from dummyData directly, only through model apis
import type { CommunitiesPageData, CommunityPageData, EventPageData, EventsPageData, HomePageData, HomeProfilePageData, InterestPageData, InterestsPageData, MemberPageData } from '@src/common-libs/types';
import type { CommunityScope } from '@src/common-libs/helpers';
import {
  homeAttendingEventIdsMap,
  homeDiscoverEventIdsMap,
  homeMyInterestsEventIdsMap,
} from './stores/userData/index.ts';
import {
  getCommunitiesForOneInterest,
  getCommunityForOneEvent,
  getEntryConditionsForOneCommunity,
  getFilteredCommunities,
  getHomeFreshCommunities,
  getOneCommunity,
  getSessionCommunityStatus,
} from './queries/communities.ts';
import {
  getEventsForOneInterest,
  getFilteredEvents,
  getFutureEventsForOneCommunity,
  getHomeUpcomingEvents,
  getOneEvent,
  getPastEventsForOneCommunity,
  getSessionEventStatus,
} from './queries/events/index.ts';
import {
  getCanFollowMore,
  getFilteredInterests,
  getFollowedInterests,
  getHomePopularInterests,
  getHomeProfilePopularInterests,
  getInterestExternalLinks,
  getInterestsMemberFollowers,
  getMaxFollowedInterests,
  getOneInterest,
} from './queries/interests.ts';
import { getAttendeesForOneEvent, getHomeNewMembers, getMemberAvatarsForOneCommunity, getOneMemberAndEngagements } from './queries/members.ts';
import { getReviewsForOneEvent } from './queries/reviews.ts';

export async function getHomePageData(): Promise<HomePageData> {
  const [popularInterests, upcomingEvents] = await Promise.all([
    getHomePopularInterests(),
    getHomeUpcomingEvents(),
  ]);

  return { popularInterests, upcomingEvents };
}

export async function getHomeProfilePageData(): Promise<HomeProfilePageData> {
  const [upcomingEvents, freshCommunities, newMembers, popularInterests] = await Promise.all([
    getHomeUpcomingEvents(),
    getHomeFreshCommunities(),
    getHomeNewMembers(),
    getHomeProfilePopularInterests(),
  ]);

  return {
    upcomingEvents,
    eventScopeIds: {
      myInterests: homeMyInterestsEventIdsMap,
      attending: homeAttendingEventIdsMap,
      discover: homeDiscoverEventIdsMap,
    },
    freshCommunities,
    newMembers,
    popularInterests,
  };
}

export async function getInterestsPageData(): Promise<InterestsPageData> {
  const [followedInterests, maxFollowedInterests, filteredInterests, canFollowMore] = await Promise.all([
    getFollowedInterests(),
    getMaxFollowedInterests(),
    getFilteredInterests(''),
    getCanFollowMore(),
  ]);

  const memberFollowers = await getInterestsMemberFollowers(
    followedInterests.map(interest => interest.label),
  );

  return {
    filteredInterests,
    followedInterests,
    maxFollowedInterests,
    memberFollowers,
    canFollowMore,
  };
}

export async function getInterestPageData(): Promise<InterestPageData> {
  const targetInterest = await getOneInterest();

  const [memberFollowers, relatedEvents, relatedCommunities, externalLinks] = await Promise.all([
    getInterestsMemberFollowers(['spanish']),
    getEventsForOneInterest(),
    getCommunitiesForOneInterest(),
    getInterestExternalLinks(),
  ]);

  return {
    interestLabel: targetInterest.label,
    memberFollowers,
    memberFollowersCount: 3 * (targetInterest.followerIds?.length ?? 0),
    relatedEvents,
    relatedCommunities,
    externalLinks,
  };
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

export async function getEventPageData(): Promise<EventPageData> {
  const targetEvent = await getOneEvent();
  const communityPromise = getCommunityForOneEvent();

  const [community, attendees, reviews, eventViewerStatus, communityEntryConditions] =
    await Promise.all([
      communityPromise,
      getAttendeesForOneEvent(),
      getReviewsForOneEvent(),
      communityPromise.then(c => getSessionEventStatus(targetEvent.id, c.id)),
      getEntryConditionsForOneCommunity(),
    ]);

  return {
    ...targetEvent,
    community,
    attendees,
    reviews,
    eventViewerStatus,
    ...(eventViewerStatus === null ? { communityEntryConditions } : {}),
  };
}

export async function getCommunitiesPageData(
  searchQuery: string,
  communityScope: CommunityScope,
): Promise<CommunitiesPageData> {
  return {
    filteredCommunities: await getFilteredCommunities(searchQuery, communityScope),
  };
}

export async function getCommunityPageData(): Promise<CommunityPageData> {
  const targetCommunity = await getOneCommunity();
  
  const [memberAvatars, futureEvents, pastEvents, entryConditions, communityViewerStatus] = await Promise.all([
    getMemberAvatarsForOneCommunity(),
    getFutureEventsForOneCommunity(),
    getPastEventsForOneCommunity(),
    getEntryConditionsForOneCommunity(), // only if not logged in
    getSessionCommunityStatus(targetCommunity.id),
  ]);

  return {
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
    memberAvatars,
    futureEvents,
    pastEvents,
    entryConditions,
    communityViewerStatus,
  };
}

export async function getMemberPageData(): Promise<MemberPageData> {
  return {
    ...(await getOneMemberAndEngagements()),
  };
}
