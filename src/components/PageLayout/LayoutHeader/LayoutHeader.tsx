import { useEffect, useState } from 'react';
import { smoothScrollToSection } from '../../../utils/smoothScroll';
import './layout-header.css';

const navLinks = [
  { label: 'Events', href: '#/events-ui' },
  { label: 'Communities', href: '#/communities-ui' },
  { label: 'Sign-In', href: '#' },
];

const MOBILE_BREAKPOINT_PX = 480;

type LayoutHeaderProps = {
  isHomePage?: boolean;
};

export function LayoutHeader({ isHomePage = false }: LayoutHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`);

    const handleViewportChange = () => {
      if (!mediaQuery.matches) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleViewportChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      mediaQuery.removeEventListener('change', handleViewportChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) {
      event.preventDefault();
      smoothScrollToSection('home-top');
    }
  };

  return (
    <header className={`layout-header${isMenuOpen ? ' layout-header--menu-open' : ''}`}>
      <div className="layout-header__container width-container">
        <a
          href="#/home-ui"
          className="layout-header__logo-link"
          onClick={handleLogoClick}
        >
          <img
            className="layout-header__logo"
            src="./assets/logo-socially-v2.png"
            alt="socially madrid"
          />
        </a>
        <div className="layout-header__right">
          <button
            type="button"
            className="layout-header__menu-toggle"
            aria-expanded={isMenuOpen}
            aria-controls="layout-header-nav"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen(open => !open)}
          >
            <span className="layout-header__menu-icon" aria-hidden="true" />
          </button>
          <nav id="layout-header-nav" className="layout-header__nav" aria-label="Main">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="layout-header__nav-link"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </nav>
          {/* <a href="#" className="layout-header__profile" aria-label="Profile">
            <IconUser className="layout-header__profile-icon" />
          </a> */}
        </div>
      </div>
    </header>
  );
}
