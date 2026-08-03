import { communities, members, toMemberAvatar } from '../dummyData.ts';
import type { CommunityBasic, HomeEventIdsMap, HomeProfileMember, HomeSectionId } from '@src/common-libs/types';

export const tempResolvedHomeSections: HomeSectionId[] = [];

export const homeMyInterestsEventIdsMap: HomeEventIdsMap = {
  'lightning-talks': true,
  'open-mic-storytelling': true,
  'urban-sketching': true,
  'open-air-lindy-hop-class': true,
  'wine-tasting-event': true,
};

export const homeAttendingEventIdsMap: HomeEventIdsMap = {
  'lightning-talks': true,
  'open-mic-storytelling': true,
};

export const homeDiscoverEventIdsMap: HomeEventIdsMap = {
  'psychedelic-sharing-circle': true,
  'urban-sketching': true,
  'open-air-lindy-hop-class': true,
  'wine-tasting-event': true,
};

export const homeFreshCommunities: CommunityBasic[] = [
  'community-new-1',
  'community-new-2',
].map(
  id => communities.find(community => community.id === id)!,
);

export const homeNewMembers: HomeProfileMember[] = [
  {
    ...toMemberAvatar(members[1]),
    communityName: communities[1].name,
    basicDetails: [
      { question: 'In Madrid since', response: '1 Year' },
      { question: 'previously lived in', response: 'UK' },
    ],
    otherDetails: [
      { question: "what's your 5 minute topic?", response: 'Rock climbing' },
    ],
  },
  {
    ...toMemberAvatar(members[5]),
    communityName: communities[0].name,
    basicDetails: [
      { question: 'In Madrid since', response: '1 Year' },
      { question: 'previously lived in', response: 'China' },
    ],
    otherDetails: [
      { question: "what's your 5 minute topic?", response: 'Boardgames' },
    ],
  },
  {
    ...toMemberAvatar(members[14]),
    communityName: communities[3].name,
    basicDetails: [
      { question: 'In Madrid since', response: '6 Months' },
      { question: 'previously lived in', response: 'Germany' },
    ],
    otherDetails: [
      { question: "what's your 5 minute topic?", response: 'Salsa dancing' },
    ],
  },
];
