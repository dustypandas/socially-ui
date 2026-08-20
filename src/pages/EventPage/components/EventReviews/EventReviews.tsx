import type { EventReview } from '@src/common-libs/types';
import { ReviewItem } from '@src/components';
import { SectionTitle } from '@src/components/SectionTitle/SectionTitle';
import { getReviewsSectionTitle } from '@src/helpers/labelHelpers';
import './event-reviews.css';

const MAX_DISPLAYED_REVIEWS = 3;

type EventReviewsProps = {
  reviews: EventReview[];
  onMoreClick?: () => void;
};

export function EventReviews({ reviews, onMoreClick }: EventReviewsProps) {
  const displayedReviews = reviews.slice(0, MAX_DISPLAYED_REVIEWS);

  return (
    <section className="event-reviews">
      <SectionTitle
        title={getReviewsSectionTitle(reviews.length)}
        hideMore={reviews.length <= MAX_DISPLAYED_REVIEWS}
        moreLabel="more reviews →"
        onMoreClick={(event) => {
          event.preventDefault();
          onMoreClick?.();
        }}
      />
      {reviews.length === 0 ? (
        <div className="event-reviews__empty">No reviews yet</div>
      ) : (
        <ul className="event-reviews__list">
          {displayedReviews.map((review, index) => (
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
