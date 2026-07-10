import type { Interest } from '@src/store/slices/interestsSlice';

export function hasExactInterestMatch(interests: Interest[], query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return false;
  return interests.some(interest => interest.name.toLowerCase() === normalized);
}
