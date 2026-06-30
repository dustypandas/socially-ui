export type NavLink = {
  label: string;
  href: string;
};

export type Interest = {
  id: string;
  name: string;
  followersCount?: number;
  category?: string;
  followerIds?: string[];
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

export const navLinks: NavLink[];
export const interests: Interest[];
export const MAX_FOLLOWED_INTERESTS: number;
export const followedInterestIds: string[];
export const memberFollowers: MemberFollower[];
export const events: HomeEvent[];
export const spanishInterestEvents: HomeEvent[];
export const memberAvatarUrls: string[];
export const mockCurrentUser: MockCurrentUser;
export const spanishDiscussionPosts: DiscussionPost[];
