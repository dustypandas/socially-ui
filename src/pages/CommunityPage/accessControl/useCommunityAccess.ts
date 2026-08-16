import { useCallback, useState } from 'react';
import type { CommunityViewerStatus } from '@src/common-libs/types';
import type { CommunityEventFilterId } from '../components';
import {
  isLoggedOut,
  isLoginGatedPanel,
  isMember,
  isMemberGatedPanel,
  resolveMembershipAfterLogin,
  type CommunityPanelId,
  type RequireMemberAccess,
} from './communityAccess';

type JoinOverlayIntent = 'joinCommunity' | 'memberRequirement';

type NavigateToPanelOptions = {
  eventFilter?: CommunityEventFilterId;
};

type UseCommunityAccessOptions = {
  communityId: string;
  viewerStatus: CommunityViewerStatus | null | undefined;
  refreshCommunityPageData: () => Promise<void>;
  navigateToPanel: (panelId: CommunityPanelId, options?: NavigateToPanelOptions) => void;
};

export function useCommunityAccess({
  communityId,
  viewerStatus,
  refreshCommunityPageData,
  navigateToPanel,
}: UseCommunityAccessOptions) {
  const [isJoinOverlayOpen, setIsJoinOverlayOpen] = useState(false);
  const [joinOverlayIntent, setJoinOverlayIntent] = useState<JoinOverlayIntent | null>(null);
  const [isLoginOverlayOpen, setIsLoginOverlayOpen] = useState(false);
  const [loginOnSuccess, setLoginOnSuccess] = useState<(() => void | Promise<void>) | undefined>();

  const joinOverlayTitle = joinOverlayIntent === 'joinCommunity'
    ? 'Community questions'
    : 'Join this community';

  const openLoginOverlay = useCallback((onSuccess: () => void | Promise<void>) => {
    setLoginOnSuccess(() => onSuccess);
    setIsLoginOverlayOpen(true);
  }, []);

  const openJoinOverlay = useCallback((intent: JoinOverlayIntent) => {
    setJoinOverlayIntent(intent);
    setIsJoinOverlayOpen(true);
  }, []);

  const handleJoinOverlayClose = useCallback(() => {
    setIsJoinOverlayOpen(false);
    setJoinOverlayIntent(null);
  }, []);

  const handleLoginOverlayClose = useCallback(() => {
    setIsLoginOverlayOpen(false);
    setLoginOnSuccess(undefined);
  }, []);

  const resolveMemberAccessAfterLogin = useCallback((
    targetAction: () => void,
    joinIntent: JoinOverlayIntent,
  ) => async () => {
    const allowed = await resolveMembershipAfterLogin(communityId, refreshCommunityPageData);
    if (allowed) {
      targetAction();
      return;
    }
    openJoinOverlay(joinIntent);
  }, [communityId, refreshCommunityPageData, openJoinOverlay]);

  const requireMemberAccess = useCallback<RequireMemberAccess>((targetAction) => {
    if (isMember(viewerStatus)) {
      targetAction();
      return;
    }

    if (viewerStatus === 'visitor') {
      openJoinOverlay('memberRequirement');
      return;
    }

    if (isLoggedOut(viewerStatus)) {
      openLoginOverlay(resolveMemberAccessAfterLogin(targetAction, 'memberRequirement'));
    }
  }, [viewerStatus, openJoinOverlay, openLoginOverlay, resolveMemberAccessAfterLogin]);

  const handleJoinBtnClick = useCallback(() => {
    if (isLoggedOut(viewerStatus)) {
      openLoginOverlay(resolveMemberAccessAfterLogin(() => {}, 'joinCommunity'));
      return;
    }

    if (viewerStatus === 'pending' || viewerStatus === 'member') {
      return;
    }

    openJoinOverlay('joinCommunity');
  }, [viewerStatus, openLoginOverlay, openJoinOverlay, resolveMemberAccessAfterLogin]);

  const handleNavigateClick = useCallback((
    panelId: CommunityPanelId,
    options?: NavigateToPanelOptions,
  ) => {
    const targetAction = () => navigateToPanel(panelId, options);

    if (isLoggedOut(viewerStatus) && isLoginGatedPanel(panelId)) {
      openLoginOverlay(async () => {
        await refreshCommunityPageData();
        if (isMemberGatedPanel(panelId)) {
          const allowed = await resolveMembershipAfterLogin(communityId, refreshCommunityPageData);
          if (allowed) {
            targetAction();
            return;
          }
          openJoinOverlay('memberRequirement');
        } else {
          targetAction();
        }
      });
      return;
    }

    if (isMemberGatedPanel(panelId)) {
      requireMemberAccess(targetAction);
      return;
    }

    navigateToPanel(panelId, options);
  }, [
    viewerStatus,
    openLoginOverlay,
    refreshCommunityPageData,
    communityId,
    openJoinOverlay,
    requireMemberAccess,
    navigateToPanel,
  ]);

  return {
    isLoggedOut: isLoggedOut(viewerStatus),
    isMember: isMember(viewerStatus),
    requireMemberAccess,
    handleJoinBtnClick,
    handleNavigateClick,
    isJoinOverlayOpen,
    joinOverlayTitle,
    isLoginOverlayOpen,
    loginOnSuccess,
    handleJoinOverlayClose,
    handleLoginOverlayClose,
  };
}
