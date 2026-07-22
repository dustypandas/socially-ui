import { ORGANIZERS } from './stores/dummyData.ts'; // pages shouldn't import any data from dummyData directly, only through model apis
import type { CommunitiesPageData, CommunityPageData, EventPageData, EventsPageData, HomePageData, InterestPageData, InterestsPageData, MemberPageData } from '@src/common-libs/types';
import type { CommunityScope } from '@src/common-libs/helpers';
import {
  getCommunitiesForOneInterest,
  getCommunityForOneEvent,
  getFilteredCommunities,
  getOneCommunity,
} from './queries/communities.ts';
import {
  getEventsForOneInterest,
  getFilteredEvents,
  getFutureEventsForOneCommunity,
  getHomeUpcomingEvents,
  getOneEvent,
  getPastEventsForOneCommunity,
} from './queries/events/index.ts';
import {
  getCanFollowMore,
  getFilteredInterests,
  getFollowedInterests,
  getHomePopularInterests,
  getInterestExternalLinks,
  getInterestsMemberFollowers,
  getMaxFollowedInterests,
  getOneInterest,
} from './queries/interests.ts';
import { getAttendeesForOneEvent, getMemberAvatarsForOneCommunity, getOneMemberAndEngagements } from './queries/members.ts';
import { getReviewsForOneEvent } from './queries/reviews.ts';

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

export async function getInterestPageData(): Promise<InterestPageData> {
  const targetInterest = await getOneInterest();

  const interestPageData: InterestPageData = {
    interestLabel: targetInterest.label,
    memberFollowers: await getInterestsMemberFollowers(['spanish']),
    memberFollowersCount: (3 * (targetInterest.followerIds?.length ?? 0)),
    relatedEvents: await getEventsForOneInterest(),
    relatedCommunities: await getCommunitiesForOneInterest(),
    externalLinks: await getInterestExternalLinks(),
  };

  return interestPageData;
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

  const eventPageData: EventPageData = {
    ...targetEvent,
    community: await getCommunityForOneEvent(), // to denormalise
    attendees: await getAttendeesForOneEvent(),
    reviews: await getReviewsForOneEvent(),
  };

  return eventPageData;
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

export async function getCommunityPageData(): Promise<CommunityPageData> {
  const targetCommunity = await getOneCommunity();

  const communityPageData: CommunityPageData = {
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

  return communityPageData;
}

export async function getMemberPageData(): Promise<MemberPageData> {
  const targetMemberAndEngagements = await getOneMemberAndEngagements();

  return {
    ...targetMemberAndEngagements,
  };
}
