import type { CommunityAvatar } from './community.ts';
import type { MemberAvatar } from './member.ts';
import type { AddressLocation, MapLocation } from './primitives.ts';

// export type EventPageCommunity = {
//   name: string;
//   img: string;
//   details: string;
// };

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
  community: Pick<CommunityAvatar, 'name' | 'href'>;
  description: string;
};

export type Event =
& EventBasic
& {
  hosts: MemberAvatar[];
  addressLocation: AddressLocation;
  descriptionHtml: string;
  interests?: string[];
  reviews?: EventReview[];
};

export type EventAttendees = {
  count: number;
  avatars: MemberAvatar[];
};

export type EventReview = {
  event: EventLink;
  member: MemberAvatar;
  communityId: string;
  rating: number;
  content: string;
  date: Date;
};
