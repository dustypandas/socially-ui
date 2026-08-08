import { useRef } from 'react';
import type { CommunityEngagement } from '@src/common-libs/types';
import { ColumnsLayout } from '@src/components';
import {
  getElementDocumentOffsetTop,
  useScrolledPastDistance,
} from '@src/hooks/useScrolledPastDistance';
import './community-nav.css';

const NAV_LINKS = ['About', 'Events', 'Members', 'Links'] as const;

type CommunityNavProps = {
  memberEngagementStatus: CommunityEngagement['status'] | null;
  onJoinClick?: () => void;
};

export function CommunityNav({ memberEngagementStatus, onJoinClick }: CommunityNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const isDocked = useScrolledPastDistance({
    ref: navRef,
    getDistance: (nav) => getElementDocumentOffsetTop(nav) + 50, // should substract header height, only on mobile
  });
  const isJoinPending = memberEngagementStatus === 'pending';

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
              </div>
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside asideWidth="min(380px, 38%)" className="community-nav__join-btn-container">
              <button
                type="button"
                className="community-nav__join-btn"
                onClick={onJoinClick}
                disabled={isJoinPending}
              >
                {isJoinPending ? 'Join request pending' : 'Join this community'}
              </button>
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
