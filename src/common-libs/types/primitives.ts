export type NavLink = {
  label: string;
  href: string;
};

export type MapLocation = {
  label?: string;
  lat: number;
  lng: number;
};

export type AddressLocation =
& MapLocation
& {
  name: string;
  address: string[];
  postcode: string;
  nearestMetros: string[];
  extraComments?: string;
};

export type Link = {
  label: string;
  href: string;
};

export type AuthIntentId =
  | 'fresh'
  | 'exploreCommunity'
  | 'joinCommunity'
  | 'seeEventAttendees'
  | 'seeEventReviews'
  | 'attendEvent';

export type AuthIntent = {
  intent: AuthIntentId;
  intentLabel?: string;
  actionLabel?: string;
  targetAction?: () => void;
};