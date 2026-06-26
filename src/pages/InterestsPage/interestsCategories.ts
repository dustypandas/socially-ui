export const INTEREST_CATEGORY_ORDER = [
  'sport',
  'creative',
  'self-care',
  'other',
  'general',
] as const;

export const INTEREST_CATEGORY_LABELS: Record<string, string> = {
  sport: 'Sport',
  creative: 'Creative',
  'self-care': 'Self Care',
  other: 'Other',
  general: 'General',
};

export const MAX_ITEMS_PER_CATEGORY = 6;
