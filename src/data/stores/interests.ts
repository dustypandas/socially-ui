import {
  externalLinksForOneInterest,
  interests,
  myFollowedInterests,
} from './dummyData.ts';
import type { Interest, Link } from '@src/common-libs/types';

export const tempFollowedInterests: string[] = [...myFollowedInterests];
export const tempInterests: Interest[] = [...interests];
export const tempInterestExternalLinks: Link[] = [...externalLinksForOneInterest];
