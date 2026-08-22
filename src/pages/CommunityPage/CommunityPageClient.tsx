import { useCallback, useState } from 'react';
import { AuthOverlay, ColumnsLayout, PageLayout } from '@src/components';
import { getElementDocumentOffsetTop } from '@src/hooks/useScrolledPastDistance';
import {
  CommunityHero,
  CommunityIntro,
  CommunityNav,
  CommunityOverlayActions,
  CommunityOverlayJoin,
  CommunityPanelAbout,
  CommunityPanelEvents,
  CommunityPanelMembers,
  CommunityPanelReviews,
} from './components';
import type { CommunityEventFilterId, CommunityPanelId } from './components';
import { canRenderLoginGatedPanel, canRenderMemberGatedPanel, isMember, useCommunityAccess } from './accessControl';
import { CommunityPageClientProps, useCommunityPageStates } from './useCommunityPageStates';
import './community-page.css';

export function CommunityPageClient({ variant }: CommunityPageClientProps) {
  const {
    communityPageData,
    viewerStatus,
    hasResolvedMemberRequests,
    resolveMemberRequests,
    markJoinPending,
    markMembershipCleared,
    refreshCommunityPageData,
  } = useCommunityPageStates({ variant });
  const [isActionsOverlayOpen, setIsActionsOverlayOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<CommunityPanelId>('about');
  const [eventFilter, setEventFilter] = useState<CommunityEventFilterId>('upcoming');

  const scrollToTop = useCallback(() => {
    const hero = document.getElementById('community-hero');
    const nav = document.querySelector('.community-nav');
    if (hero && nav instanceof HTMLElement) {
      const stickyTop = parseFloat(getComputedStyle(nav).top) || 0;
      const top = getElementDocumentOffsetTop(hero) + hero.offsetHeight - stickyTop - 16;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  }, []);

  const navigateToPanel = useCallback((
    panelId: CommunityPanelId,
    options?: { eventFilter?: CommunityEventFilterId },
  ) => {
    setActivePanel(panelId);
    if (panelId === 'events') {
      setEventFilter(options?.eventFilter ?? 'upcoming');
    }
    scrollToTop();
  }, [scrollToTop]);

  const {
    isLoggedOut,
    requireMemberAccess,
    handleJoinBtnClick,
    handleNavigateClick,
    isJoinOverlayOpen,
    joinOverlayTitle,
    isAuthOverlayOpen,
    authOverlayMode,
    loginOnSuccess,
    handleJoinOverlayClose,
    handleAuthOverlayClose,
  } = useCommunityAccess({
    communityId: communityPageData?.id ?? '',
    viewerStatus,
    refreshCommunityPageData,
    navigateToPanel,
    authOverlayDefault: variant === 'public' ? 'signup' : 'login',
  });

  if (!communityPageData) {
    return null;
  }

  if (viewerStatus === 'banned') {
    return (
      <PageLayout hasStaticHeader>
        <div className="community-page community-page--unavailable">
          <p>This page is not available</p>
        </div>
      </PageLayout>
    );
  }

  const requestBadgeCount = hasResolvedMemberRequests
    ? 0
    : communityPageData.communityMemberRequests?.length ?? 0;

  const shouldUseExactValue = communityPageData.isOrganiser === true;

  const handleMembershipBtnClick = () => {
    setIsActionsOverlayOpen(true);
  };

  const handleActionsOverlayClose = () => setIsActionsOverlayOpen(false);

  return (
    <PageLayout hasStaticHeader headerVariant={isLoggedOut ? 'loggedOut' : undefined}>
      <section className="community-page">
        <div id="community-hero" className="width-container community-page__hero">
          <ColumnsLayout>
            <ColumnsLayout.Main>
              <CommunityHero image={communityPageData.image} name={communityPageData.name} />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside asideWidth="min(380px, 38%)">
              <CommunityIntro
                name={communityPageData.name}
                memberCount={communityPageData.membersCount}
                rating={communityPageData.rating}
                ratingCount={communityPageData.ratingCount}
                viewerStatus={communityPageData.viewerStatus}
                isOrganiser={communityPageData.isOrganiser === true}
                onJoinBtnClick={handleJoinBtnClick}
                onMemberBtnClick={handleMembershipBtnClick}
                onNavigate={handleNavigateClick}
              />
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>

        <CommunityNav
          activePanel={activePanel}
          viewerStatus={communityPageData.viewerStatus}
          isOrganiser={communityPageData.isOrganiser === true}
          membersBadgeCount={requestBadgeCount}
          onJoinBtnClick={handleJoinBtnClick}
          onMemberBtnClick={handleMembershipBtnClick}
          onNavigate={handleNavigateClick}
        />

        <div className="width-container community-page__content">
          {activePanel === 'about' && (
            <CommunityPanelAbout
              descriptionHtml={communityPageData.descriptionHtml}
              futureEvents={communityPageData.futureEvents}
              pastEvents={communityPageData.pastEvents}
              pastEventsTotalCount={communityPageData.pastEventsTotalCount}
              reviews={communityPageData.reviewsForOneCommunity}
              organisers={communityPageData.organisers}
              recentLocations={communityPageData.recentLocations}
              onMoreEventsClick={() => handleNavigateClick('events')}
              onPastEventsClick={() => handleNavigateClick('events', { eventFilter: 'past' })}
              onMoreReviewsClick={() => requireMemberAccess(() => navigateToPanel('reviews'))}
              shouldUseExactValue={shouldUseExactValue}
            />
          )}
          {activePanel === 'events' && canRenderLoginGatedPanel(viewerStatus) && (
            <CommunityPanelEvents
              key={eventFilter}
              futureEvents={communityPageData.futureEvents}
              pastEvents={communityPageData.pastEvents}
              eventFilter={eventFilter}
              onEventFilterChange={setEventFilter}
              onScrollToTop={scrollToTop}
              shouldUseExactValue={shouldUseExactValue}
              requireMemberAccess={requireMemberAccess}
              canShowMore={isMember(viewerStatus)}
            />
          )}
          {activePanel === 'members' && canRenderMemberGatedPanel(viewerStatus) && (
            <CommunityPanelMembers
              members={communityPageData.communityMembers}
              memberRequests={communityPageData.communityMemberRequests}
              isOrganiser={communityPageData.isOrganiser === true}
              requestBadgeCount={requestBadgeCount}
              onRequestsViewed={resolveMemberRequests}
              onScrollToTop={scrollToTop}
              requireMemberAccess={requireMemberAccess}
              canShowMore={isMember(viewerStatus)}
            />
          )}
          {activePanel === 'reviews' && (
            <CommunityPanelReviews
              reviews={communityPageData.reviewsForOneCommunity}
              onScrollToTop={scrollToTop}
              shouldUseExactValue={shouldUseExactValue}
              requireMemberAccess={requireMemberAccess}
              canShowMore={isMember(viewerStatus)}
            />
          )}
        </div>
      </section>

      <AuthOverlay
        isOpen={isAuthOverlayOpen}
        initialMode={authOverlayMode}
        onClose={handleAuthOverlayClose}
        onSuccess={loginOnSuccess}
      />

      <CommunityOverlayJoin
        communityId={communityPageData.id}
        entryConditions={communityPageData.entryConditions}
        isOpen={isJoinOverlayOpen}
        title={joinOverlayTitle}
        onClose={handleJoinOverlayClose}
        onJoinSuccess={markJoinPending}
      />

      <CommunityOverlayActions
        communityId={communityPageData.id}
        isOpen={isActionsOverlayOpen}
        isOrganiser={communityPageData.isOrganiser === true}
        onClose={handleActionsOverlayClose}
        onLeaveSuccess={markMembershipCleared}
      />
    </PageLayout>
  );
}
