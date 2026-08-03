import type { Community, CommunityAvatar, CommunityBasic } from './community.ts';
import type { Event, EventAttendees, EventBasic } from './event.ts';
import type { Interest } from './interest.ts';
import type {
  CommunityEngagement,
  InterestEngagement,
  MemberAbout,
  MemberAvatar,
  MemberFollower,
  MemberProfile,
} from './member.ts';
import type { Link } from './primitives.ts';

export type HomePageData = {
  popularInterests: Interest[];
  upcomingEvents: EventBasic[];
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
