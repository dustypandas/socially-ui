export type NavLink = {
  label: string;
  href: string;
};

export type RelatedLink = {
  label: string;
  href: string;
};

export type CommunityOrganizer = {
  name: string;
  image: string;
};

export type CommunityMemberProfile = {
  name: string;
  image: string;
};

export type CommunityPageData = {
  id: string;
  name: string;
  image: string;
  memberCount: number;
  rating: number;
  ratingCount: number;
  pastEventsCount: number;
  pastEvents: HomeEvent[];
  detailsHtml: string;
  organizers: CommunityOrganizer[];
  memberProfiles: CommunityMemberProfile[];
  upcomingEvents: HomeEvent[];
};

export type Community = {
  id: string;
  name: string;
  image: string;
  href: string;
  memberCount: number;
  rating: number;
  ratingCount: number;
  description?: string;
  interests?: string[];
};

export type Interest = {
  id: string;
  name: string;
  followersCount?: number;
  category?: string;
  followerIds?: string[];
  relatedLinks?: RelatedLink[];
};

export type MemberFollower = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

export type EventHost = {
  name: string;
  href: string;
};

export type EventLocation = {
  name: string;
  href: string;
};

export type HomeEvent = {
  id: string;
  title: string;
  image: string;
  host: EventHost;
  attendees: {
    count: number;
  };
  dateLabel: string;
  timeLabel: string;
  location: EventLocation;
  rating: number;
  ratingCount: number;
  startsAt: string;
  openTo: 'public' | 'selective' | 'invite-only';
  interestIds?: string[];
};

export type MockCurrentUser = {
  id: string;
  name: string;
};

export type DiscussionReply = {
  id: string;
  authorId: string;
  body: string;
  createdAt: string;
};

export type DiscussionPost = {
  id: string;
  interestId: string;
  authorId: string;
  body: string;
  createdAt: string;
  replies: DiscussionReply[];
};

export type EventPageDateLabels = {
  monthShort: string;
  dateShort: string;
  dateLong: string;
  timeLong: string;
};

export type EventPageMember = {
  name: string;
  img: string;
};

export type EventPageCommunity = {
  name: string;
  img: string;
  details: string;
};

export type FullEvent = {
  title: string;
  img: string;
  location: string;
  details: string;
  community: EventPageCommunity;
  hosts: EventPageMember[];
  attendees: {
    profiles: EventPageMember[];
    count: number;
  };
  date: {
    timelineLabels: string[];
    pageLabels: EventPageDateLabels;
  };
};

export const navLinks: NavLink[];
export const interests: Interest[];
export const MAX_FOLLOWED_INTERESTS: number;
export const followedInterestIds: string[];
export const memberFollowers: MemberFollower[];
export const events: HomeEvent[];
export const spanishInterestEvents: HomeEvent[];
export const communities: Community[];
export const myCommunityIds: string[];
export const spanishRelatedCommunities: Community[];
export const sampleCommunityPage: CommunityPageData;
export const sampleFullEvent: FullEvent;
export const memberAvatarUrls: string[];
export const mockCurrentUser: MockCurrentUser;
export const spanishDiscussionPosts: DiscussionPost[];
