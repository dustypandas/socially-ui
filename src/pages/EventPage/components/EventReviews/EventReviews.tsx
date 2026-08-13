import type { EventReview } from '@src/common-libs/types';
import { ReviewItem } from '@src/components';
import { SectionTitle } from '@src/components/SectionTitle/SectionTitle';
import './event-reviews.css';

type EventReviewsProps = {
  reviews: EventReview[];
};

export function EventReviews({ reviews }: EventReviewsProps) {
  return (
    <section className="event-reviews">
      <SectionTitle title="Reviews" />
      {reviews.length === 0 ? (
        <div className="event-reviews__empty">No reviews yet</div>
      ) : (
        <ul className="event-reviews__list">
          {reviews.map((review, index) => (
            <li
              key={`${review.member.id}-${review.event.id}-${index}`}
              className="event-reviews__item"
            >
              <ReviewItem review={review} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
