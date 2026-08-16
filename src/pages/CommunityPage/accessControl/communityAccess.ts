import type { CommunityViewerStatus } from '@src/common-libs/types';
import { getSessionCommunityStatus } from '@src/data';

export type CommunityPanelId = 'about' | 'events' | 'members' | 'reviews';

export const LOGIN_GATED_PANELS: ReadonlySet<CommunityPanelId> = new Set(['events', 'members']);
export const MEMBER_GATED_PANELS: ReadonlySet<CommunityPanelId> = new Set(['members']);

export type RequireMemberAccess = (targetAction: () => void) => void;

export function isLoggedOut(viewerStatus: CommunityViewerStatus | null | undefined): viewerStatus is null {
  return !viewerStatus;
}

export function isMember(viewerStatus: CommunityViewerStatus | null | undefined): boolean {
  return viewerStatus === 'member';
}

export function isLoginGatedPanel(panelId: CommunityPanelId): boolean {
  return LOGIN_GATED_PANELS.has(panelId);
}

export function isMemberGatedPanel(panelId: CommunityPanelId): boolean {
  return MEMBER_GATED_PANELS.has(panelId);
}

export function canRenderLoginGatedPanel(viewerStatus: CommunityViewerStatus | null | undefined): boolean {
  return !isLoggedOut(viewerStatus);
}

export function canRenderMemberGatedPanel(viewerStatus: CommunityViewerStatus | null | undefined): boolean {
  return isMember(viewerStatus);
}

export function shouldShowGatedNavLink(
  viewerStatus: CommunityViewerStatus | null | undefined,
  panelId: CommunityPanelId,
): boolean {
  return viewerStatus !== 'pending' || !isMemberGatedPanel(panelId);
}

export async function resolveMembershipAfterLogin(
  communityId: string,
  refreshCommunityPageData: () => Promise<void>,
): Promise<boolean> {
  await refreshCommunityPageData();
  const status = await getSessionCommunityStatus(communityId);
  return status === 'member';
}
