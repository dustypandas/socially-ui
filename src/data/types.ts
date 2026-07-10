// basics
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

export type EventBasic = {
  id: string;
  title: string;
  image: string;
  href: string;
  location: Pick<MapLocation, 'label'>;
  attendees: EventAttendees;
  rating: number;
  ratingCount: number;
  startTime: number;
  openTo: 'public' | 'selective' | 'invite-only';
};

export type Event = EventBasic & {
  hosts: MemberAvatar[];
  location: MapLocation;
  eventInterests?: string[];
};

export type EventAttendees = {
  count: number;
  avatars: MemberAvatar[];
};

export type Interest = {
  label: string;
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
  // createdAt: string;
  // updatedAt: string;
};

// pages data
export type HomePageData = {
  popularInterests: Interest[];
  upcomingEvents: EventBasic[];
};

export type CommunityOnePageData =
& Community
& {
  organizers: MemberAvatar[];
  memberProfiles: MemberAvatar[];
  futureEventsCount: number;
  futureEvents: EventBasic[];
  pastEventsCount: number;
  pastEvents: EventBasic[];
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
  details: string;
  community: CommunityAvatar;
  attendees: EventAttendees;
  date: {
    timelineLabels: string[];
    pageLabels: {
      monthShort: string;
      dateShort: string;
      dateLong: string;
      timeLong: string;
    };
  };
  eventInterests: string[];
};
