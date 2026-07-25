import './layout-footer.css';

const FOOTER_ICONS = ['🍷', '🌀', '🍔', '🌈', '🍕', '☕️', '🥦'] as const;

export function LayoutFooter() {
  const currDate = new Date();
  const year = currDate.getFullYear();
  const icon = FOOTER_ICONS[currDate.getMinutes() % FOOTER_ICONS.length];

  return (
    <footer className="layout-footer">
      <div className="layout-footer__divider" />
      <div className="width-container">
        <div className="layout-footer__text">© {year} - Made with {icon}</div>
      </div>
    </footer>
  );
}
