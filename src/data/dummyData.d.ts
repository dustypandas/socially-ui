export type NavLink = {
  label: string;
  href: string;
};

export type Interest = {
  id: string;
  name: string;
  followersCount: number;
  category?: string;
};

export type InterestFollower = {
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
  dateLabel: string;
  timeLabel: string;
  location: EventLocation;
  rating: number;
  ratingCount: number;
};

export const navLinks: NavLink[];
export const interests: Interest[];
export const MAX_FOLLOWED_INTERESTS: number;
export const followedInterestIds: string[];
export const interestFollowers: InterestFollower[];
export const events: HomeEvent[];
