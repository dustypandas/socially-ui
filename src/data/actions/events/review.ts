import type { EventReview } from '@src/common-libs/types';
import { events, reviewsForOneEvent } from '../../stores/dummyData.ts';
import { tempEventReviewedMap } from '../../stores/userData/events.ts';
import { sessionUser } from '../../stores/userData/user.ts';

export async function addReview(
  eventId: string,
  communityId: string,
  review: { rating: number; content: string },
): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const event = events.find(item => item.id === eventId);
  if (!event) {
    return;
  }

  const newReview: EventReview = {
    event: {
      id: event.id,
      title: event.title,
      href: event.href,
    },
    member: {
      id: sessionUser.id,
      label: sessionUser.label,
      image: sessionUser.image,
      href: sessionUser.href,
    },
    communityId,
    rating: review.rating,
    content: review.content,
    date: new Date(),
  };

  reviewsForOneEvent.unshift(newReview);
  tempEventReviewedMap[eventId] = true;
}
