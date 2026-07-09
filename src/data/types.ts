// basics
export type NavLink = {
  label: string;
  href: string;
};

export type MapLocation = {
  label: string;
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
  location: Pick<MapLocation, 'label'>;
  attendees: {
    count: number;
    avatars: MemberAvatar[];
  };
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

export type Interest = {
  label: string;
  category?: string;
  followerIds?: string[];
  relatedLinks?: Link[];
};

export type MemberAvatar = {
  id: string;
  label: string;
  image: string;
  href: string;
};

export type MemberFollower = {
  id: string;
  location: MapLocation;
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
export type CommunityPageData =
& Community
& {
  organizers: MemberAvatar[];
  memberProfiles: MemberAvatar[];
  futureEventsCount: number;
  futureEvents: EventBasic[];
  pastEventsCount: number;
  pastEvents: EventBasic[];
};

export type EventPageData =
& Event
& {
  details: string;
  community: CommunityAvatar;
  attendees: {
    count: number;
    avatars: MemberAvatar[];
  };
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

export type InterestPageData = {
  interestLabel: string;
  relatedEvents: EventBasic[];
  relatedCommunities: CommunityBasic[];
};
