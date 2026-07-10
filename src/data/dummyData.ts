import type { CommunityBasic, CommunityOnePageData, EventBasic, Interest, Link, MemberAvatar } from './types.ts';
// DiscussionPost

export const MEMBER_AVATAR_URLS = [
  './assets/member-peter.webp',
  './assets/member-maria.jpg',
  './assets/member-achi.avif',
  './assets/member-olivia.jpg',
  './assets/member-caro.jpg',
  './assets/member-dom.jpg',
  './assets/member-chloe.jpg',
  './assets/member-lucy.jpg',
  './assets/member-sam.jpg',
];

export const members = [
  { id: 'organiser-peter', name: 'Peter C', lat: 40.4168, lng: -3.7038 },
  { id: 'organiser-maria', name: 'Maria M', lat: 40.4236, lng: -3.6947 },
  { id: 'organiser-achi', name: 'Achi J', lat: 40.4095, lng: -3.6924 },
  { id: 'member-4', name: 'Marco Silva', lat: 40.4289, lng: -3.7177 },
  { id: 'member-5', name: 'Elena Torres', lat: 40.4050, lng: -3.7126 },
  { id: 'member-6', name: 'David Kim', lat: 40.4378, lng: -3.6795 },
  { id: 'member-7', name: 'Sofia Mendez', lat: 40.3925, lng: -3.6974 },
  { id: 'member-8', name: 'James Wright', lat: 40.4193, lng: -3.6889 },
  { id: 'member-9', name: 'Isabel Moreno', lat: 40.4312, lng: -3.7031 },
  { id: 'member-10', name: 'Tomás Navarro', lat: 40.4147, lng: -3.7264 },
  { id: 'member-11', name: 'Priya Patel', lat: 40.4012, lng: -3.6758 },
  { id: 'member-12', name: 'Hugo Blanco', lat: 40.4255, lng: -3.6882 },
  { id: 'member-13', name: 'Marta Ortega', lat: 40.4340, lng: -3.7105 },
  { id: 'member-14', name: 'Luis Herrera', lat: 40.4088, lng: -3.7150 },
  { id: 'member-15', name: 'Clara Vidal', lat: 40.4210, lng: -3.7012 },
  { id: 'member-16', name: 'Pablo Serrano', lat: 40.3980, lng: -3.7080 },
  { id: 'member-17', name: 'Nuria Castillo', lat: 40.4305, lng: -3.6820 },
  { id: 'member-18', name: 'Javier Romero', lat: 40.4120, lng: -3.6785 },
  { id: 'member-19', name: 'Beatriz León', lat: 40.4260, lng: -3.7240 },
  { id: 'member-20', name: 'Raúl Iglesias', lat: 40.4035, lng: -3.6900 },
  { id: 'member-21', name: 'Carmen Díaz', lat: 40.4185, lng: -3.7310 },
  { id: 'member-22', name: 'Diego Molina', lat: 40.3057, lng: -3.7327 },
  { id: 'member-23', name: 'Laura Santos', lat: 40.3272, lng: -3.7635 },
  { id: 'member-24', name: 'Álvaro Peña', lat: 40.3223, lng: -3.8650 },
  { id: 'member-25', name: 'Paula Ríos', lat: 40.2842, lng: -3.7941 },
  { id: 'member-26', name: 'Sergio Campos', lat: 40.4818, lng: -3.3639 },
  { id: 'member-27', name: 'Irene Guerrero', lat: 40.4560, lng: -3.6880 },
  { id: 'member-28', name: 'Miguel Arias', lat: 40.4470, lng: -3.6950 },
  { id: 'member-29', name: 'Rocío Luna', lat: 40.4400, lng: -3.7200 },
  { id: 'member-30', name: 'Fernando Cruz', lat: 40.4350, lng: -3.7350 },
  { id: 'member-31', name: 'Silvia Paredes', lat: 40.3900, lng: -3.7200 },
  { id: 'member-32', name: 'Andrés Vega', lat: 40.3850, lng: -3.7400 },
  { id: 'member-33', name: 'Eva Delgado', lat: 40.3780, lng: -3.7100 },
  { id: 'member-34', name: 'Rubén Fuentes', lat: 40.3700, lng: -3.6800 },
  { id: 'member-35', name: 'Teresa Gil', lat: 40.3650, lng: -3.6500 },
  { id: 'member-36', name: 'Iván Marín', lat: 40.4500, lng: -3.6700 },
  { id: 'member-37', name: 'Alba Nieto', lat: 40.4600, lng: -3.6500 },
  { id: 'member-38', name: 'Óscar Reyes', lat: 40.4700, lng: -3.6300 },
  { id: 'member-39', name: 'Cristina Soler', lat: 40.4100, lng: -3.6500 },
  { id: 'member-40', name: 'Víctor Aguilera', lat: 40.4000, lng: -3.6300 },
].map((member, index) => ({
  ...member,
  avatar: MEMBER_AVATAR_URLS[index % MEMBER_AVATAR_URLS.length],
}));

function getMemberAvatar(member: (typeof members)[number]): MemberAvatar {
  return {
    id: member.id,
    label: member.name,
    image: member.avatar,
    href: '#',
  };
}

export const ORGANIZERS: Record<'achi' | 'peter' | 'maria', MemberAvatar> = {
  'achi': getMemberAvatar(members[2]),
  'peter': getMemberAvatar(members[0]),
  'maria': getMemberAvatar(members[1]),
};

function getDynamicAttendees(attendeesCount: number) {
  const attendeeAvatarsCount = Math.min(5, Math.max(1, Math.ceil(Math.cbrt(1.5 * attendeesCount))));

  return {
    count: attendeesCount,
    avatars: members.slice(0, attendeeAvatarsCount)
      .map(getMemberAvatar),
  };
}

export const communities: CommunityBasic[] = [
  {
    id: 'freshers-of-madrid',
    name: 'Freshers of Madrid',
    image: './assets/community-freshers.avif',
    href: '#/community-one-ui',
    membersCount: 360,
    rating: 4.8,
    ratingCount: 106,
    description: 'A community for recent arrivers and international residents exploring and building new lives in Madrid. Connect with students, expats and nomads on a similar journey.',
    interests: ['expats', 'international', 'networking', 'social'],
  },
  {
    id: 'polylogue-madrid',
    name: 'Polylogue Madrid: share • learn • inspire',
    image: './assets/community-polylogue.avif',
    href: '#/community-one-ui',
    membersCount: 841,
    rating: 4.7,
    ratingCount: 188,
    description: 'Meet people who share diverse interests, eclectic curiosities, and uncommon perspectives. Fortnightly Lightning Talks with short presentations and open questions.',
    interests: ['talks', 'learning', 'ideas', 'curiosity'],
  },
  {
    id: 'conscious-collective',
    name: 'The Conscious Collective',
    image: './assets/community-conscious.avif',
    href: '#/community-one-ui',
    membersCount: 258,
    rating: 4.9,
    ratingCount: 34,
    description: 'An international community for explorers of counter-culture, growth, philosophies, altered states of consciousness and spirituality in Madrid.',
    interests: ['spirituality', 'wellness', 'philosophy', 'counter-culture'],
  },
  {
    id: 'happy-feet',
    name: 'Happy Feet',
    image: './assets/community-dance.avif',
    href: '#/community-one-ui',
    membersCount: 7,
    rating: 0,
    ratingCount: 0,
    description: 'An international community for lovers of partner dancing in Madrid — Salsa, Bachata, Tango and Swing.',
    interests: ['dance', 'salsa', 'bachata', 'tango', 'swing'],
  },
  {
    id: 'literature-philosophy',
    name: 'Literature and Philosophy Reading Group',
    image: './assets/community-philosophy.webp',
    href: '#/community-one-ui',
    membersCount: 334,
    rating: 4.8,
    ratingCount: 17,
    description: 'For people interested in reading and discussing themes in philosophy and literature through close readings of classics in both subjects.',
    interests: ['literature', 'philosophy', 'reading', 'discussion'],
  },
  {
    id: 'madrid-sketch-squad',
    name: 'The Madrid Sketch Squad',
    image: './assets/community-sketch.avif',
    href: '#/community-one-ui',
    membersCount: 1456,
    rating: 4.8,
    ratingCount: 367,
    description: 'A bilingual drawing group based in Madrid. Discover the city and explore pencils, watercolor, architecture and landscapes — no experience required.',
    interests: ['art', 'drawing', 'sketching', 'creative'],
  },
];

// for one specific event (lightning talks) only
export const communityForOneEvent: CommunityBasic = communities[1];

export const attendeesForOneEvent: {
  count: number;
  avatars: MemberAvatar[];
} = getDynamicAttendees(47);

export const events: EventBasic[] = [
  {
    id: 'lightning-talks',
    title: 'Lighting Talks @ Maria Pandora',
    image: '../../assets/event-lightning.avif',
    href: '#/event-one-ui',
    startTime: getDynamicEventStartTime(2, 13, 30),
    location: { label: 'Madrid Palacio' },
    attendees: getDynamicAttendees(47),
    rating: 4.7,
    ratingCount: 95,
    openTo: 'public',
    // eventInterests: ['AI'],
  },
  {
    id: 'open-mic-storytelling',
    title: 'Open Mic Storytelling @ Tropicana - "TRAVEL 🏞"',
    image: '../../assets/event-story.avif',
    href: '#/event-one-ui',
    startTime: getDynamicEventStartTime(3, 19, 0),
    location: { label: 'Tropicana' },
    attendees: getDynamicAttendees(17),
    rating: 4.8,
    ratingCount: 106,
    openTo: 'selective',
  },
  {
    id: 'psychedelic-sharing-circle',
    title: 'Psychedelic sharing circle',
    image: '../../assets/event-circle.avif',
    href: '#/event-one-ui',
    startTime: getDynamicEventStartTime(5, 17, 0),
    location: { label: 'Centro' },
    attendees: getDynamicAttendees(9),
    rating: 4.9,
    ratingCount: 34,
    openTo: 'invite-only',
    // eventInterests: ['Psychedelics'],
  },
  {
    id: 'urban-sketching',
    title: 'Urban sketching: CentroCentro',
    image: '../../assets/event-sketch.avif',
    href: '#/event-one-ui',
    startTime: getDynamicEventStartTime(6, 19, 30),
    location: { label: 'CentroCentro' },
    attendees: getDynamicAttendees(14),
    rating: 4.8,
    ratingCount: 367,
    openTo: 'public',
    // eventInterests: ['Painting'],
  },
  {
    id: 'open-air-lindy-hop-class',
    title: 'Open Air Lindy Hop Class',
    image: '../../assets/event-swing.avif',
    href: '#/event-one-ui',
    startTime: getDynamicEventStartTime(9, 13, 0),
    location: { label: 'Parque del Retiro' },
    attendees: getDynamicAttendees(39),
    rating: 4.9,
    ratingCount: 106,
    openTo: 'selective',
    // eventInterests: ['Tango'],
  },
  {
    id: 'wine-tasting-event',
    title: 'Wine Tasting @ Monkeys Bar',
    image: '../../assets/event-wine.jpg',
    href: '#/event-one-ui',
    startTime: getDynamicEventStartTime(11, 18, 0),
    location: { label: 'Wine Bar' },
    attendees: getDynamicAttendees(15),
    rating: 4.7,
    ratingCount: 56,
    openTo: 'invite-only',
    // eventInterests: ['Cooking'],
  }
];

export const MAX_FOLLOWED_INTERESTS = 10; // can change later

export const interests: Interest[] = [
  {
    label: 'cycling',
    category: 'Sport',
    followerIds: [
      'member-1', 'member-2', 'member-3', 'member-4', 'member-5',
      'member-6', 'member-7', 'member-8', 'member-9', 'member-10',
      'member-11', 'member-12', 'member-13', 'member-14', 'member-15',
    ],
    // externalLinks: [
    //   {
    //     label: 'Madrid Cycling Club',
    //     href: 'https://www.meetup.com/example-madrid-cycling-club',
    //   },
    //   {
    //     label: 'Strava Madrid Riders',
    //     href: 'https://www.strava.com/clubs/example-madrid-riders',
    //   },
    // ],
  },
  {
    label: 'hiking',
    category: 'Sport',
    followerIds: [
      'member-2', 'member-5', 'member-8', 'member-11', 'member-14',
      'member-16', 'member-17', 'member-18', 'member-19', 'member-20',
    ],
    // externalLinks: [
    //   {
    //     label: 'Madrid Hikers Meetup',
    //     href: 'https://www.meetup.com/example-madrid-hikers',
    //   },
    // ],
  },
  {
    label: 'tennis',
    category: 'Sport',
    followerIds: [
      'member-1', 'member-2', 'member-3', 'member-4', 'member-5',
      'member-6', 'member-7', 'member-8', 'member-9', 'member-10',
      'member-11', 'member-12', 'member-13', 'member-14', 'member-15',
      'member-16', 'member-17', 'member-18', 'member-19', 'member-20',
      'member-21', 'member-22', 'member-23', 'member-24', 'member-25',
      'member-26', 'member-27', 'member-28', 'member-29', 'member-30',
      'member-31',
    ],
    // externalLinks: [
    //   {
    //     label: 'Local Tennis Ladder group',
    //     href: 'https://chat.whatsapp.com/example-tennis-ladder',
    //   },
    // ],
  },
  {
    label: 'unicycling',
    category: 'Sport',
    followerIds: [
      'member-10', 'member-11', 'member-12', 'member-13', 'member-14',
      'member-15', 'member-16', 'member-17', 'member-18', 'member-19',
      'member-20', 'member-21', 'member-22', 'member-23', 'member-24',
    ],
    // externalLinks: [
    //   {
    //     label: 'Unicycle Madrid community',
    //     href: 'https://www.meetup.com/example-unicycle-madrid',
    //   },
    // ],
  },
  {
    label: 'painting',
    category: 'Creative',
    followerIds: [
      'member-3', 'member-6', 'member-9', 'member-12', 'member-15',
      'member-18', 'member-21', 'member-24', 'member-25', 'member-27',
      'member-30', 'member-33',
    ],
    // externalLinks: [
    //   {
    //     label: 'Madrid Art Studio group',
    //     href: 'https://www.meetup.com/example-madrid-art-studio',
    //   },
    // ],
  },
  {
    label: 'tango',
    category: 'Creative',
    followerIds: [
      'member-4', 'member-8', 'member-12', 'member-16', 'member-20',
      'member-24', 'member-28', 'member-32',
    ],
    // externalLinks: [
    //   {
    //     label: 'Tango Milonga Madrid',
    //     href: 'https://www.meetup.com/example-tango-milonga-madrid',
    //   },
    // ],
  },
  {
    label: 'self-development',
    category: 'Self Care',
    followerIds: ['member-5', 'member-10', 'member-15'],
    // externalLinks: [
    //   {
    //     label: 'Personal Growth Book Club',
    //     href: 'https://chat.whatsapp.com/example-personal-growth-book-club',
    //   },
    // ],
  },
  {
    label: 'yoga',
    category: 'Self Care',
    followerIds: [
      'member-1', 'member-2', 'member-3', 'member-4', 'member-5',
      'member-6', 'member-7', 'member-8', 'member-9', 'member-10',
      'member-11', 'member-12', 'member-13', 'member-14', 'member-15',
      'member-16', 'member-17', 'member-18', 'member-19', 'member-20',
      'member-21',
    ],
    // externalLinks: [
    //   {
    //     label: 'Madrid Yoga Circle',
    //     href: 'https://www.meetup.com/example-madrid-yoga-circle',
    //   },
    // ],
  },
  {
    label: 'dinosaurs',
    category: 'General',
    followerIds: ['member-22', 'member-23', 'member-24', 'member-25', 'member-26'],
    // externalLinks: [
    //   {
    //     label: 'Paleontology Enthusiasts forum',
    //     href: 'https://www.example.com/paleontology-enthusiasts',
    //   },
    // ],
  },
  {
    label: 'chess',
    category: 'General',
    followerIds: [
      'member-6', 'member-7', 'member-8', 'member-9', 'member-10',
      'member-11', 'member-12', 'member-13', 'member-14', 'member-15',
      'member-16', 'member-17', 'member-18', 'member-19', 'member-20',
    ],
    // externalLinks: [
    //   {
    //     label: 'Madrid Chess Club',
    //     href: 'https://www.meetup.com/example-madrid-chess-club',
    //   },
    // ],
  },
  {
    label: 'boardgames',
    category: 'General',
    followerIds: [
      'member-1', 'member-2', 'member-3', 'member-4', 'member-5',
      'member-6', 'member-7', 'member-8', 'member-9', 'member-10',
      'member-11', 'member-12', 'member-13', 'member-14', 'member-15',
      'member-16', 'member-17', 'member-18', 'member-19', 'member-20',
      'member-21', 'member-22', 'member-23', 'member-24', 'member-25',
      'member-26', 'member-27', 'member-28', 'member-29', 'member-30',
    ],
    // externalLinks: [
    //   {
    //     label: 'Board Game Night Madrid',
    //     href: 'https://www.meetup.com/example-board-game-night-madrid',
    //   },
    // ],
  },
  {
    label: 'ai',
    category: 'General',
    followerIds: [
      'member-11', 'member-12', 'member-13', 'member-14', 'member-15',
      'member-16', 'member-17', 'member-18', 'member-19', 'member-20',
      'member-21', 'member-22', 'member-23', 'member-24', 'member-25',
      'member-26', 'member-27', 'member-28', 'member-29', 'member-30',
      'member-31', 'member-32', 'member-33', 'member-34', 'member-35',
    ],
    // externalLinks: [
    //   {
    //     label: 'AI Builders Madrid',
    //     href: 'https://www.meetup.com/example-ai-builders-madrid',
    //   },
    // ],
  },
  {
    label: 'cooking',
    category: 'General',
    followerIds: ['member-36', 'member-37', 'member-38'],
    // externalLinks: [
    //   {
    //     label: 'Home Cooks Madrid',
    //     href: 'https://chat.whatsapp.com/example-home-cooks-madrid',
    //   },
    // ],
  },
  {
    label: 'psychedelics',
    category: 'General',
    followerIds: [
      'member-33', 'member-34', 'member-35', 'member-36',
      'member-37', 'member-38', 'member-39', 'member-40',
    ],
    // externalLinks: [
    //   {
    //     label: 'Integration Circle',
    //     href: 'https://www.example.com/integration-circle',
    //   },
    // ],
  },
  {
    label: 'spanish',
    category: 'languages',
    followerIds: [
      'member-1', 'member-2', 'member-3', 'member-4', 'member-5',
      'member-6', 'member-7', 'member-8', 'member-9', 'member-10',
      'member-11', 'member-12', 'member-13', 'member-14', 'member-15',
      'member-16', 'member-17', 'member-18',
    ],
  },
  {
    label: 'german',
    category: 'languages',
    followerIds: [
      'member-19', 'member-20', 'member-21', 'member-22', 'member-23',
      'member-24', 'member-25', 'member-26', 'member-27', 'member-28',
      'member-29', 'member-30',
    ],
    // externalLinks: [
    //   {
    //     label: 'German Conversation Café',
    //     href: 'https://www.meetup.com/example-german-conversation-cafe',
    //   },
    // ],
  },
  {
    label: 'mandarin',
    category: 'languages',
    followerIds: [
      'member-5', 'member-10', 'member-15', 'member-20', 'member-25',
      'member-30', 'member-31', 'member-32', 'member-33', 'member-34',
      'member-35', 'member-36', 'member-37', 'member-38',
    ],
    // externalLinks: [
    //   {
    //     label: 'Mandarin Exchange Madrid',
    //     href: 'https://www.meetup.com/example-mandarin-exchange-madrid',
    //   },
    // ],
  },
  {
    label: 'french',
    category: 'languages',
    followerIds: [
      'member-2', 'member-3', 'member-6', 'member-7', 'member-11',
      'member-12', 'member-16', 'member-17', 'member-21', 'member-22',
      'member-26', 'member-27', 'member-32', 'member-33', 'member-37',
      'member-40',
    ],
    // externalLinks: [
    //   {
    //     label: 'French Table Talk group',
    //     href: 'https://chat.whatsapp.com/example-french-table-talk',
    //   },
    // ],
  },
];

// for one specific interest (spanish) only
export const eventsForOneInterest: EventBasic[] = [
  {
    id: 'spanish-conversations-cafe-comercial',
    title: 'Spanish Conversations @ Café Comercial',
    image: '../../assets/event-lightning.avif',
    href: '#/event-one-ui',
    startTime: getDynamicEventStartTime(2, 19, 0),
    location: { label: 'Café Comercial' },
    attendees: getDynamicAttendees(22),
    rating: 4.8,
    ratingCount: 41,
    openTo: 'public',
  },
  {
    id: 'museum-visit-prado',
    title: 'Museum Visit @ Prado',
    image: '../../assets/event-sketch.avif',
    href: '#/event-one-ui',
    startTime: getDynamicEventStartTime(13, 11, 0),
    location: { label: 'Museo del Prado' },
    attendees: getDynamicAttendees(11),
    rating: 4.9,
    ratingCount: 28,
    openTo: 'public',
  },
  {
    id: 'tapas-spanish-practice-malasana',
    title: 'Tapas & Spanish Practice @ Malasaña',
    image: '../../assets/event-wine.jpg',
    href: '#/event-one-ui',
    startTime: getDynamicEventStartTime(22, 20, 0),
    location: { label: 'Malasaña' },
    attendees: getDynamicAttendees(16),
    rating: 4.7,
    ratingCount: 63,
    openTo: 'public',
  },
];

export const communitiesForOneInterest: CommunityBasic[] = [
  {
    id: 'madrid-language-exchange',
    name: 'Madrid Language Exchange',
    image: '../../assets/event-lightning.avif',
    href: '#/community-one-ui',
    membersCount: 412,
    rating: 4.8,
    ratingCount: 96,
    description: 'A community for language exchange and practicing Spanish with locals in Madrid.',
    interests: ['language-exchange', 'spanish', 'spanish-practice'],
  },
  {
    id: 'cultura-madrid',
    name: 'Cultura Madrid',
    image: '../../assets/event-sketch.avif',
    href: '#/community-one-ui',
    membersCount: 287,
    rating: 4.9,
    ratingCount: 54,
    description: 'A community for language exchange and practicing Spanish with locals in Madrid.',
    interests: ['spanish', 'spanish-practice'],
  },
  {
    id: 'tapas-and-talk',
    name: 'Tapas & Talk',
    image: '../../assets/event-wine.jpg',
    href: '#/community-one-ui',
    membersCount: 193,
    rating: 4.7,
    ratingCount: 71,
    description: 'A community for language exchange and practicing Spanish with locals in Madrid.',
    interests: ['spanish', 'spanish-practice', 'food'],
  },
];

export const externalLinksForOneInterest: Link[] = [
  {
    label: 'Spanish Coffee whatsapp group',
    href: 'https://chat.whatsapp.com/example-spanish-coffee',
  },
  {
    label: 'Real Language Exchanges group',
    href: 'https://www.meetup.com/example-language-exchanges',
  },
];

export const myFollowedInterests: string[] = [];

export const myCommunityIds: string[] = [];

function getDynamicEventStartTime(daysFromNow: number, hours: number, minutes: number): number {
  const date = addDays(new Date(), daysFromNow);
  date.setHours(hours, minutes, 0, 0);
  return date.getTime();

  function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}

export const sampleFullCommunity: CommunityOnePageData = {
  id: 'polylogue-madrid',
  name: 'Polylogue Madrid: share • learn • inspire',
  image: './assets/community-polylogue.avif',
  href: '#/community-one-ui',
  membersCount: 841,
  rating: 4.7,
  ratingCount: 188,
  futureEventsCount: 5,
  pastEventsCount: 25,
  descriptionHtml: `
    <p>
      Polylogue is a community for meeting people who share diverse interests, eclectic curiosities, wayward stories and uncommon perspectives. 🎓📚💫
    </p>
    <p>
      Come join us for fortnightly "Lightning Talks" - where a number of speakers give 5 minute presentations about any topic of their choosing, followed by 5 minutes of open questions.
    </p>
  `,
  organizers: [ORGANIZERS.achi, ORGANIZERS.peter, ORGANIZERS.maria],
  memberProfiles: members.slice(0, MEMBER_AVATAR_URLS.length)
    .map(getMemberAvatar),
  interests: ['public-speaking', 'technology', 'fresh'],
  futureEvents: [
    {
      id: 'polylogue-lightning-feb-4',
      title: 'Lightning Talks @ Maria Pandora',
      image: '../../assets/event-lightning.avif',
      href: '#/event-one-ui',
      startTime: getDynamicEventStartTime(3, 19, 10),
      location: { label: 'Palacio' },
      attendees: getDynamicAttendees(47),
      rating: 4.7,
      ratingCount: 95,
      openTo: 'public',
    },
    {
      id: 'polylogue-lightning-feb-18',
      title: 'Lightning Talks @ Maria Pandora',
      image: '../../assets/event-lightning.avif',
      href: '#/event-one-ui',
      startTime: getDynamicEventStartTime(7, 19, 10),
      location: { label: 'Palacio' },
      attendees: getDynamicAttendees(39),
      rating: 4.7,
      ratingCount: 95,
      openTo: 'public',
    },
    {
      id: 'polylogue-lightning-mar-4',
      title: 'Lightning Talks @ Maria Pandora',
      image: '../../assets/event-lightning.avif',
      href: '#/event-one-ui',
      startTime: getDynamicEventStartTime(12, 19, 10),
      location: { label: 'Palacio' },
      attendees: getDynamicAttendees(44),
      rating: 4.7,
      ratingCount: 95,
      openTo: 'public',
    },
  ],
  pastEvents: [
    {
      id: 'polylogue-lightning-jan-7',
      title: 'Lightning Talks @ Maria Pandora',
      image: '../../assets/event-lightning.avif',
      href: '#/event-one-ui',
      startTime: getDynamicEventStartTime(-3, 19, 10),
      location: { label: 'Palacio' },
      attendees: getDynamicAttendees(52),
      rating: 4.7,
      ratingCount: 95,
      openTo: 'public',
    },
    {
      id: 'polylogue-lightning-jan-21',
      title: 'Lightning Talks @ Maria Pandora',
      image: '../../assets/event-lightning.avif',
      href: '#/event-one-ui',
      startTime: getDynamicEventStartTime(-6, 19, 10),
      location: { label: 'Palacio' },
      attendees: getDynamicAttendees(48),
      rating: 4.7,
      ratingCount: 95,
      openTo: 'public',
    },
    {
      id: 'polylogue-lightning-dec-17',
      title: 'Lightning Talks @ Maria Pandora',
      image: '../../assets/event-lightning.avif',
      href: '#/event-one-ui',
      startTime: getDynamicEventStartTime(-7, 19, 10),
      location: { label: 'Palacio' },
      attendees: getDynamicAttendees(55),
      rating: 4.7,
      ratingCount: 95,
      openTo: 'public',
    },
    {
      id: 'polylogue-lightning-dec-3',
      title: 'Lightning Talks @ Maria Pandora',
      image: '../../assets/event-lightning.avif',
      href: '#/event-one-ui',
      startTime: getDynamicEventStartTime(-14, 19, 10),
      location: { label: 'Palacio' },
      attendees: getDynamicAttendees(41),
      rating: 4.7,
      ratingCount: 95,
      openTo: 'public',
    },
    {
      id: 'polylogue-lightning-nov-19',
      title: 'Lightning Talks @ Maria Pandora',
      image: '../../assets/event-lightning.avif',
      href: '#/event-one-ui',
      startTime: getDynamicEventStartTime(-19, 19, 10),
      location: { label: 'Palacio' },
      attendees: getDynamicAttendees(46),
      rating: 4.7,
      ratingCount: 95,
      openTo: 'public',
    },
    {
      id: 'polylogue-lightning-nov-5',
      title: 'Lightning Talks @ Maria Pandora',
      image: '../../assets/event-lightning.avif',
      href: '#/event-one-ui',
      startTime: getDynamicEventStartTime(-21, 19, 10),
      location: { label: 'Palacio' },
      attendees: getDynamicAttendees(43),
      rating: 4.7,
      ratingCount: 95,
      openTo: 'public',
    },
  ],
};

export const sampleCurrentUser = members[7];
