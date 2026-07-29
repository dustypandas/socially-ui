import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getViewedHomeSections,
  markHomeSectionViewed,
  type HomeProfileSectionId,
} from '@src/data';

export function useSectionViewed(sectionIds: string[]) {
  const [viewedSections, setViewedSections] = useState<Set<HomeProfileSectionId>>(
    new Set(),
  );
  const viewedSectionsRef = useRef<Set<HomeProfileSectionId>>(new Set());

  useEffect(() => {
    viewedSectionsRef.current = viewedSections;
  }, [viewedSections]);

  useEffect(() => {
    getViewedHomeSections().then((sections) => {
      setViewedSections(new Set(sections));
    });
  }, []);

  const markViewed = useCallback(async (sectionId: HomeProfileSectionId) => {
    if (viewedSectionsRef.current.has(sectionId)) return;

    await markHomeSectionViewed(sectionId);
    setViewedSections(current => new Set([...current, sectionId]));
  }, []);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.getAttribute('data-section-id');
          if (!sectionId) return;

          void markViewed(sectionId as HomeProfileSectionId);
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
  }, [sectionIds, markViewed]);

  const isViewed = useCallback(
    (sectionId: string) => viewedSections.has(sectionId as HomeProfileSectionId),
    [viewedSections],
  );

  return { isViewed };
}
