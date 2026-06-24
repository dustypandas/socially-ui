import { useEffect, useRef, useState } from 'react';

type WordCarouselOptions = {
  intervalMs?: number;
  exitMs?: number;
};

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useWordCarousel(
  words: string[],
  { intervalMs = 5000, exitMs = 1200 }: WordCarouselOptions = {},
) {
  const [index, setIndex] = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(prefersReducedMotion);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = () => {
      setIsPaused(mediaQuery.matches);
      if (mediaQuery.matches) {
        setIndex(0);
        setOutgoingIndex(null);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (words.length === 0 || isPaused) {
      return;
    }

    const intervalId = setInterval(() => {
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
      }

      setIndex(prev => {
        setOutgoingIndex(prev);
        return (prev + 1) % words.length;
      });

      exitTimeoutRef.current = setTimeout(() => {
        setOutgoingIndex(null);
      }, exitMs);
    }, intervalMs);

    return () => {
      clearInterval(intervalId);
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
      }
    };
  }, [words.length, intervalMs, exitMs, isPaused]);

  return {
    word: words[index] ?? '',
    index,
    outgoingIndex,
    outgoingWord: outgoingIndex !== null ? (words[outgoingIndex] ?? '') : '',
  };
}
