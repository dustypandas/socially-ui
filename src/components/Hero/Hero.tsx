import { useWordCarousel } from '../../hooks/useWordCarousel';
import './hero.css';

const HERO_WORDS = ['meaningful ✨', 'artistic 🎨', 'philosophical 🎓', 'wine-loving 🍷', 'literary 📚', 'musical 🎷', 'enigmatic 🌀', 'psychedelic 🍄', 'wild-camping ⛰️', 'culinary 🌮', 'reflective 🧘‍♀️'];

export function Hero() {
  const { word, index, outgoingIndex, outgoingWord } = useWordCarousel(HERO_WORDS, {
    intervalMs: 4000,
    exitMs: 1200,
  });

  return (
    <section className="home-hero">
      <div className="home-hero__overlay" />
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
          <a href="#" className="home-hero__cta home-hero__cta--orange">
            Join an event
          </a>
          <a href="#" className="home-hero__cta home-hero__cta--purple">
            Find my people
          </a>
        </div>
      </div>
    </section>
  );
}
