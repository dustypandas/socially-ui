import type { Interest } from '../../store/slices/interestsSlice';
import type { MemberFollower } from '../../data/dummyData';

export function hasExactInterestMatch(interests: Interest[], query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return false;
  return interests.some(interest => interest.name.toLowerCase() === normalized);
}

function slugifyInterestName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'interest';
}

export function createInterestId(name: string, existingIds: Set<string>): string {
  const baseId = slugifyInterestName(name);
  if (!existingIds.has(baseId)) {
    return baseId;
  }

  let suffix = 2;
  while (existingIds.has(`${baseId}-${suffix}`)) {
    suffix += 1;
  }

  return `${baseId}-${suffix}`;
}

export function getUniqueMapFollowers(
  followedInterests: Interest[],
  members: MemberFollower[],
): MemberFollower[] {
  const byId = new Map(members.map(member => [member.id, member]));
  const ids = new Set<string>();

  for (const interest of followedInterests) {
    for (const id of interest.followerIds ?? []) {
      ids.add(id);
    }
  }

  return [...ids].flatMap(id => {
    const member = byId.get(id);
    return member ? [member] : [];
  });
}