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

type UseEventAccessOptions = {
  eventId: string;
  communityId: string;
  viewerStatus: EventViewerStatus | null | undefined;
  refreshEventPageData: () => Promise<void>;
  setEventViewerStatus: (status: EventViewerStatus | null) => void;
};

export function useEventAccess({
  eventId,
  communityId,
  viewerStatus,
  refreshEventPageData,
  setEventViewerStatus,
}: UseEventAccessOptions) {
  const [isJoinOverlayOpen, setIsJoinOverlayOpen] = useState(false);
  const [joinOverlayIntent, setJoinOverlayIntent] = useState<JoinOverlayIntent | null>(null);
  const [pendingMemberAction, setPendingMemberAction] = useState<(() => void) | undefined>();
  const [isLoginOverlayOpen, setIsLoginOverlayOpen] = useState(false);
  const [loginOnSuccess, setLoginOnSuccess] = useState<(() => void | Promise<void>) | undefined>();
  const [isJoinLoading, setIsJoinLoading] = useState(false);

  const joinOverlayTitle = joinOverlayIntent === 'joinEvent'
    ? 'Community questions'
    : 'Join this community';

  const openLoginOverlay = useCallback((onSuccess: () => void | Promise<void>) => {
    setLoginOnSuccess(() => onSuccess);
    setIsLoginOverlayOpen(true);
  }, []);

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

  const handleLoginOverlayClose = useCallback(() => {
    setIsLoginOverlayOpen(false);
    setLoginOnSuccess(undefined);
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
      openLoginOverlay(resolveMemberAccessAfterLogin(targetAction));
      return;
    }

    openJoinOverlay('memberRequirement', targetAction);
  }, [viewerStatus, openLoginOverlay, resolveMemberAccessAfterLogin, openJoinOverlay]);

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
      openLoginOverlay(resolveAttendAccessAfterLogin());
      return;
    }

    if (isMember(viewerStatus)) {
      void proceedToAttend();
      return;
    }

    openJoinOverlay('joinEvent');
  }, [
    viewerStatus,
    openLoginOverlay,
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
    isJoinOverlayOpen,
    joinOverlayTitle,
    isLoginOverlayOpen,
    loginOnSuccess,
    isJoinLoading,
    handleJoinOverlayClose,
    handleLoginOverlayClose,
  };
}
