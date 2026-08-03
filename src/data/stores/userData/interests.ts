import {
  externalLinksForOneInterest,
  interests,
} from '../dummyData.ts';
import type { Interest, Link } from '@src/common-libs/types';

export const tempMaxFollowedInterests = 10;
export const tempFollowedInterests: string[] = [];
export const tempInterests: Interest[] = [...interests];
export const tempInterestExternalLinks: Link[] = [...externalLinksForOneInterest];
