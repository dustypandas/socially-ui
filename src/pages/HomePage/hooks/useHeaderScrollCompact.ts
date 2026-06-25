import { useEffect, useState } from 'react';

function getHeroHeightPx() {
  const heroEl = document.querySelector('.home-hero');
  return heroEl instanceof HTMLElement ? heroEl.offsetHeight : 0;
}

export function useHeaderScrollCompact() {
  const [shouldShowHeader, setShouldShowHeader] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      const heroHeight = getHeroHeightPx();
      if (heroHeight === 0) {
        return;
      }

      const scrolled = window.scrollY > heroHeight;
      setShouldShowHeader(prev => (prev !== scrolled ? scrolled : prev));
    };

    handleUpdate();
    window.addEventListener('scroll', handleUpdate, { passive: true });
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate);
      window.removeEventListener('resize', handleUpdate);
    };
  }, []);

  return shouldShowHeader;
}
