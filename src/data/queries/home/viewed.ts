import {
  tempViewedHomeSections,
  type HomeProfileSectionId,
} from '../../stores/homeProfile.ts';

export type { HomeProfileSectionId };

export async function getViewedHomeSections(): Promise<HomeProfileSectionId[]> {
  return [...tempViewedHomeSections];
}

export async function markHomeSectionViewed(
  sectionId: HomeProfileSectionId,
): Promise<void> {
  if (tempViewedHomeSections.includes(sectionId)) return;

  tempViewedHomeSections.push(sectionId);
}
