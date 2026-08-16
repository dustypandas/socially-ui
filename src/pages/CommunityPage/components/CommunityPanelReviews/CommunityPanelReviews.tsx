import { useState } from 'react';
import type { EventReview } from '@src/common-libs/types';
import { ColumnsLayout, ReviewItem } from '@src/components';
import { SectionTitle } from '@src/components/SectionTitle/SectionTitle';
import { getReviewsSectionTitle } from '@src/helpers/labelHelpers';
import {
  CommunityReviewFilters,
  type CommunityReviewFilterId,
  type CommunityReviewRatingCountsMap,
} from './CommunityReviewFilters';
import './community-panel-reviews.css';

const PAGE_SIZE = 10;

type CommunityPanelReviewsProps = {
  reviews: EventReview[];
  shouldUseExactValue?: boolean;
  onScrollToTop?: () => void;
};

export function CommunityPanelReviews({
  reviews,
  shouldUseExactValue,
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
  const ratingCountsMap = buildRatingCountsMap(reviews);

  return (
    <ColumnsLayout mainPosition="right">
      <ColumnsLayout.Aside sticky={58} asideWidth="min(380px, 38%)">
        <div className="community-page__aside">
          <div className="community-page__aside-spacer" />

          <CommunityReviewFilters
            query={searchQuery}
            onQueryChange={handleQueryChange}
            value={reviewFilter}
            onChange={handleFilterChange}
            ratingCountsMap={ratingCountsMap}
          />
          
          {/* <div className="community-page__divider--hidden" /> */}
        </div>
      </ColumnsLayout.Aside>
      <ColumnsLayout.Main>
        <section className="community-panel-reviews">
          <SectionTitle
            title={getReviewsSectionTitle(visibleReviews.length, shouldUseExactValue)}
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

type RatingCountKey = keyof CommunityReviewRatingCountsMap;

const EMPTY_RATING_COUNTS_MAP: CommunityReviewRatingCountsMap = {
  '1': 0,
  '2': 0,
  '3': 0,
  '4': 0,
  '5': 0,
};

function buildRatingCountsMap(reviews: EventReview[]): CommunityReviewRatingCountsMap {
  return reviews.reduce((counts, review) => {
    const key = String(review.rating) as RatingCountKey;
    counts[key] += 1;
    return counts;
  }, { ...EMPTY_RATING_COUNTS_MAP });
}
