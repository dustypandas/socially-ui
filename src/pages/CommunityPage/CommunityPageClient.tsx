import { useState } from 'react';
import { ColumnsLayout, PageLayout } from '@src/components';
import {
  CommunityAbout,
  CommunityEventsSection,
  CommunityHero,
  CommunityIntroPanel,
  CommunityJoinOverlay,
  CommunityMembers,
  CommunityActionsOverlay,
  CommunityNav,
  CommunityOrganizers,
  CommunityPastEvents,
} from './components';
import { CommunityPageClientProps, useCommunityPageStates } from './useCommunityPageStates';
import './community-page.css';

export function CommunityPageClient({ variant }: CommunityPageClientProps) {
  const {
    communityPageData,
    markJoinPending,
    markMembershipCleared,
  } = useCommunityPageStates({ variant });
  const [isJoinOverlayOpen, setIsJoinOverlayOpen] = useState(false);
  const [isActionsOverlayOpen, setIsActionsOverlayOpen] = useState(false);

  if (!communityPageData) {
    return null;
  }

  const communityViewerStatus = communityPageData.communityViewerStatus;
  const handleJoinClick = () => {
    if (
      communityViewerStatus === 'pending'
      || communityViewerStatus === 'member'
    ) {
      return;
    }

    setIsJoinOverlayOpen(true);
  };
  const handleJoinOverlayClose = () => setIsJoinOverlayOpen(false);

  const handleMembershipClick = () => {
    if (communityViewerStatus !== 'member') {
      return;
    }

    setIsActionsOverlayOpen(true);
  };
  const handleActionsOverlayClose = () => setIsActionsOverlayOpen(false);

  return (
    <PageLayout hasStaticHeader>
      <section className="community-page">
        <div className="width-container community-page__hero">
          <ColumnsLayout>
            <ColumnsLayout.Main>
              <CommunityHero image={communityPageData.image} name={communityPageData.name} />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside asideWidth="min(380px, 38%)">
              <CommunityIntroPanel
                name={communityPageData.name}
                memberCount={communityPageData.membersCount}
                rating={communityPageData.rating}
                ratingCount={communityPageData.ratingCount}
                communityViewerStatus={communityPageData.communityViewerStatus}
                isOrganizer={communityPageData.isOrganizer === true}
                onJoinClick={handleJoinClick}
                onMembershipClick={handleMembershipClick}
              />
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>

        <CommunityNav
          communityViewerStatus={communityPageData.communityViewerStatus}
          isOrganizer={communityPageData.isOrganizer === true}
          onJoinClick={handleJoinClick}
          onMembershipClick={handleMembershipClick}
        />

        <div className="width-container community-page__content">
          <ColumnsLayout>
            <ColumnsLayout.Main>
              <CommunityAbout detailsHtml={communityPageData.descriptionHtml} />
              <div className="community-page__divider--hidden" />
              <CommunityEventsSection events={communityPageData.futureEvents} />
              {communityPageData.pastEventsTotalCount > 0 && (
                <>
                  <div className="community-page__divider--hidden" />
                  <CommunityPastEvents
                    count={communityPageData.pastEventsTotalCount}
                    events={communityPageData.pastEvents}
                  />
                </>
              )}
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky={58} asideWidth="min(380px, 38%)">
              <div className="community-page__aside">
                <div className="community-page__divider--hidden" />
                <CommunityOrganizers organizers={communityPageData.organizers} />
                <CommunityMembers
                  membersCount={communityPageData.membersCount}
                  memberAvatars={communityPageData.memberAvatars}
                />
              </div>
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>

      <CommunityJoinOverlay
        communityId={communityPageData.id}
        entryConditions={communityPageData.entryConditions}
        isOpen={isJoinOverlayOpen}
        onClose={handleJoinOverlayClose}
        onJoinSuccess={markJoinPending}
      />

      <CommunityActionsOverlay
        communityId={communityPageData.id}
        isOpen={isActionsOverlayOpen}
        isOrganizer={communityPageData.isOrganizer === true}
        onClose={handleActionsOverlayClose}
        onLeaveSuccess={markMembershipCleared}
      />
    </PageLayout>
  );
}
