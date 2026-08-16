import type { EventReview } from '@src/common-libs/types';
import { ReviewItem } from '@src/components';
import { SectionTitle } from '@src/components/SectionTitle/SectionTitle';
import { getReviewsSectionTitle } from '@src/helpers/labelHelpers';
import './community-section-reviews.css';

const MAX_DISPLAYED_REVIEWS = 3;

type CommunitySectionReviewsProps = {
  reviews: EventReview[];
  shouldUseExactValue?: boolean;
  onMoreReviewsClick?: () => void;
};

export function CommunitySectionReviews({
  reviews,
  shouldUseExactValue,
  onMoreReviewsClick,
}: CommunitySectionReviewsProps) {
  const displayedReviews = reviews.slice(0, MAX_DISPLAYED_REVIEWS);

  return (
    <section className="community-section-reviews">
      <SectionTitle
        title={getReviewsSectionTitle(reviews.length, shouldUseExactValue)}
        hideMore={reviews.length <= MAX_DISPLAYED_REVIEWS}
        moreHref="#reviews"
        moreLabel="more reviews →"
        onMoreClick={(event) => {
          event.preventDefault();
          onMoreReviewsClick?.();
        }}
      />
      <ul className="community-section-reviews__list">
        {displayedReviews.map((review, index) => (
          <li key={`${review.member.id}-${review.event.id}-${index}`}>
            <ReviewItem review={review} showEventName />
          </li>
        ))}
      </ul>
    </section>
  );
}
