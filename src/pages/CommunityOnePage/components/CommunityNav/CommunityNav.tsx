import './community-nav.css';

const NAV_LINKS = ['About', 'Events', 'Members', 'Links'] as const;

export function CommunityNav() {
  return (
    <nav className="community-nav" aria-label="Community sections">
      <div className="width-container community-nav__container">
        <div className="community-nav__links">
          {NAV_LINKS.map(label => (
            <a key={label} href="#" className="community-nav__link">
              {label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="global-btn global-btn--purple-white community-nav__follow-btn"
        >
          Join this community
        </button>
      </div>
      <div className="global__page-divider community-nav__divider" />
    </nav>
  );
}
