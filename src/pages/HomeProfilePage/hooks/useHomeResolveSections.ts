import { useCallback, useEffect, useRef, useState } from 'react';
import type { HomeSectionId } from '@src/common-libs/types';
import {
  getResolvedHomeSections,
  resolveHomeSection,
} from '@src/data';

function waitForScrollEnd(onEnd: () => void): () => void {
  const scrollRoot: Window = window;

  if ('ScrollEndEvent' in globalThis) {
    const handler = () => {
      scrollRoot.removeEventListener('scrollend', handler);
      onEnd();
    };
    scrollRoot.addEventListener('scrollend', handler);
    return () => scrollRoot.removeEventListener('scrollend', handler);
  }

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const handler = () => {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      scrollRoot.removeEventListener('scroll', handler);
      onEnd();
    }, 100);
  };

  scrollRoot.addEventListener('scroll', handler, { passive: true });

  return () => {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
    scrollRoot.removeEventListener('scroll', handler);
  };
}

export function useHomeResolveSections(sectionIds: string[]) {
  const [activeSectionId, setActiveSectionId] = useState(sectionIds[0] ?? '');
  const [resolvedSections, setResolvedSections] = useState<Set<HomeSectionId>>(
    new Set(),
  );
  const resolvedSectionsRef = useRef<Set<HomeSectionId>>(new Set());
  const isProgrammaticScrollRef = useRef(false);
  const scrollEndCleanupRef = useRef<(() => void) | null>(null);

  const resolvedActiveSectionId = sectionIds.includes(activeSectionId)
    ? activeSectionId
    : (sectionIds[0] ?? '');

  useEffect(() => {
    resolvedSectionsRef.current = resolvedSections;
  }, [resolvedSections]);

  useEffect(() => {
    getResolvedHomeSections().then((sections) => {
      setResolvedSections(new Set(sections));
    });
  }, []);

  const resolveSection = useCallback(async (sectionId: HomeSectionId) => {
    if (resolvedSectionsRef.current.has(sectionId)) return;

    await resolveHomeSection(sectionId);
    setResolvedSections(current => new Set([...current, sectionId]));
  }, []);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrollRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        if (visibleSections.size === 0) return;

        const nextActive = [...visibleSections.entries()]
          .sort((a, b) => b[1] - a[1])[0]?.[0];

        if (nextActive) {
          setActiveSectionId(nextActive);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrollRef.current) return;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.getAttribute('data-section-id');
          if (!sectionId) return;

          void resolveSection(sectionId as HomeSectionId);
        });
      },
      { threshold: 0 },
    );

    const observeSentinels = () => {
      const sentinels = document.querySelectorAll(
        '.home-profile-page__main .home-profile-section__end[data-section-id]',
      );

      sentinels.forEach((sentinel) => {
        observer.observe(sentinel);
      });
    };

    observeSentinels();
    const frameId = requestAnimationFrame(observeSentinels);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [sectionIds, resolveSection]);

  const navigateToSection = useCallback((sectionId: string) => {
    scrollEndCleanupRef.current?.();
    scrollEndCleanupRef.current = null;

    isProgrammaticScrollRef.current = true;
    setActiveSectionId(sectionId);
    void resolveSection(sectionId as HomeSectionId);

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    scrollEndCleanupRef.current = waitForScrollEnd(() => {
      isProgrammaticScrollRef.current = false;
      scrollEndCleanupRef.current = null;
    });
  }, [resolveSection]);

  useEffect(() => () => {
    scrollEndCleanupRef.current?.();
  }, []);

  const isResolved = useCallback(
    (sectionId: string) => resolvedSections.has(sectionId as HomeSectionId),
    [resolvedSections],
  );

  return {
    activeSectionId: resolvedActiveSectionId,
    navigateToSection,
    isResolved,
  };
}
