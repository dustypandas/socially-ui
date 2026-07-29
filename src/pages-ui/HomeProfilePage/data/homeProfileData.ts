import type { CommunityBasic } from '@src/data';

export type HomeProfileMember = {
  id: string;
  label: string;
  image: string;
  href: string;
};

export const newMembers: HomeProfileMember[] = [
  {
    id: 'member-new-1',
    label: 'Sofia Mendez',
    image: './assets/dummy-data/member-olivia.jpg',
    href: '#/one-member-ui',
  },
  {
    id: 'member-new-2',
    label: 'David Kim',
    image: './assets/dummy-data/member-dom.jpg',
    href: '#/one-member-ui',
  },
  {
    id: 'member-new-3',
    label: 'Clara Vidal',
    image: './assets/dummy-data/member-chloe.jpg',
    href: '#/one-member-ui',
  },
];

export const newCommunities: CommunityBasic[] = [
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
