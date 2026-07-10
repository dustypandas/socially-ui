import type { Interest, InterestCategoryGroup } from '@src/data';

export function groupInterestsByCategory(interests: Interest[]): InterestCategoryGroup[] {
  const grouped = new Map<string, Interest[]>();

  for (const interest of interests) {
    const category = interest.category ?? 'general';
    const items = grouped.get(category) ?? [];
    items.push(interest);
    grouped.set(category, items);
  }

  return [...grouped.entries()]
    .map(([category, items]) => ({
      category,
      items: [...items]
        .sort((a, b) => (b.followerIds?.length ?? 0) - (a.followerIds?.length ?? 0))
        .slice(0, getMaxItemsForCategory(category)),
      totalFollowers: items.reduce((sum, i) => sum + (i.followerIds?.length ?? 0), 0),
    }))
    .sort((a, b) => {
      const aGeneral = a.category.toLowerCase() === 'general';
      const bGeneral = b.category.toLowerCase() === 'general';
      if (aGeneral !== bGeneral) return aGeneral ? 1 : -1;
      return b.totalFollowers - a.totalFollowers || a.category.localeCompare(b.category);
    })
    .map(({ category, items }) => ({ category, items }));

  function getMaxItemsForCategory(category: string): number {
    const MAX_ITEMS_PER_GROUP = 6;
    const MAX_GENERAL_ITEMS = 12;
  
    return category.toLowerCase() === 'general' ? MAX_GENERAL_ITEMS : MAX_ITEMS_PER_GROUP;
  }
}

export function hasExactInterestMatch(interests: Interest[], query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return false;
  return interests.some(interest => interest.label.toLowerCase() === normalized);
}
