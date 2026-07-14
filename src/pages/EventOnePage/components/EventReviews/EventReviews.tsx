import type { EventReview as EventReviewData } from '@src/data';
import { SectionTitle } from '@src/components/SectionTitle/SectionTitle';
import { EventReview } from './EventReview/EventReview';
import './event-reviews.css';

type EventReviewsProps = {
  reviews: EventReviewData[];
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
              <EventReview review={review} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
