import type { EventReview } from '@src/common-libs/types';
import { reviewsForOneCommunity, reviewsForOneEvent } from '../stores/dummyData.ts';

export async function getReviewsForOneEvent(): Promise<EventReview[]> {
  return reviewsForOneEvent;
}

export async function getReviewsForOneCommunity(): Promise<EventReview[]> {
  return reviewsForOneCommunity;
}
