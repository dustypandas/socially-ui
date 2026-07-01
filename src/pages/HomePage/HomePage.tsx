import { useEffect, useRef, useState } from 'react';
import { PageLayout, LayoutFooter } from '../../components';
import {
  HomeHero,
  InterestsSection,
  EventsSection,
  WhySociallySection,
} from './components';
import { useHeaderScrollCompact } from './hooks/useHeaderScrollCompact';
import { getShouldPlayEntry } from '../../utils/shouldPlayEntry';
import './home-page.css';

export function HomePage() {
  const shouldPlayEntry = useRef(getShouldPlayEntry()).current;
  const [isEntryRevealed1, setIsEntryRevealed1] = useState(!shouldPlayEntry);
  const [isEntryRevealed2, setIsEntryRevealed2] = useState(!shouldPlayEntry);
  const [isEntryRevealed3, setIsEntryRevealed3] = useState(!shouldPlayEntry);
  const shouldShowHeader = useHeaderScrollCompact();

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

  return (
    <PageLayout
      isHomePage
      shouldShowHeader={shouldShowHeader}
    >
      <div className={[
        'home__entry-cover',
        isEntryRevealed1 && 'home-page--entry-revealed1',
        isEntryRevealed3 && 'home-page--entry-revealed3',
      ].filter(Boolean).join(' ')} aria-hidden="true">
        <div className="home__entry-logo-image" />
      </div>
      <div id="home-top" />
      <HomeHero carouselEnabled={isEntryRevealed2} syncInitialDelayWithEntry={shouldPlayEntry} />
      <main className="layout__main">
        <section className={[
          'home-page',
          isEntryRevealed1 && 'home-page--entry-revealed1',
          isEntryRevealed2 && 'home-page--entry-revealed2',
        ].filter(Boolean).join(' ')}>        
          <InterestsSection />
          <EventsSection />
          <WhySociallySection />
          {/* <AboutSection /> */}
          <LayoutFooter />
        </section>
      </main>
    </PageLayout>
  );
}

