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

  indexRef.current = index;

  useEffect(() => {
    const firstDelay = initialDelayMs ?? exitMs;

    cancelledRef.current = false;

    if (!isEnabled || words.length === 0) {
      setIndex(0);
      setOutgoingIndex(null);
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
  }, [words.length, intervalMs, exitMs, initialDelayMs, isEnabled]);

  return {
    word: words[index] ?? '',
    index,
    outgoingIndex,
    outgoingWord: outgoingIndex !== null ? (words[outgoingIndex] ?? '') : '',
  };
}
