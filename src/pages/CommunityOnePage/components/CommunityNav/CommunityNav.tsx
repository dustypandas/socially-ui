import { useEffect, useRef, useState } from 'react';
import { ColumnsLayout } from '../../../../components';
import './community-nav.css';

const NAV_LINKS = ['About', 'Events', 'Members', 'Links'] as const;

export function CommunityNav() {
  const navRef = useRef<HTMLElement>(null);
  const [isDocked, setIsDocked] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      const nav = navRef.current;
      if (!nav) {
        return;
      }

      const docked = window.scrollY >= (nav.offsetTop + 50);
      setIsDocked(prev => (prev !== docked ? docked : prev));
    };

    handleUpdate();
    window.addEventListener('scroll', handleUpdate, { passive: true });
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate);
      window.removeEventListener('resize', handleUpdate);
    };
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`community-nav${isDocked ? ' community-nav--docked' : ''}`}
        aria-label="Community sections"
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
            <ColumnsLayout.Aside asideWidth="min(380px, 38%)">
              <button
                type="button"
                className="global-btn global-btn--purple-white community-nav__join-btn"
              >
                Join this community
              </button>
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </nav>
      <div
        className={`global__page-divider community-nav__divider${isDocked ? ' community-nav__divider--docked' : ''}`}
      />
    </>
  );
}
