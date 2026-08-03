import { HomeSectionId } from '@src/common-libs/types/pages.ts';
import {
  tempResolvedHomeSections,
} from '../stores/userData/index.ts';
  
export async function getResolvedHomeSections(): Promise<HomeSectionId[]> {
  return [...tempResolvedHomeSections];
}
  
export async function resolveHomeSection(
  sectionId: HomeSectionId,
): Promise<void> {
  if (tempResolvedHomeSections.includes(sectionId)) return;
  
  tempResolvedHomeSections.push(sectionId);
}
  