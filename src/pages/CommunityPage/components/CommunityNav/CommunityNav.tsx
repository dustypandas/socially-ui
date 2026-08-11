import { useRef } from 'react';
import type { CommunityEngagement } from '@src/common-libs/types';
import { ColumnsLayout } from '@src/components';
import {
  getElementDocumentOffsetTop,
  useScrolledPastDistance,
} from '@src/hooks/useScrolledPastDistance';
import { CommunityActionButtons } from '../CommunityActionButtons/CommunityActionButtons';
import './community-nav.css';

const NAV_LINKS = ['About', 'Events', 'Members'] as const;

type CommunityNavProps = {
  communityViewerStatus: CommunityEngagement['status'] | null;
  isOrganizer?: boolean;
  onJoinClick?: () => void;
  onMembershipClick?: () => void;
};

export function CommunityNav({
  communityViewerStatus,
  isOrganizer,
  onJoinClick,
  onMembershipClick,
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
                {NAV_LINKS.map(label => (
                  <a key={label} href="#" className="community-nav__link">
                    {label}
                  </a>
                ))}
                {isOrganizer === true && (
                  <a href="#" className="community-nav__link">
                    Requests
                  </a>
                )}
              </div>
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside asideWidth="min(380px, 38%)" className="community-nav__actions-container">
              <CommunityActionButtons
                membershipStatus={communityViewerStatus}
                isOrganizer={isOrganizer}
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
