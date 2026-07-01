import { useEffect, useRef, useState } from 'react';

type WordCarouselOptions = {
  intervalMs?: number;
  exitMs?: number;
  isEnabled?: boolean;
};

export function useWordCarousel(
  words: string[],
  { intervalMs = 2800, exitMs = 1200, isEnabled = true }: WordCarouselOptions = {},
) {
  const [index, setIndex] = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!isEnabled || words.length === 0) {
      setIndex(0);
      setOutgoingIndex(null);
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
        exitTimeoutRef.current = undefined;
      }
      return;
    }

    let timerId: ReturnType<typeof setTimeout> | undefined = undefined;
    setTimeout(function animate() {
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

      timerId = setTimeout(animate, intervalMs);
    }, exitMs); // 1.2s time for header slide up

    return () => {
      clearTimeout(timerId);
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
      }
    };
  }, [words.length, intervalMs, exitMs, isEnabled]);

  return {
    word: words[index] ?? '',
    index,
    outgoingIndex,
    outgoingWord: outgoingIndex !== null ? (words[outgoingIndex] ?? '') : '',
  };
}
