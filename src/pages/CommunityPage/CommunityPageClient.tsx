import { useState } from 'react';
import { AuthLoginOverlay, ColumnsLayout, PageLayout } from '@src/components';
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
import type { CommunityPanelId } from './components';
import { CommunityPageClientProps, useCommunityPageStates } from './useCommunityPageStates';
import './community-page.css';

const LOGIN_GATED_PANELS: ReadonlySet<CommunityPanelId> = new Set(['events', 'members']);

export function CommunityPageClient({ variant }: CommunityPageClientProps) {
  const {
    communityPageData,
    viewerStatus,
    hasResolvedMemberRequests,
    resolveMemberRequests,
    markJoinPending,
    markMembershipCleared,
  } = useCommunityPageStates({ variant });
  const [isJoinOverlayOpen, setIsJoinOverlayOpen] = useState(false);
  const [isLoginOverlayOpen, setIsLoginOverlayOpen] = useState(false);
  const [isActionsOverlayOpen, setIsActionsOverlayOpen] = useState(false);
  const [loginOnSuccess, setLoginOnSuccess] = useState<(() => void) | undefined>();
  const [activePanel, setActivePanel] = useState<CommunityPanelId>('about');
  const isLoggedOut = viewerStatus === null;

  if (viewerStatus === 'banned') {
    return (
      <PageLayout hasStaticHeader>
        <div className="community-page community-page--unavailable">
          <p>This page is not available</p>
        </div>
      </PageLayout>
    );
  }

  if (!communityPageData) {
    return null;
  }

  const requestBadgeCount = hasResolvedMemberRequests
    ? 0
    : communityPageData.communityMemberRequests?.length ?? 0;

  const openLoginOverlay = (onSuccess: () => void) => {
    setLoginOnSuccess(() => onSuccess);
    setIsLoginOverlayOpen(true);
  };
  const openJoinOverlay = () => setIsJoinOverlayOpen(true);
  const navigateToPanel = (panelId: CommunityPanelId) => {
    setActivePanel(panelId);
    scrollToTop();
  };

  const handleJoinClick = () => {
    if (isLoggedOut) {
      openLoginOverlay(openJoinOverlay);
      return;
    }

    if (
      viewerStatus === 'pending'
      || viewerStatus === 'member'
    ) {
      return; // ignore if already a member or pending
    }

    openJoinOverlay();
  };
  const handleNavigateClick = (panelId: CommunityPanelId) => {
    if (isLoggedOut && LOGIN_GATED_PANELS.has(panelId)) {
      openLoginOverlay(() => navigateToPanel(panelId));
      return;
    }

    navigateToPanel(panelId);
  };
  const handleMembershipClick = () => {
    setIsActionsOverlayOpen(true);
  };

  const handleJoinOverlayClose = () => setIsJoinOverlayOpen(false);
  const handleLoginOverlayClose = () => {
    setIsLoginOverlayOpen(false);
    setLoginOnSuccess(undefined);
  };
  const handleActionsOverlayClose = () => setIsActionsOverlayOpen(false);

  const scrollToTop = () => {
    const hero = document.getElementById('community-hero');
    const nav = document.querySelector('.community-nav');
    if (hero && nav instanceof HTMLElement) {
      const stickyTop = parseFloat(getComputedStyle(nav).top) || 0;
      const top = getElementDocumentOffsetTop(hero) + hero.offsetHeight - stickyTop - 16;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  };

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
                onJoinClick={handleJoinClick}
                onMembershipClick={handleMembershipClick}
              />
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>

        <CommunityNav
          activePanel={activePanel}
          viewerStatus={communityPageData.viewerStatus}
          isOrganiser={communityPageData.isOrganiser === true}
          membersBadgeCount={requestBadgeCount}
          onJoinClick={handleJoinClick}
          onMembershipClick={handleMembershipClick}
          onNavigate={handleNavigateClick}
        />

        <div className="width-container community-page__content">
          {activePanel === 'about' && (
            <CommunityPanelAbout
              descriptionHtml={communityPageData.descriptionHtml}
              futureEvents={communityPageData.futureEvents}
              pastEvents={communityPageData.pastEvents}
              pastEventsTotalCount={communityPageData.pastEventsTotalCount}
              organisers={communityPageData.organisers}
              recentLocations={communityPageData.recentLocations}
            />
          )}
          {activePanel === 'events' && (
            <CommunityPanelEvents />
          )}
          {activePanel === 'members' && (
            <CommunityPanelMembers
              members={communityPageData.communityMembers}
              memberRequests={communityPageData.communityMemberRequests}
              isOrganiser={communityPageData.isOrganiser === true}
              requestBadgeCount={requestBadgeCount}
              onRequestsViewed={resolveMemberRequests}
              onScrollToTop={scrollToTop}
            />
          )}
          {activePanel === 'reviews' && (
            <CommunityPanelReviews
              reviews={communityPageData.reviewsForOneCommunity}
              onScrollToTop={scrollToTop}
            />
          )}
        </div>
      </section>

      <AuthLoginOverlay
        isOpen={isLoginOverlayOpen}
        onClose={handleLoginOverlayClose}
        onSuccess={loginOnSuccess}
      />

      <CommunityOverlayJoin
        communityId={communityPageData.id}
        entryConditions={communityPageData.entryConditions}
        isOpen={isJoinOverlayOpen}
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
