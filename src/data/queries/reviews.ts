import type { EventReview } from '@src/common-libs/types';
import { reviewsForOneEvent } from '../stores/dummyData.ts';

export async function getReviewsForOneEvent(): Promise<EventReview[]> {
  return reviewsForOneEvent;
}
