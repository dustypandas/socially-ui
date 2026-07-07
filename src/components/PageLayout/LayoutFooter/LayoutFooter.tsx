import { useMemo } from 'react';
import './layout-footer.css';

const FOOTER_ICONS = ['🍷', '🌀', '🍔', '🌈', '🍕', '☕️', '🥦'] as const;

export function LayoutFooter() {
  const year = new Date().getFullYear();
  const icon = useMemo(
    () => FOOTER_ICONS[Math.floor(Math.random() * FOOTER_ICONS.length)],
    [],
  );

  return (
    <footer className="layout-footer">
      <div className="layout-footer__divider" />
      <div className="width-container">
        <p className="layout-footer__text">© {year} - Made with {icon}</p>
      </div>
    </footer>
  );
}
