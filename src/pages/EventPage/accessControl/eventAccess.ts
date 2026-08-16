import type { EventViewerStatus } from '@src/common-libs/types';
import { getSessionCommunityStatus } from '@src/data';

export function isLoggedOut(viewerStatus: EventViewerStatus | null | undefined): viewerStatus is null {
  return !viewerStatus;
}

export function isMember(viewerStatus: EventViewerStatus | null | undefined): boolean {
  return viewerStatus === 'member';
}

export async function resolveMembershipAfterLogin(
  communityId: string,
  refreshEventPageData: () => Promise<void>,
): Promise<boolean> {
  await refreshEventPageData();
  const status = await getSessionCommunityStatus(communityId);
  return status === 'member';
}
