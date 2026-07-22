import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { markRouteLoaded } from '@src/helpers/shouldPlayEntry';
import { LayoutHeader, type LayoutHeaderVariant } from './LayoutHeader/LayoutHeader';
import { LayoutFooter } from './LayoutFooter/LayoutFooter';
import './page-layout.css';

type PageLayoutProps = {
  children?: React.ReactNode;
  isHomePage?: boolean;
  isEntryRevealed1?: boolean;
  isEntryRevealed2?: boolean;
  shouldShowHomePageHeader?: boolean;
  shouldShowHomePageFooter?: boolean;
  hasStaticHeader?: boolean;
  headerVariant?: LayoutHeaderVariant;
};

export function PageLayout({
  children,
  isHomePage = false,
  hasStaticHeader = false,
  shouldShowHomePageHeader,
  shouldShowHomePageFooter,
  headerVariant = 'loggedOut',
}: PageLayoutProps) {
  const { pathname } = useLocation();

  // scroll to top whenever new route is loaded
  useEffect(() => {
    window.scrollTo(0, 0);
    markRouteLoaded();
  }, [pathname]);

  return (
    <div className={[
      'page-layout',
      isHomePage && 'layout--is-home',
      isHomePage && shouldShowHomePageHeader && 'layout--show-home-page-header',
      isHomePage && shouldShowHomePageFooter && 'layout--show-home-page-footer',
      hasStaticHeader && 'layout--has-static-header',
    ].filter(Boolean).join(' ')}>
      <LayoutHeader isHomePage={isHomePage} variant={headerVariant} />
      {isHomePage ? (
        children
      ) : (
        <main className="layout__main">{children}</main>
      )}
      <LayoutFooter />
    </div>
  );
}
