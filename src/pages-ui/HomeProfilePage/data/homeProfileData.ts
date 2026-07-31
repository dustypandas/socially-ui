import type { CommunityBasic, Interest } from '@src/data';

export type HomeProfileMemberDetail = {
  question: string;
  response: string;
};

export type HomeProfileMember = {
  id: string;
  label: string;
  image: string;
  href: string;
  community: { name: string; href: string };
  basicDetails: HomeProfileMemberDetail[];
  otherDetails: HomeProfileMemberDetail[];
};

export type HomeProfilePopularInterest = Interest & {
  newFollowersCount?: number;
};

export const newMembers: HomeProfileMember[] = [
  {
    id: 'member-new-1',
    label: 'Maria M',
    image: './assets/dummy-data/member-maria.jpg',
    href: '#/one-member-ui',
    community: {
      name: 'Polylogue Madrid: share • learn • inspire',
      href: '#/one-community-ui',
    },
    basicDetails: [
      { question: 'In Madrid since', response: '1 Year' },
      { question: 'previously lived in', response: 'UK' },
    ],
    otherDetails: [
      { question: "what's your 5 minute topic?", response: 'Rock climbing' },
    ],
  },
  {
    id: 'member-new-2',
    label: 'David K',
    image: './assets/dummy-data/member-dom.jpg',
    href: '#/one-member-ui',
    community: {
      name: 'Freshers of Madrid',
      href: '#/one-community-ui',
    },
    basicDetails: [
      { question: 'In Madrid since', response: '1 Year' },
      { question: 'previously lived in', response: 'China' },
    ],
    otherDetails: [
      { question: "what's your 5 minute topic?", response: 'Boardgames' },
    ],
  },
  {
    id: 'member-new-3',
    label: 'Clara V',
    image: './assets/dummy-data/member-chloe.jpg',
    href: '#/one-member-ui',
    community: {
      name: 'Happy Feet',
      href: '#/one-community-ui',
    },
    basicDetails: [
      { question: 'In Madrid since', response: '6 Months' },
      { question: 'previously lived in', response: 'Germany' },
    ],
    otherDetails: [
      { question: "what's your 5 minute topic?", response: 'Salsa dancing' },
    ],
  },
];

export const popularInterestNewFollowers: Record<string, number> = {
  cycling: 3,
  hiking: 6,
  tennis: 2,
  unicycling: 1,
  painting: 4,
  tango: 2,
  'self-development': 1,
  yoga: 5,
  dinosaurs: 3,
  chess: 2,
  boardgames: 6,
  ai: 4,
  cooking: 1,
  psychedelics: 2,
  spanish: 3,
  german: 2,
  mandarin: 1,
  french: 2,
};

export const freshCommunities: CommunityBasic[] = [
  {
    id: 'community-new-1',
    name: 'Madrid Run Club',
    image: './assets/dummy-data/community-dance.avif',
    href: '#/one-community-ui',
    description: 'Weekly runs around the city',
    membersCount: 42,
    rating: 4.8,
    ratingCount: 12,
    interests: ['running', 'fitness'],
  },
  {
    id: 'community-new-2',
    name: 'Board Game Nights',
    image: './assets/dummy-data/community-sketch.avif',
    href: '#/one-community-ui',
    description: 'Casual board game meetups',
    membersCount: 28,
    rating: 4.6,
    ratingCount: 8,
    interests: ['games', 'social'],
  },
];

export const profileData = {
  firstName: 'James',
  lastName: 'Wright',
  avatar: './assets/dummy-data/member-sam.jpg',
  livingNear: 'Tribunal',
  madridSince: '2020',
  previousHome: 'United Kingdom',
  href: '#/one-member-ui',
};
