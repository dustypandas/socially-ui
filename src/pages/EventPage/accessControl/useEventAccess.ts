import { useCallback, useState } from 'react';
import type { EventViewerStatus } from '@src/common-libs/types';
import { attendEvent, getSessionCommunityStatus } from '@src/data';
import {
  isLoggedOut,
  isMember,
  resolveMembershipAfterLogin,
} from './eventAccess';

type UseEventAccessOptions = {
  eventId: string;
  communityId: string;
  viewerStatus: EventViewerStatus | null | undefined;
  refreshEventPageData: () => Promise<void>;
  setEventViewerStatus: (status: EventViewerStatus | null) => void;
};

function hasRsvp(viewerStatus: EventViewerStatus | null | undefined): boolean {
  return viewerStatus === 'attending'
    || viewerStatus === 'late'
    || viewerStatus === 'waitlisted'
    || viewerStatus === 'notAttending';
}

export function useEventAccess({
  eventId,
  communityId,
  viewerStatus,
  refreshEventPageData,
  setEventViewerStatus,
}: UseEventAccessOptions) {
  const [isJoinOverlayOpen, setIsJoinOverlayOpen] = useState(false);
  const [isLoginOverlayOpen, setIsLoginOverlayOpen] = useState(false);
  const [loginOnSuccess, setLoginOnSuccess] = useState<(() => void | Promise<void>) | undefined>();
  const [isJoinLoading, setIsJoinLoading] = useState(false);

  const openLoginOverlay = useCallback((onSuccess: () => void | Promise<void>) => {
    setLoginOnSuccess(() => onSuccess);
    setIsLoginOverlayOpen(true);
  }, []);

  const openJoinOverlay = useCallback(() => {
    setIsJoinOverlayOpen(true);
  }, []);

  const handleJoinOverlayClose = useCallback(() => {
    setIsJoinOverlayOpen(false);
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

  const resolveAttendAccessAfterLogin = useCallback(() => async () => {
    const allowed = await resolveMembershipAfterLogin(communityId, refreshEventPageData);
    if (allowed) {
      await proceedToAttend();
      return;
    }
    openJoinOverlay();
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

    openJoinOverlay();
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
    if (status === 'member') {
      await proceedToAttend();
      return;
    }
    setEventViewerStatus('pending');
  }, [
    communityId,
    refreshEventPageData,
    proceedToAttend,
    setEventViewerStatus,
  ]);

  return {
    isLoggedOut: isLoggedOut(viewerStatus),
    handleJoinBtnClick,
    handleJoinOverlaySuccess,
    isJoinOverlayOpen,
    isLoginOverlayOpen,
    loginOnSuccess,
    isJoinLoading,
    handleJoinOverlayClose,
    handleLoginOverlayClose,
  };
}
