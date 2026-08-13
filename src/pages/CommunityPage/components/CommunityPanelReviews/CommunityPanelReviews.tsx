import { useState } from 'react';
import type { EventReview } from '@src/common-libs/types';
import { ColumnsLayout, ReviewItem } from '@src/components';
import { SectionTitle } from '@src/components/SectionTitle/SectionTitle';
import {
  CommunityReviewFilters,
  type CommunityReviewFilterId,
} from './CommunityReviewFilters';
import './community-panel-reviews.css';

const PAGE_SIZE = 20;

type CommunityPanelReviewsProps = {
  reviews: EventReview[];
  onScrollToTop?: () => void;
};

export function CommunityPanelReviews({
  reviews,
  onScrollToTop,
}: CommunityPanelReviewsProps) {
  const [reviewFilter, setReviewFilter] = useState<CommunityReviewFilterId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const handleFilterChange = (filter: CommunityReviewFilterId) => {
    setReviewFilter(filter);
    setVisibleCount(PAGE_SIZE);
    onScrollToTop?.();
  };
  const handleQueryChange = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(PAGE_SIZE);
    onScrollToTop?.();
  };

  const visibleReviews = getFilteredReviews(reviews, reviewFilter, searchQuery);
  const hasMoreItems = visibleReviews.length > visibleCount;
  const titleCount = visibleReviews.length;

  return (
    <ColumnsLayout>
      <ColumnsLayout.Main>
        <section className="community-panel-reviews">
          <SectionTitle
            title={`${titleCount} ${titleCount === 1 ? 'review' : 'reviews'}`}
            hideMore
          />
          {visibleReviews.length === 0 ? (
            <div className="community-panel-reviews__empty">
              No reviews
            </div>
          ) : (
            <>
              <ul className="community-panel-reviews__list">
                {visibleReviews.slice(0, visibleCount).map((review, index) => (
                  <li key={`${review.member.id}-${review.event.id}-${index}`}>
                    <ReviewItem review={review} showEventName />
                  </li>
                ))}
              </ul>
              {hasMoreItems && (
                <button
                  type="button"
                  className="community-panel-reviews__show-more btn-clear-grey"
                  onClick={() => setVisibleCount(current => current + PAGE_SIZE)}
                >
                  Show more
                </button>
              )}
            </>
          )}
        </section>
      </ColumnsLayout.Main>
      <ColumnsLayout.Aside sticky={58} asideWidth="min(380px, 38%)">
        <div className="community-page__aside">
          <div className="community-page__aside-spacer" />
          <div className="community-page__divider--hidden" />

          <CommunityReviewFilters
            query={searchQuery}
            onQueryChange={handleQueryChange}
            value={reviewFilter}
            onChange={handleFilterChange}
          />
        </div>
      </ColumnsLayout.Aside>
    </ColumnsLayout>
  );
}

function getFilteredReviews(
  reviews: EventReview[],
  filter: CommunityReviewFilterId,
  query: string,
): EventReview[] {
  const ratingFiltered = filter === 'all'
    ? reviews
    : reviews.filter(review => review.rating === Number(filter));

  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery.length === 0) {
    return ratingFiltered;
  }

  return ratingFiltered.filter(review => (
    review.member.label.toLowerCase().includes(normalizedQuery)
    || review.content.toLowerCase().includes(normalizedQuery)
    || review.event.title.toLowerCase().includes(normalizedQuery)
  ));
}
