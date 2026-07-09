import type { CommunityScope } from '@src/data';

export const COMMUNITY_SCOPE_OPTIONS: { value: CommunityScope; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'mine', label: 'My Communities' },
  { value: 'interests', label: 'Of My Interests' },
];
