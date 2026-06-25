import { LayoutHeader } from '../LayoutHeader/LayoutHeader';
import { LayoutFooter } from '../LayoutFooter/LayoutFooter';
import './layout.css';

type LayoutProps = {
  children?: React.ReactNode;
  isHomePage?: boolean;
  isEntryRevealed1?: boolean;
  isEntryRevealed2?: boolean;
  shouldShowHeader?: boolean;
};

export function Layout({
  children,
  isHomePage = false,
  isEntryRevealed1,
  isEntryRevealed2,
  shouldShowHeader,
}: LayoutProps) {
  const className = isHomePage
    ? [
        'layout',
        isEntryRevealed1 && 'layout--entry-revealed1',
        isEntryRevealed2 && 'layout--entry-revealed2',
        shouldShowHeader && 'layout--show-header',
      ].filter(Boolean).join(' ')
    : 'layout layout--entry-revealed1 layout--entry-revealed2 layout--show-header layout--no-hero';

  return (
    <div className={className}>
      <LayoutHeader />
      {isHomePage ? (
        children
      ) : (
        <>
          <main className="layout__main">{children}</main>
          <LayoutFooter />
        </>
      )}
    </div>
  );
}
