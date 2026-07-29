import { useCallback, useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeSectionId, setActiveSectionId] = useState(sectionIds[0] ?? '');

  const resolvedActiveSectionId = sectionIds.includes(activeSectionId)
    ? activeSectionId
    : (sectionIds[0] ?? '');

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
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

  const navigateToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setActiveSectionId(sectionId);
  }, []);

  return { activeSectionId: resolvedActiveSectionId, navigateToSection };
}
