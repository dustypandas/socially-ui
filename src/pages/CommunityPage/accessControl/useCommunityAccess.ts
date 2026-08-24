import { useCallback, useState } from 'react';
import type { AuthIntent, CommunityViewerStatus } from '@src/common-libs/types';
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
type AuthOverlayType = 'login' | 'signup';

type NavigateToPanelOptions = {
  eventFilter?: CommunityEventFilterId;
};

type UseCommunityAccessOptions = {
  communityId: string;
  communityName: string;
  viewerStatus: CommunityViewerStatus | null | undefined;
  refreshCommunityPageData: () => Promise<void>;
  navigateToPanel: (panelId: CommunityPanelId, options?: NavigateToPanelOptions) => void;
  authOverlayDefault?: AuthOverlayType;
};

export function useCommunityAccess({
  communityId,
  communityName,
  viewerStatus,
  refreshCommunityPageData,
  navigateToPanel,
  authOverlayDefault = 'login',
}: UseCommunityAccessOptions) {
  const [isJoinOverlayOpen, setIsJoinOverlayOpen] = useState(false);
  const [joinOverlayIntent, setJoinOverlayIntent] = useState<JoinOverlayIntent | null>(null);
  const [authIntent, setAuthIntent] = useState<AuthIntent | undefined>();
  const [authOverlay, setAuthOverlay] = useState<{
    type: AuthOverlayType;
    onSuccess?: () => void | Promise<void>;
  } | null>(null);

  const joinOverlayTitle = joinOverlayIntent === 'joinCommunity'
    ? 'Community questions'
    : 'Join this community';

  const openAuthOverlay = useCallback((
    onSuccess: () => void | Promise<void>,
    intent?: AuthIntent,
  ) => {
    setAuthIntent(intent);
    setAuthOverlay({
      type: authOverlayDefault,
      onSuccess: authOverlayDefault === 'login' ? onSuccess : undefined,
    });
  }, [authOverlayDefault]);

  const openJoinOverlay = useCallback((intent: JoinOverlayIntent) => {
    setJoinOverlayIntent(intent);
    setIsJoinOverlayOpen(true);
  }, []);

  const handleJoinOverlayClose = useCallback(() => {
    setIsJoinOverlayOpen(false);
    setJoinOverlayIntent(null);
  }, []);

  const handleAuthOverlayClose = useCallback(() => {
    setAuthOverlay(null);
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
      openAuthOverlay(
        resolveMemberAccessAfterLogin(targetAction, 'memberRequirement'),
        {
          intent: 'exploreCommunity',
          intentLabel: `explore ${communityName}`,
          actionLabel: 'Request to Join community',
          targetAction,
        },
      );
    }
  }, [
    viewerStatus,
    openJoinOverlay,
    openAuthOverlay,
    resolveMemberAccessAfterLogin,
    communityName,
  ]);

  const handleJoinBtnClick = useCallback(() => {
    if (isLoggedOut(viewerStatus)) {
      openAuthOverlay(
        resolveMemberAccessAfterLogin(() => {}, 'joinCommunity'),
        {
          intent: 'joinCommunity',
          intentLabel: `join ${communityName}`,
          actionLabel: 'Request to Join community',
          targetAction: () => {},
        },
      );
      return;
    }

    if (viewerStatus === 'pending' || viewerStatus === 'member') {
      return;
    }

    openJoinOverlay('joinCommunity');
  }, [
    viewerStatus,
    openAuthOverlay,
    openJoinOverlay,
    resolveMemberAccessAfterLogin,
    communityName,
  ]);

  const handleNavigateClick = useCallback((
    panelId: CommunityPanelId,
    options?: NavigateToPanelOptions,
  ) => {
    const targetAction = () => navigateToPanel(panelId, options);

    if (isLoggedOut(viewerStatus) && isLoginGatedPanel(panelId)) {
      openAuthOverlay(async () => {
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
      }, {
        intent: 'exploreCommunity',
        intentLabel: `explore ${communityName}`,
        actionLabel: 'Request to Join community',
        targetAction,
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
    openAuthOverlay,
    refreshCommunityPageData,
    communityId,
    openJoinOverlay,
    requireMemberAccess,
    navigateToPanel,
    communityName,
  ]);

  return {
    isLoggedOut: isLoggedOut(viewerStatus),
    isMember: isMember(viewerStatus),
    requireMemberAccess,
    handleJoinBtnClick,
    handleNavigateClick,
    isJoinOverlayOpen,
    joinOverlayTitle,
    isAuthOverlayOpen: authOverlay !== null,
    authOverlayMode: authOverlay?.type ?? 'login',
    authOverlayIntent: authIntent,
    loginOnSuccess: authOverlay?.onSuccess,
    handleJoinOverlayClose,
    handleAuthOverlayClose,
  };
}
