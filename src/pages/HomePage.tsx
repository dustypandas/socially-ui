import { useEffect, useState } from 'react';
import {
  EventsSection,
  Header,
  Hero,
  HomeFooter,
  InterestsSection,
  AboutSection,
} from '../components';
import { useHeaderScrollCompact } from '../hooks/useHeaderScrollCompact';
import './home-page.css';

export function HomePage() {
  const [isRevealed1, setIsRevealed1] = useState(false);
  const [isRevealed2, setIsRevealed2] = useState(false);
  const isHeaderScrolled = useHeaderScrollCompact();

  useEffect(() => {
    const timer1 = setTimeout(() => setIsRevealed1(true), 2200);
    const timer2 = setTimeout(() => setIsRevealed2(true), 4000);
    // const timer1 = setTimeout(() => {}, 3000);
    // const timer2 = setTimeout(() => {}, 4600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className={[
      'home-page',
      isRevealed1 && 'home-page--revealed1',
      isRevealed2 && 'home-page--revealed2',
      isHeaderScrolled && 'home-page--header-scrolled',
    ].filter(Boolean).join(' ')}>
      <Header />
      <Hero carouselEnabled={isRevealed2} />
      <main className="home-page__main">
        <InterestsSection />
        <EventsSection />
        <AboutSection />
        <HomeFooter />
      </main>
    </div>
  );
}
