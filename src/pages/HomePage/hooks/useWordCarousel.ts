import { useEffect, useRef, useState } from 'react';

type WordCarouselOptions = {
  intervalMs?: number;
  exitMs?: number;
  initialDelayMs?: number;
  isEnabled?: boolean;
};

export function useWordCarousel(
  words: string[],
  {
    intervalMs = 3200,
    exitMs = 1200,
    initialDelayMs,
    isEnabled = true,
  }: WordCarouselOptions = {},
) {
  const [index, setIndex] = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const indexRef = useRef(0);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const cancelledRef = useRef(false);
  const isActive = isEnabled && words.length > 0;

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const firstDelay = initialDelayMs ?? exitMs;

    cancelledRef.current = false;

    if (!isActive) {
      indexRef.current = 0;
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
        exitTimeoutRef.current = undefined;
      }
      return () => {
        cancelledRef.current = true;
        clearTimeout(timerRef.current);
        if (exitTimeoutRef.current) {
          clearTimeout(exitTimeoutRef.current);
        }
      };
    }

    function animate() {
      if (cancelledRef.current) return;

      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
      }

      const outgoing = indexRef.current;
      const nextIndex = (outgoing + 1) % words.length;

      setOutgoingIndex(outgoing);
      setIndex(nextIndex);
      indexRef.current = nextIndex;

      exitTimeoutRef.current = setTimeout(() => {
        if (!cancelledRef.current) {
          setOutgoingIndex(null);
        }
      }, exitMs);

      timerRef.current = setTimeout(animate, intervalMs);
    }

    timerRef.current = setTimeout(animate, firstDelay);

    return () => {
      cancelledRef.current = true;
      clearTimeout(timerRef.current);
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
      }
    };
  }, [words.length, intervalMs, exitMs, initialDelayMs, isActive]);

  const displayIndex = isActive ? index : 0;
  const displayOutgoingIndex = isActive ? outgoingIndex : null;

  return {
    word: words[displayIndex] ?? '',
    index: displayIndex,
    outgoingIndex: displayOutgoingIndex,
    outgoingWord: displayOutgoingIndex !== null ? (words[displayOutgoingIndex] ?? '') : '',
  };
}
