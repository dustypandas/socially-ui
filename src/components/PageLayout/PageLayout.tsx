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
  shouldShowHeader,
}: PageLayoutProps) {
  return (
    <div className={[
      'page-layout',
      isHomePage && 'layout--is-home',
      isEventPage && 'layout--is-event',
      isHomePage && shouldShowHeader && 'layout--show-header',
    ].filter(Boolean).join(' ')}>
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
