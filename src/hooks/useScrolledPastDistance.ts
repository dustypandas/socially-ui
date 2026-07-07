import { useEffect, useRef, useState, type RefObject } from 'react';

export type ScrolledPastDistanceGetter = (element: HTMLElement) => number;

export type UseScrolledPastDistanceInput =
  | number
  | {
      ref: RefObject<HTMLElement | null>;
      getDistance: ScrolledPastDistanceGetter;
    };

export type UseScrolledPastDistanceOptions = {
  mediaQuery?: string;
};

export function getElementDocumentOffsetTop(element: HTMLElement): number {
  let offsetTop = 0;
  let node: HTMLElement | null = element;

  while (node) {
    offsetTop += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }

  return offsetTop;
}

function resolveDistancePx(
  input: UseScrolledPastDistanceInput,
  cachedDistanceRef: { current: number | undefined },
): number | undefined {
  if (typeof input === 'number') {
    return input;
  }

  if (cachedDistanceRef.current !== undefined) {
    return cachedDistanceRef.current;
  }

  const element = input.ref.current;
  if (!element) {
    return undefined;
  }

  cachedDistanceRef.current = input.getDistance(element);
  return cachedDistanceRef.current;
}

export function useScrolledPastDistance(
  input: UseScrolledPastDistanceInput,
  options?: UseScrolledPastDistanceOptions,
): boolean {
  const [isPast, setIsPast] = useState(false);
  const cachedDistanceRef = useRef<number | undefined>(undefined);
  const inputRef = useRef(input);
  inputRef.current = input;
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const mediaQueryString = optionsRef.current?.mediaQuery;
    const mediaQuery = mediaQueryString
      ? window.matchMedia(mediaQueryString)
      : null;

    const updateIsPast = () => {
      if (mediaQuery && !mediaQuery.matches) {
        setIsPast(prev => (prev ? false : prev));
        return;
      }

      const distancePx = resolveDistancePx(inputRef.current, cachedDistanceRef);
      if (distancePx === undefined) {
        setIsPast(prev => (prev ? false : prev));
        return;
      }

      const past = window.scrollY >= distancePx;
      setIsPast(prev => (prev !== past ? past : prev));
    };

    const handleResize = () => {
      if (typeof inputRef.current === 'object') {
        cachedDistanceRef.current = undefined;
      }
      updateIsPast();
    };

    updateIsPast();
    window.addEventListener('scroll', updateIsPast, { passive: true });
    window.addEventListener('resize', handleResize);
    mediaQuery?.addEventListener('change', updateIsPast);

    return () => {
      window.removeEventListener('scroll', updateIsPast);
      window.removeEventListener('resize', handleResize);
      mediaQuery?.removeEventListener('change', updateIsPast);
    };
  }, []);

  return isPast;
}
