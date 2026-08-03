import type { CommunityAvatar } from './community.ts';
import type { InterestBasic } from './interest.ts';
import type { MapLocation } from './primitives.ts';

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
  prevCountries: string[];
  livingNear: string;
  // createdAt: string;
  // updatedAt: string;
};

export type MemberAbout = Record<string, string>;

export type Engagement = {
  attendedCount: number;
  hostedCount: number;
  joinedSince: Date;
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

export type HomeProfileMemberDetail = {
  question: string;
  response: string;
};

export type HomeProfileMember = {
  id: string;
  label: string;
  image: string;
  href: string;
  communityName: string;
  basicDetails: HomeProfileMemberDetail[];
  otherDetails: HomeProfileMemberDetail[];
};
