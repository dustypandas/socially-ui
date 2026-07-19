// primitives
export type NavLink = {
  label: string;
  href: string;
};

export type MapLocation = {
  label?: string;
  lat: number;
  lng: number;
};

export type Link = {
  label: string;
  href: string;
};

export type Engagement = {
  attendedCount: number;
  hostedCount: number;
  joinedSince: Date;
};

// export type DiscussionReply = {
//   id: string;
//   authorId: string;
//   body: string;
//   createdAt: string;
// };

// export type DiscussionPost = {
//   id: string;
//   interestName: string;
//   authorId: string;
//   body: string;
//   createdAt: string;
//   replies: DiscussionReply[];
// };

// export type EventPageCommunity = {
//   name: string;
//   img: string;
//   details: string;
// };

// models
export type CommunityAvatar = {
  id: string;
  name: string;
  image: string;
  href: string;
  description: string;
}
export type CommunityBasic =
& CommunityAvatar
& {
  membersCount: number;
  rating: number;
  ratingCount: number;
  interests: string[];
};
export type Community =
& Omit<CommunityBasic, 'description'>
& {
  descriptionHtml: string;
};

export type EventLink = {
  id: string;
  title: string;
  href: string;
};

export type EventBasic =
& EventLink
& {
  image: string;
  location: Pick<MapLocation, 'label'>;
  attendees: EventAttendees;
  rating: number;
  ratingCount: number;
  startTime: Date;
  // startTimeCardLabel: string;
  openTo: 'public' | 'selective' | 'invite-only';
};

export type Event = EventBasic & {
  hosts: MemberAvatar[];
  location: MapLocation;
  descriptionHtml: string;
  interests?: string[];
  reviews?: EventReview[];
};

export type EventAttendees = {
  count: number;
  avatars: MemberAvatar[];
};

export type InterestBasic = {
  label: string;
};

export type Interest =
InterestBasic & {
  category?: string;
  followerIds?: string[];
};

export type InterestCategoryGroup = {
  category: string;
  items: Interest[];
};

export type MemberAvatar = {
  id: string;
  label: string;
  image: string;
  href: string;
};

export type MemberFollower =
& MapLocation
& {
  id: string;
};

export type MemberProfile =
& MemberAvatar
& MemberFollower
& {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  inCurrCitySince: Date; // (month and year)
  prevCities: string[];
  nearestMetro: string;
  // createdAt: string;
  // updatedAt: string;
};

// complex types
export type EventReview = {
  event: EventLink;
  member: MemberAvatar;
  communityId: string;
  rating: number;
  content: string;
  date: Date;
};

export type InterestEngagement =
& InterestBasic
& Engagement;

export type CommunityEngagement =
& CommunityAvatar
& Engagement
& {
  isHost?: boolean;
  isContributor?: boolean;
  status: 'member' | 'pending' | 'rejected' | 'banned';
};

// pages data
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

export type InterestOnePageData = {
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

export type EventOnePageData =
& Event
& {
  community: CommunityAvatar;
  attendees: EventAttendees;
};

export type CommunitiesPageData = {
  filteredCommunities: CommunityBasic[];
};

// ----- no edit to data above this point, except with explicit permission -----

export type CommunityOnePageData =
& Community
& {
  organizers: MemberAvatar[];
  memberAvatars: MemberAvatar[];
  futureEventsTotalCount: number;
  futureEvents: EventBasic[];
  pastEventsTotalCount: number;
  pastEvents: EventBasic[];
};

export type MemberAbout = Record<string, string>;

export type MemberOnePageData =
& MemberProfile
& {
  engagements: {
    interests: InterestEngagement[];
    communities: CommunityEngagement[];
  };
  about: MemberAbout;
};
