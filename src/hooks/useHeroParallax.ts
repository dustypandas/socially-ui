import { useEffect, type RefObject } from 'react';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getHeroHeight(heroEl: HTMLElement) {
  const spacer = heroEl.nextElementSibling;
  if (spacer instanceof HTMLElement && spacer.classList.contains('home-hero__spacer')) {
    return spacer.offsetHeight;
  }
  return heroEl.offsetHeight;
}

function updateHeroScroll(heroEl: HTMLElement) {
  const heroHeight = getHeroHeight(heroEl);
  const scroll = Math.min(window.scrollY, heroHeight);
  heroEl.style.setProperty('--hero-scroll', `${scroll}px`);
}

export function useHeroParallax(heroRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl || prefersReducedMotion()) {
      return;
    }

    const handleUpdate = () => {
      updateHeroScroll(heroEl);
    };

    handleUpdate();
    window.addEventListener('scroll', handleUpdate, { passive: true });
    window.addEventListener('resize', handleUpdate);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => {
      if (mediaQuery.matches) {
        heroEl.style.removeProperty('--hero-scroll');
        window.removeEventListener('scroll', handleUpdate);
        window.removeEventListener('resize', handleUpdate);
      }
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('scroll', handleUpdate);
      window.removeEventListener('resize', handleUpdate);
      mediaQuery.removeEventListener('change', handleMotionChange);
      heroEl.style.removeProperty('--hero-scroll');
    };
  }, [heroRef]);
}
