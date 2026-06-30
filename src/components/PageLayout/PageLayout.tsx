import { LayoutHeader } from './LayoutHeader/LayoutHeader';
import { LayoutFooter } from './LayoutFooter/LayoutFooter';
import './page-layout.css';

type PageLayoutProps = {
  children?: React.ReactNode;
  isHomePage?: boolean;
  isEventPage?: boolean;
  isEntryRevealed1?: boolean;
  isEntryRevealed2?: boolean;
  shouldShowHeader?: boolean;
};

export function PageLayout({
  children,
  isHomePage = false,
  isEventPage = false,
  isEntryRevealed1,
  isEntryRevealed2,
  shouldShowHeader,
}: PageLayoutProps) {
  const className = [
    'page-layout',
    isHomePage && 'layout-is-home',
    isEventPage && 'layout-is-event',
    isHomePage && isEntryRevealed1 && 'layout--entry-revealed1',
    isHomePage && isEntryRevealed2 && 'layout--entry-revealed2',
    isHomePage && shouldShowHeader && 'layout--show-header',
  ].filter(Boolean).join(' ');

  return (
    <div className={className}>
      <LayoutHeader isHomePage={isHomePage} />
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
