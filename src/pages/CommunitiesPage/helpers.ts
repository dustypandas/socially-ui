import type { Community } from '../../data/dummyData';

export type CommunityScope = 'all' | 'mine' | 'interests';

export const COMMUNITY_SCOPE_OPTIONS: { value: CommunityScope; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'mine', label: 'My Communities' },
  { value: 'interests', label: 'Of My Interests' },
];

export function filterCommunities(communities: Community[], query: string): Community[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return communities;

  return communities.filter(community =>
    community.name.toLowerCase().includes(normalized)
    || community.description?.toLowerCase().includes(normalized)
    || community.interests?.some(interest => interest.toLowerCase().includes(normalized)),
  );
}
