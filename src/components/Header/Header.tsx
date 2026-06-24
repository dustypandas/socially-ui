import { navLinks } from '../../data/dummyData.js';
import './header.css';

export function Header() {
  return (
    <header className="home-header">
      <div className='home-header__entry-logo-container'>
        <div className='home-header__entry-logo-image' />
      </div>
      <div className="home-header__container width-container">
        <a href="#/home-ui" className="home-header__logo-link">
          <img
            className="home-header__logo"
            src="./assets/logo-socially-v2.png"
            alt="socially madrid"
          />
        </a>
        <div className="home-header__right">
          <nav className="home-header__nav" aria-label="Main">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className="home-header__nav-link">
                {link.label}
              </a>
            ))}
          </nav>
          {/* <a href="#" className="home-header__profile" aria-label="Profile">
            <IconUser className="home-header__profile-icon" />
          </a> */}
        </div>
      </div>
    </header>
  );
}
