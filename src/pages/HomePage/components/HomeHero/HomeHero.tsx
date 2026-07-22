import { forwardRef, useCallback, useRef } from 'react';
import { smoothScrollToSection } from '@src/helpers/smoothScroll';
import { useHeroParallax } from '@src/pages/HomePage/hooks/useHeroParallax';
import { useWordCarousel } from '@src/pages/HomePage/hooks/useWordCarousel';
import './home-hero.css';

const HERO_WORDS = [
  'meaningful ✨',
  'artistic 🎨',
  'philosophical 🎓',
  'wine-loving 🍷',
  'literary 📚',
  'musical 🎷',
  'enigmatic 🌀',
  'wild-camping ⛰️',
  'psychedelic 🍄',
  'culinary 🌮',
  'wizarding 🧙‍♂️',
]; // reflective 🧘‍♀️,

type HomeHeroProps = {
  carouselEnabled?: boolean;
  syncInitialDelayWithEntry?: boolean;
};

export const HomeHero = forwardRef<HTMLElement, HomeHeroProps>(function HomeHero(
  { carouselEnabled = false, syncInitialDelayWithEntry = false },
  forwardedRef,
) {
  const heroRef = useRef<HTMLElement>(null);
  useHeroParallax(heroRef);

  const setHeroRef = useCallback((node: HTMLElement | null) => {
    heroRef.current = node;
    if (typeof forwardedRef === 'function') {
      forwardedRef(node);
    } else if (forwardedRef) {
      forwardedRef.current = node;
    }
  }, [forwardedRef]);

  const intervalMs = 3600;
  const exitMs = 1200;

  const { word, index, outgoingIndex, outgoingWord } = useWordCarousel(HERO_WORDS, {
    intervalMs,
    exitMs,
    initialDelayMs: syncInitialDelayWithEntry ? exitMs : intervalMs,
    isEnabled: carouselEnabled,
  });

  return (
    <>
      <section className="home-hero" id="home-hero" ref={setHeroRef}>
        <div className="home-hero__media">
          <div className="home-hero__overlay" />
        </div>
        <div className="home-hero__content width-container">
          <div className="home-hero__copy">
            <h1 className="home-hero__title">
              A home of{' '}
              <span className="home-hero__word-carousel">
                {outgoingIndex !== null && (
                  <span className="home-hero__word-carousel-item home-hero__word-carousel-item--exiting">
                    {outgoingWord}
                  </span>
                )}
                <span
                  key={index}
                  className="home-hero__word-carousel-item home-hero__word-carousel-item--entering"
                >
                  {word}
                </span>
              </span>{' '}
              communities and events
            </h1>
            <p className="home-hero__subtitle">
              for international residents in Madrid
            </p>
          </div>
          <div className="home-hero__cta-wrap">
            <a
              href="#home-events"
              className="home-hero__cta home-hero__cta--orange"
              onClick={event => {
                event.preventDefault();
                smoothScrollToSection('home-events');
              }}
            >
              Join an event
            </a>
            <a
              href="#home-interests"
              className="home-hero__cta home-hero__cta--purple"
              onClick={event => {
                event.preventDefault();
                smoothScrollToSection('home-interests');
              }}
            >
              Find my people
            </a>
          </div>
        </div>
      </section>
      <div className="home-hero__spacer" />
    </>
  );
});
