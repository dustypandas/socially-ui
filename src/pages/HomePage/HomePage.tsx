import { useEffect, useState } from 'react';
import { Layout, LayoutFooter } from '../../components';
import {
  HomeHero,
  InterestsSection,
  EventsSection,
  WhySociallySection,
} from './components';
import { useHeaderScrollCompact } from './hooks/useHeaderScrollCompact';

export function HomePage() {
  const [isEntryRevealed1, setIsEntryRevealed1] = useState(false);
  const [isEntryRevealed2, setIsEntryRevealed2] = useState(false);
  const shouldShowHeader = useHeaderScrollCompact();

  useEffect(() => {
    const timer1 = setTimeout(() => setIsEntryRevealed1(true), 2200);
    const timer2 = setTimeout(() => setIsEntryRevealed2(true), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <Layout
      isHomePage
      isEntryRevealed1={isEntryRevealed1}
      isEntryRevealed2={isEntryRevealed2}
      shouldShowHeader={shouldShowHeader}
    >
      <HomeHero carouselEnabled={isEntryRevealed1} />
      <main className="layout__main">
        <InterestsSection />
        <EventsSection />
        <WhySociallySection />
        {/* <AboutSection /> */}
        <LayoutFooter />
      </main>
    </Layout>
  );
}
