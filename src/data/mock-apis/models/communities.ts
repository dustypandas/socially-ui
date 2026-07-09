import {
  communities,
  myCommunityIds,
  sampleFullCommunity,
} from '../../dummyData.ts';
import { getFollowedInterests } from './interests.ts';
import type { Community, CommunityPageData } from '../../types.ts';

export type CommunityScope = 'all' | 'mine' | 'interests';

function filterCommunities(communities: Community[], query: string): Community[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return communities;

  return communities.filter(community =>
    community.name.toLowerCase().includes(normalized)
    || community.description?.toLowerCase().includes(normalized)
    || community.interests?.some(interest => interest.toLowerCase().includes(normalized)),
  );
}

async function getScopedCommunities(communityScope: CommunityScope): Promise<Community[]> {
  if (communityScope === 'all') return communities;

  if (communityScope === 'mine') {
    const joined = new Set(myCommunityIds);
    return communities.filter(community => joined.has(community.id));
  }

  const followed = new Set((await getFollowedInterests()).map(interest => interest.toLowerCase()));
  return communities.filter(community =>
    community.interests?.some(tag => followed.has(tag.toLowerCase())),
  );
}

export async function getCommunities(
  searchQuery: string,
  communityScope: CommunityScope,
): Promise<Community[]> {
  return filterCommunities(await getScopedCommunities(communityScope), searchQuery);
}
