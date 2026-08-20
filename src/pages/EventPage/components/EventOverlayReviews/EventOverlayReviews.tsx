import { useEffect, useState } from 'react';
import type { EventReview } from '@src/common-libs/types';
import { Overlay, ReviewItem } from '@src/components';
import { getReviewsSectionTitle } from '@src/helpers/labelHelpers';
import './event-overlay-reviews.css';

const PAGE_SIZE = 10;

type EventOverlayReviewsProps = {
  isOpen: boolean;
  onClose: () => void;
  reviews: EventReview[];
};

export function EventOverlayReviews({
  isOpen,
  onClose,
  reviews,
}: EventOverlayReviewsProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMoreReviews = reviews.length > visibleCount;

  useEffect(() => {
    if (isOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      setVisibleCount(PAGE_SIZE);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  return (
    <Overlay
      isOpen={isOpen}
      onClose={onClose}
      title={getReviewsSectionTitle(reviews.length, true)}
    >
      <div className="event-overlay-reviews__list">
        {visibleReviews.map((review, index) => (
          <div
            key={`${review.member.id}-${review.event.id}-${index}`}
            className="event-overlay-reviews__item"
          >
            <ReviewItem review={review} />
          </div>
        ))}
        {hasMoreReviews && (
          <button
            type="button"
            className="event-overlay-reviews__show-more"
            onClick={() => setVisibleCount(current => current + PAGE_SIZE)}
          >
            Show more
          </button>
        )}
      </div>
    </Overlay>
  );
}
