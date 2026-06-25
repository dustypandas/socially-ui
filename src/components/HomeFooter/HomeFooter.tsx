import { useMemo } from 'react';
import './home-footer.css';

const FOOTER_ICONS = ['🍷', '🌀', '🍔', '🌈', '🍕', '🔥'] as const;

export function HomeFooter() {
  const year = new Date().getFullYear();
  const icon = useMemo(
    () => FOOTER_ICONS[Math.floor(Math.random() * FOOTER_ICONS.length)],
    [],
  );

  return (
    <footer className="home-footer">
      <div className="home-footer__divider" aria-hidden="true" />
      <div className="width-container">
        <p className="home-footer__text">© {year} - Made with {icon}</p>
      </div>
    </footer>
  );
}
