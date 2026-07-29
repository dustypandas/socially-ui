import './home-profile-nav.css';

export type HomeProfileNavItem = {
  id: string;
  label: string;
  count?: number;
};

type HomeProfileNavProps = {
  firstName: string;
  items: HomeProfileNavItem[];
  activeSectionId: string;
  onNavigate: (sectionId: string) => void;
};

export function HomeProfileNav({
  firstName,
  items,
  activeSectionId,
  onNavigate,
}: HomeProfileNavProps) {
  return (
    <nav className="home-profile-nav">
      <p className="home-profile-nav__welcome">
        Welcome back, {firstName}
      </p>
      <ul className="home-profile-nav__list">
        {items.map(item => (
          <li key={item.id} className="home-profile-nav__item">
            <a
              href={`#${item.id}`}
              className={[
                'home-profile-nav__link',
                activeSectionId === item.id && 'home-profile-nav__link--active',
              ].filter(Boolean).join(' ')}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(item.id);
              }}
            >
              <span className="home-profile-nav__link-label">{item.label}</span>
              {item.count !== undefined && item.count > 0 && (
                <span className="home-profile-nav__badge">{item.count}</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
