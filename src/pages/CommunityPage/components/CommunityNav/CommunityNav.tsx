import { useRef } from 'react';
import type { CommunityViewerStatus } from '@src/common-libs/types';
import { ColumnsLayout } from '@src/components';
import {
  getElementDocumentOffsetTop,
  useScrolledPastDistance,
} from '@src/hooks/useScrolledPastDistance';
import { CommunityActionButtons } from '../CommunityActionButtons/CommunityActionButtons';
import './community-nav.css';

export type CommunityPanelId = 'about' | 'events' | 'members' | 'reviews';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'events', label: 'Events' },
  { id: 'members', label: 'Members' },
  { id: 'reviews', label: 'Reviews' },
] as const satisfies readonly { id: CommunityPanelId; label: string }[];

type CommunityNavProps = {
  activePanel: CommunityPanelId;
  viewerStatus?: CommunityViewerStatus;
  isOrganiser?: boolean;
  membersBadgeCount?: number;
  onJoinClick?: () => void;
  onMembershipClick?: () => void;
  onNavigate: (panelId: CommunityPanelId) => void;
};

export function CommunityNav({
  activePanel,
  viewerStatus: communityViewerStatus,
  isOrganiser,
  membersBadgeCount = 0,
  onJoinClick,
  onMembershipClick,
  onNavigate,
}: CommunityNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const isDocked = useScrolledPastDistance({
    ref: navRef,
    getDistance: (nav) => getElementDocumentOffsetTop(nav) + 50, // should substract header height, only on mobile
  });

  return (
    <>
      <nav
        ref={navRef}
        className={`community-nav${isDocked ? ' community-nav--docked' : ''}`}
      >
        <div className="width-container community-nav__container">
          <ColumnsLayout>
            <ColumnsLayout.Main>
              <div className="community-nav__links">
                {NAV_LINKS.map(link => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className={[
                      'community-nav__link',
                      activePanel === link.id && 'community-nav__link--active',
                    ].filter(Boolean).join(' ')}
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate(link.id);
                    }}
                  >
                    <span className="community-nav__link-label">{link.label}</span>
                    {link.id === 'members' && membersBadgeCount > 0 && (
                      <span className="badge-num">{membersBadgeCount}</span>
                    )}
                  </a>
                ))}
              </div>
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside asideWidth="min(380px, 38%)" className="community-nav__actions-container">
              <CommunityActionButtons
                viewerStatus={communityViewerStatus}
                isOrganiser={isOrganiser}
                onJoinClick={onJoinClick}
                onMembershipClick={onMembershipClick}
              />
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </nav>
      <div
        className={`community-nav__divider${isDocked ? ' community-nav__divider--docked' : ''}`}
      />
    </>
  );
}
