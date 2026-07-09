import type { Interest } from '@src/store/slices/interestsSlice';
import type { MemberProfile } from '@src/data';

export function hasExactInterestMatch(interests: Interest[], query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return false;
  return interests.some(interest => interest.name.toLowerCase() === normalized);
}

export function getUniqueMapFollowers(
  followedInterests: Interest[],
  members: MemberProfile[],
): MemberProfile[] {
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
