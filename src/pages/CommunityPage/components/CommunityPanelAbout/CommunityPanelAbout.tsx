import type { EventBasic, EventReview, MapLocation, MemberAvatar } from '@src/common-libs/types';
import { ColumnsLayout, CommunityLocations } from '@src/components';
import { CommunityOrganisers } from './CommunityOrganisers';
import { CommunitySectionAbout } from './CommunitySectionAbout';
import { CommunitySectionEvents } from './CommunitySectionEvents';
import { CommunitySectionPastEvents } from './CommunitySectionPastEvents';
import { CommunitySectionReviews } from './CommunitySectionReviews';
import './community-panel-about.css';

type CommunityPanelAboutProps = {
  descriptionHtml: string;
  futureEvents: EventBasic[];
  pastEvents: EventBasic[];
  pastEventsTotalCount: number;
  reviews: EventReview[];
  organisers: MemberAvatar[];
  recentLocations: Array<MapLocation & { id: string }>;
  shouldUseExactValue?: boolean;
  onPastEventsClick?: () => void;
  onMoreEventsClick?: () => void;
  onMoreReviewsClick?: () => void;
};

export function CommunityPanelAbout({
  descriptionHtml,
  futureEvents,
  pastEvents,
  pastEventsTotalCount,
  reviews,
  organisers,
  recentLocations,
  shouldUseExactValue,
  onPastEventsClick,
  onMoreEventsClick,
  onMoreReviewsClick,
}: CommunityPanelAboutProps) {
  return (
    <ColumnsLayout>
      <ColumnsLayout.Main>
        <div className="community-panel-about">
          <CommunitySectionAbout detailsHtml={descriptionHtml} />
          <CommunitySectionEvents
            events={futureEvents}
            onMoreEventsClick={onMoreEventsClick}
          />
          {pastEventsTotalCount > 0 && (
            <>
              <div className="community-page__divider--hidden" />
              <CommunitySectionPastEvents
                count={pastEventsTotalCount}
                events={pastEvents}
                shouldUseExactValue={shouldUseExactValue}
                onPastEventsClick={onPastEventsClick}
              />
            </>
          )}
          {reviews.length > 0 && (
            <>
              <div className="community-page__divider--hidden" />
              <CommunitySectionReviews
                reviews={reviews}
                shouldUseExactValue={shouldUseExactValue}
                onMoreReviewsClick={onMoreReviewsClick}
              />
            </>
          )}
        </div>
      </ColumnsLayout.Main>
      <ColumnsLayout.Aside sticky={58} asideWidth="min(380px, 38%)">
        <div className="community-page__aside">
          <div className="community-page__divider--hidden" />
          <CommunityOrganisers organisers={organisers} />
          <CommunityLocations locations={recentLocations} />
        </div>
      </ColumnsLayout.Aside>
    </ColumnsLayout>
  );
}
