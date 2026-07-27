import type { CommunityBasic, EventBasic } from '@src/data';

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

function getTimestampFromNow(daysFromNow: number, hour = 19, minute = 0): number {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hour, minute, 0, 0);
  return date.getTime();
}

export const newEvents: EventBasic[] = [
  {
    id: 'new-event-1',
    title: 'Sunset Picnic in Retiro',
    image: './assets/dummy-data/event-lightning.avif',
    href: '#/one-event-ui',
    startTime: getTimestampFromNow(4, 18, 30),
    location: { label: 'Retiro Park' },
    attendees: { count: 18, avatars: [] },
    rating: 4.9,
    ratingCount: 6,
    openTo: 'public',
  },
  {
    id: 'new-event-2',
    title: 'Spanish Conversation Hour',
    image: './assets/dummy-data/event-lightning.avif',
    href: '#/one-event-ui',
    startTime: getTimestampFromNow(6, 19, 0),
    location: { label: 'Malasaña' },
    attendees: { count: 24, avatars: [] },
    rating: 4.7,
    ratingCount: 11,
    openTo: 'public',
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
