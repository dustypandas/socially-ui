import { useCallback, useState } from 'react';
import type { EventViewerStatus } from '@src/common-libs/types';
import { attendEvent, getSessionCommunityStatus } from '@src/data';
import {
  canViewEventAttendees,
  hasRsvp,
  isLoggedOut,
  isMember,
  resolveMembershipAfterLogin,
} from './eventAccess';

type JoinOverlayIntent = 'joinEvent' | 'memberRequirement';
type AuthOverlayType = 'login' | 'signup';

type UseEventAccessOptions = {
  eventId: string;
  communityId: string;
  viewerStatus: EventViewerStatus | null | undefined;
  refreshEventPageData: () => Promise<void>;
  setEventViewerStatus: (status: EventViewerStatus | null) => void;
  authOverlayDefault?: AuthOverlayType;
};

export function useEventAccess({
  eventId,
  communityId,
  viewerStatus,
  refreshEventPageData,
  setEventViewerStatus,
  authOverlayDefault = 'login',
}: UseEventAccessOptions) {
  const [isJoinOverlayOpen, setIsJoinOverlayOpen] = useState(false);
  const [joinOverlayIntent, setJoinOverlayIntent] = useState<JoinOverlayIntent | null>(null);
  const [pendingMemberAction, setPendingMemberAction] = useState<(() => void) | undefined>();
  const [authOverlay, setAuthOverlay] = useState<{
    type: AuthOverlayType;
    onSuccess?: () => void | Promise<void>;
  } | null>(null);
  const [isJoinLoading, setIsJoinLoading] = useState(false);

  const joinOverlayTitle = joinOverlayIntent === 'joinEvent'
    ? 'Community questions'
    : 'Join this community';

  const openAuthOverlay = useCallback((onSuccess: () => void | Promise<void>) => {
    setAuthOverlay({
      type: authOverlayDefault,
      onSuccess: authOverlayDefault === 'login' ? onSuccess : undefined,
    });
  }, [authOverlayDefault]);

  const openJoinOverlay = useCallback((
    intent: JoinOverlayIntent,
    pendingAction?: () => void,
  ) => {
    setJoinOverlayIntent(intent);
    setPendingMemberAction(pendingAction ? () => pendingAction : undefined);
    setIsJoinOverlayOpen(true);
  }, []);

  const handleJoinOverlayClose = useCallback(() => {
    setIsJoinOverlayOpen(false);
    setJoinOverlayIntent(null);
    setPendingMemberAction(undefined);
  }, []);

  const handleAuthOverlayClose = useCallback(() => {
    setAuthOverlay(null);
  }, []);

  const proceedToAttend = useCallback(async () => {
    setIsJoinLoading(true);
    try {
      await attendEvent(eventId);
      setEventViewerStatus('attending');
    } finally {
      setIsJoinLoading(false);
    }
  }, [eventId, setEventViewerStatus]);

  const resolveMemberAccessAfterLogin = useCallback((
    targetAction: () => void,
  ) => async () => {
    const allowed = await resolveMembershipAfterLogin(communityId, refreshEventPageData);
    if (allowed) {
      targetAction();
      return;
    }
    openJoinOverlay('memberRequirement', targetAction);
  }, [communityId, refreshEventPageData, openJoinOverlay]);

  const requireMemberAccess = useCallback((targetAction: () => void) => {
    if (canViewEventAttendees(viewerStatus)) {
      targetAction();
      return;
    }

    if (isLoggedOut(viewerStatus)) {
      openAuthOverlay(resolveMemberAccessAfterLogin(targetAction));
      return;
    }

    openJoinOverlay('memberRequirement', targetAction);
  }, [viewerStatus, openAuthOverlay, resolveMemberAccessAfterLogin, openJoinOverlay]);

  const requireLoginAccess = useCallback((targetAction: () => void) => {
    if (isLoggedOut(viewerStatus)) {
      openAuthOverlay(async () => {
        await refreshEventPageData();
        targetAction();
      });
      return;
    }

    targetAction();
  }, [viewerStatus, openAuthOverlay, refreshEventPageData]);

  const resolveAttendAccessAfterLogin = useCallback(() => async () => {
    const allowed = await resolveMembershipAfterLogin(communityId, refreshEventPageData);
    if (allowed) {
      await proceedToAttend();
      return;
    }
    openJoinOverlay('joinEvent');
  }, [communityId, refreshEventPageData, proceedToAttend, openJoinOverlay]);

  const handleJoinBtnClick = useCallback(() => {
    if (viewerStatus === 'pending' || viewerStatus === 'banned' || hasRsvp(viewerStatus)) {
      return;
    }

    if (isLoggedOut(viewerStatus)) {
      openAuthOverlay(resolveAttendAccessAfterLogin());
      return;
    }

    if (isMember(viewerStatus)) {
      void proceedToAttend();
      return;
    }

    openJoinOverlay('joinEvent');
  }, [
    viewerStatus,
    openAuthOverlay,
    resolveAttendAccessAfterLogin,
    proceedToAttend,
    openJoinOverlay,
  ]);

  const handleJoinOverlaySuccess = useCallback(async () => {
    await refreshEventPageData();
    const status = await getSessionCommunityStatus(communityId);

    if (joinOverlayIntent === 'memberRequirement') {
      if (status === 'member') {
        pendingMemberAction?.();
      } else {
        setEventViewerStatus('pending');
      }
      return;
    }

    if (status === 'member') {
      await proceedToAttend();
      return;
    }
    setEventViewerStatus('pending');
  }, [
    communityId,
    refreshEventPageData,
    joinOverlayIntent,
    pendingMemberAction,
    proceedToAttend,
    setEventViewerStatus,
  ]);

  return {
    isLoggedOut: isLoggedOut(viewerStatus),
    handleJoinBtnClick,
    handleJoinOverlaySuccess,
    requireMemberAccess,
    requireLoginAccess,
    isJoinOverlayOpen,
    joinOverlayTitle,
    isAuthOverlayOpen: authOverlay !== null,
    authOverlayMode: authOverlay?.type ?? 'login',
    loginOnSuccess: authOverlay?.onSuccess,
    isJoinLoading,
    handleJoinOverlayClose,
    handleAuthOverlayClose,
  };
}
