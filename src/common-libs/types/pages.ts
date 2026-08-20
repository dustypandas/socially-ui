import type { Community, CommunityAvatar, CommunityBasic, CommunityEntryConditions, CommunityMemberRequest, CommunityViewerStatus } from './community.ts';
import type { Event, EventAttendees, EventBasic, EventReview, EventViewerStatus } from './event.ts';
import type { HomeProfilePopularInterest, Interest } from './interest.ts';
import type {
  CommunityMember,
  HomeProfileMember,
  MemberAbout,
  MemberAvatar,
  MemberCommunity,
  MemberFollower,
  MemberInterest,
  MemberProfile,
} from './member.ts';
import type { Link, MapLocation } from './primitives.ts';

export type HomeSectionId =
  | 'upcoming-events'
  | 'fresh-communities'
  | 'new-members'
  | 'popular-interests';

export type HomePageData = {
  popularInterests: Interest[];
  upcomingEvents: EventBasic[];
};

export type HomeProfileEventScope = 'myInterests' | 'attending' | 'discover';

export type HomeEventIdsMap = Record<string, true>;

export type HomeProfilePageData = {
  upcomingEvents: EventBasic[];
  eventScopeIds: Record<HomeProfileEventScope, HomeEventIdsMap>;
  freshCommunities: CommunityBasic[];
  newMembers: HomeProfileMember[];
  popularInterests: HomeProfilePopularInterest[];
};

export type InterestsPageData = {
  filteredInterests: Interest[];
  followedInterests: Interest[];
  memberFollowers: MemberFollower[];
  maxFollowedInterests: number;
  canFollowMore: boolean;
};

export type InterestPageData = {
  interestLabel: string;
  memberFollowers: MemberFollower[];
  memberFollowersCount: number; // can be much more than membersFollowers.length
  relatedEvents: EventBasic[];
  relatedCommunities: CommunityBasic[];
  externalLinks?: Link[];
};


export type EventsPageData = {
  filteredEvents: EventBasic[];
};

export type EventPageData =
& Event
& {
  community: CommunityAvatar;
  attendees: EventAttendees;
  viewerStatus: EventViewerStatus | null;
  communityEntryConditions?: CommunityEntryConditions;
  isHost?: boolean;
  hasReviewed?: boolean;
};

export type CommunitiesPageData = {
  filteredCommunities: CommunityBasic[];
};

export type CommunityPageData =
& Community
& {
  organisers: MemberAvatar[];
  communityMembers: CommunityMember[];
  communityMemberRequests?: CommunityMemberRequest[];
  reviewsForOneCommunity: EventReview[];
  futureEventsTotalCount: number;
  futureEvents: EventBasic[];
  pastEventsTotalCount: number;
  pastEvents: EventBasic[];
  recentLocations: Array<MapLocation & { id: string }>;
  entryConditions?: CommunityEntryConditions;
  viewerStatus?: CommunityViewerStatus | null;
  isOrganiser?: boolean;
};

export type MemberPageData =
& MemberProfile
& {
  memberInterests: MemberInterest[];
  memberCommunities: MemberCommunity[];
  about: MemberAbout;
};
