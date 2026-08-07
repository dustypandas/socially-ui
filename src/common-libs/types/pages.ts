import type { Community, CommunityAvatar, CommunityBasic, CommunityEntryConditions } from './community.ts';
import type { Event, EventAttendees, EventBasic } from './event.ts';
import type { HomeProfilePopularInterest, Interest } from './interest.ts';
import type {
  CommunityEngagement,
  HomeProfileMember,
  InterestEngagement,
  MemberAbout,
  MemberAvatar,
  MemberFollower,
  MemberProfile,
} from './member.ts';
import type { Link } from './primitives.ts';

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

export type EventViewerStatus = 'member' | 'pending' | 'attending' | 'banned' | 'waitlisted';

export type EventPageData =
& Event
& {
  community: CommunityAvatar;
  attendees: EventAttendees;
  memberEngagementStatus: EventViewerStatus | null;
  communityEntryConditions?: CommunityEntryConditions;
};

export type CommunitiesPageData = {
  filteredCommunities: CommunityBasic[];
};

export type CommunityPageData =
& Community
& {
  organizers: MemberAvatar[];
  memberAvatars: MemberAvatar[];
  futureEventsTotalCount: number;
  futureEvents: EventBasic[];
  pastEventsTotalCount: number;
  pastEvents: EventBasic[];
  entryConditions?: CommunityEntryConditions;
  memberEngagementStatus: CommunityEngagement['status'] | null;
};

export type MemberPageData =
& MemberProfile
& {
  engagements: {
    interests: InterestEngagement[];
    communities: CommunityEngagement[];
  };
  about: MemberAbout;
};
