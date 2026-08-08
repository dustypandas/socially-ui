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
  address: string[];
  postcode: string;
  nearestMetros: string[];
  extraComments?: string;
};

export type Link = {
  label: string;
  href: string;
};
