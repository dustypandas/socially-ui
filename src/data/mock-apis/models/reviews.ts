import { EventReview } from '@src/data/types';
import { reviewsForOneEvent } from '@src/data/dummyData';

export async function getReviewsForOneEvent(): Promise<EventReview[]> {
    return reviewsForOneEvent;
  }