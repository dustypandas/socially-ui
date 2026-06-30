import { useRef } from 'react';
import { smoothScrollToSection } from '../../../../utils/smoothScroll';
import { useHeroParallax } from '../../hooks/useHeroParallax';
import { useWordCarousel } from '../../hooks/useWordCarousel';
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
};

export function HomeHero({ carouselEnabled = false }: HomeHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  useHeroParallax(heroRef);

  const { word, index, outgoingIndex, outgoingWord } = useWordCarousel(HERO_WORDS, {
    intervalMs: 4000,
    exitMs: 1200,
    isEnabled: carouselEnabled,
  });

  return (
    <>
      <section className="home-hero" id="home-hero" ref={heroRef}>
        <div className="home-hero__media" aria-hidden="true">
          <div className="home-hero__overlay" />
        </div>
        <div className="home-hero__content width-container">
          <div className="home-hero__copy">
            <h1 className="home-hero__title">
              A home of{' '}
              <span className="home-hero__word-carousel" aria-live="polite">
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
          <div className="home-hero__actions">
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
      <div className="home-hero__spacer" aria-hidden="true" />
    </>
  );
}
