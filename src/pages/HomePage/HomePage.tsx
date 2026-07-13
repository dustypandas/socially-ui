import { useEffect, useRef, useState } from 'react';
import { PageLayout } from '@src/components';
import { getHomePageData, type HomePageData } from '@src/data';
import { useScrolledPastDistance } from '@src/hooks/useScrolledPastDistance';
import { getShouldPlayEntry } from '@src/utils/shouldPlayEntry';
import {
  HomeHero,
  HomeInterests,
  HomeEvents,
  HomeWhySocially,
} from './components';
import './home-page.css';

export function HomePage() {
  // data state
  const [homePageData, setHomePageData] = useState<HomePageData | null>(null);
  // ui-orchestration states
  const [shouldPlayEntry] = useState(() => getShouldPlayEntry());
  const [isEntryRevealed1, setIsEntryRevealed1] = useState(!shouldPlayEntry);
  const [isEntryRevealed2, setIsEntryRevealed2] = useState(!shouldPlayEntry);
  const [isEntryRevealed3, setIsEntryRevealed3] = useState(!shouldPlayEntry);
  const heroRef = useRef<HTMLElement>(null);
  const shouldShowHeader = useScrolledPastDistance({
    ref: heroRef,
    getDistance: (hero) => hero.offsetHeight,
  });

  useEffect(() => {
    getHomePageData().then(setHomePageData);
  }, []);

  useEffect(() => {
    if (!shouldPlayEntry) return;

    const timer1 = setTimeout(() => setIsEntryRevealed1(true), 2200); // 1.2s reveal
    const timer2 = setTimeout(() => setIsEntryRevealed2(true), 2800);
    const timer3 = setTimeout(() => setIsEntryRevealed3(true), 3400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [shouldPlayEntry]);

  if (!homePageData) {
    return null;
  }

  return (
    <PageLayout
      isHomePage
      shouldShowHomePageHeader={shouldShowHeader}
      shouldShowHomePageFooter={isEntryRevealed3}
    >
      <div className={[
        'home__entry-cover',
        isEntryRevealed1 && 'home-page--entry-revealed1',
        isEntryRevealed3 && 'home-page--entry-revealed3',
      ].filter(Boolean).join(' ')}>
        <div className="home__entry-logo-image" />
      </div>
      <div id="home-top" />
      <HomeHero
        ref={heroRef}
        carouselEnabled={isEntryRevealed2}
        syncInitialDelayWithEntry={shouldPlayEntry}
      />
      <main className="layout__main">
        <section className={[
          'home-page',
          isEntryRevealed1 && 'home-page--entry-revealed1',
          isEntryRevealed2 && 'home-page--entry-revealed2',
        ].filter(Boolean).join(' ')}>
          <HomeInterests popularInterests={homePageData.popularInterests} />
          <HomeEvents upcomingEvents={homePageData.upcomingEvents} />
          <HomeWhySocially />
          {/* <HomeAbout /> */}
        </section>
      </main>
    </PageLayout>
  );
}
