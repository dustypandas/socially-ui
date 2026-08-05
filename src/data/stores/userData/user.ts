import { members } from '../dummyData.ts';
import type { MemberProfile, MemberQuestionResponse } from '@src/common-libs/types';

type SessionUser = MemberProfile & {
  email: string;
  password: string;
};

export const sessionState = {
  isLoggedIn: false,
};

const member = members[7];
export const sessionUser: SessionUser = {
  id: member.id,
  label: member.name.split(' ')[0]!,
  image: './assets/dummy-data/member-sam.jpg',
  href: '#/one-member-ui',
  lat: member.lat,
  lng: member.lng,
  firstName: 'James',
  lastName: 'Wright',
  city: 'Madrid, Spain',
  inCurrCitySince: new Date('2020-01'),
  prevCountries: ['United Kingdom'],
  livingNear: 'Tribunal',
  email: 'test@test.com',
  password: 'test',
};

export const sessionUserQuestionResponses: MemberQuestionResponse[] = [
  {
    id: 'in-madrid-since',
    question: 'For how long have you been in Madrid?',
    response: '2 Years',
  },
];

export type { SessionUser };
