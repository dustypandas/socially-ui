import { useEffect, type RefObject } from 'react';

function getHeroHeight(heroEl: HTMLElement) {
  const spacer = heroEl.nextElementSibling;
  // if (spacer instanceof HTMLElement && spacer.classList.contains('home-hero__spacer')) {
  if (spacer instanceof HTMLElement && spacer.classList.contains('home-hero')) {
    return spacer.offsetHeight;
  }
  return heroEl.offsetHeight;
}

function updateHeroScroll(heroEl: HTMLElement) {
  const heroHeight = getHeroHeight(heroEl);
  console.log('hello 0: ', window.scrollY, heroHeight);
  const scroll = Math.min(window.scrollY, heroHeight);
  heroEl.style.setProperty('--hero-scroll', `${scroll}px`);
}

export function useHeroParallax(heroRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) {
      return;
    }

    const handleUpdate = () => {
      updateHeroScroll(heroEl);
    };

    handleUpdate();
    window.addEventListener('scroll', handleUpdate, { passive: true });
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate);
      window.removeEventListener('resize', handleUpdate);
      heroEl.style.removeProperty('--hero-scroll');
    };
  }, [heroRef]);
}
