import { navLinks } from '../../../data/dummyData.js';
import './layout-header.css';

export function LayoutHeader() {
  return (
    <header className="layout-header">
      <div className='layout-header__entry-logo-container'>
        <div className='layout-header__entry-logo-image' />
      </div>
      <div className="layout-header__container width-container">
        <a href="#/home-ui" className="layout-header__logo-link">
          <img
            className="layout-header__logo"
            src="./assets/logo-socially-v2.png"
            alt="socially madrid"
          />
        </a>
        <div className="layout-header__right">
          <nav className="layout-header__nav" aria-label="Main">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className="layout-header__nav-link">
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
