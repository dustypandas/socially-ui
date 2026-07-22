import { useState } from 'react';
import IconUser from '@src/assets/icon-user-outline.svg?react';
import { smoothScrollToSection } from '@src/helpers/smoothScroll';
import './layout-header.css';

export type LayoutHeaderVariant = 'loggedOut' | 'loggedIn' | 'auth' | 'auth2';

type HeaderNavLink = {
  label: string;
  href: string;
};

const mainNavLinks: HeaderNavLink[] = [
  { label: 'Events', href: '#/events-ui' },
  { label: 'Communities', href: '#/communities-ui' },
];

type LayoutHeaderProps = {
  isHomePage?: boolean;
  variant?: LayoutHeaderVariant;
};

export function LayoutHeader({
  isHomePage = false,
  variant = 'loggedOut',
}: LayoutHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuth2 = variant === 'auth2';
  const showLoggedOutAuth = variant === 'loggedOut';
  const showProfileLink = variant === 'loggedIn';

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) {
      event.preventDefault();
      smoothScrollToSection('home-top');
    }
  };

  return (
    <header className={[
      'layout-header',
      isAuth2 && 'layout-header--auth2',
      isMenuOpen && 'layout-header--menu-open',
    ].filter(Boolean).join(' ')}>
      <div className="layout-header__container width-container">
        {isAuth2 ? (
          <div className="layout-header__logo layout-header__logo--static">
            <img
              className="layout-header__logo-image"
              src="../../../assets/logo-socially.png"
              alt="socially madrid"
            />
          </div>
        ) : (
          <a
            href="#/home-ui"
            className="layout-header__logo-link"
            onClick={handleLogoClick}
          >
            <img
              className="layout-header__logo"
              src="../../../assets/logo-socially.png"
              alt="socially madrid"
            />
          </a>
        )}
        {!isAuth2 && (
        <div className="layout-header__right">
          <button
            type="button"
            className="layout-header__menu-toggle"
            onClick={() => setIsMenuOpen(open => !open)}
          >
            <span className="layout-header__menu-icon" />
          </button>
          <nav id="layout-header-nav" className="layout-header__nav">
            {mainNavLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="layout-header__nav-link"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
            {showLoggedOutAuth && (
              <>
                <a
                  href="#/login-ui"
                  className="layout-header__join-link"
                  onClick={closeMenu}
                >
                  Log In
                </a>
              </>
            )}
          </nav>
          {showProfileLink && (
            <a href="#/one-member-ui" className="layout-header__profile" onClick={closeMenu}>
              <IconUser className="layout-header__profile-icon" />
            </a>
          )}
        </div>
        )}
      </div>
    </header>
  );
}
