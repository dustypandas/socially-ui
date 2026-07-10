import {
  communities,
  communitiesForOneInterest,
  myCommunityIds,
} from '../../dummyData.ts';
import { getFollowedInterests } from './interests.ts';
import type { CommunityBasic } from '../../types.ts';

export type CommunityScope = 'all' | 'mine' | 'interests';

export async function getCommunities(
  searchQuery: string,
  communityScope: CommunityScope,
): Promise<CommunityBasic[]> {

  return filterCommunities(
    await getScopedCommunities(communityScope),
    searchQuery
  );

  function filterCommunities(communities: CommunityBasic[], query: string): CommunityBasic[] {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return communities;

      return communities.filter(community => {
      if (community.name.toLowerCase().includes(query)) return true;
      if (community.description?.toLowerCase().includes(query)) return true;
      // if (community.interests?.some(interest => interest.toLowerCase().includes(query))) return true;
      return false;
    });
  }

  async function getScopedCommunities(communityScope: CommunityScope): Promise<CommunityBasic[]> {
    if (communityScope === 'all') return communities;
  
    if (communityScope === 'mine') {
      const joined = new Set(myCommunityIds);
      return communities.filter(community => joined.has(community.id));
    }
  
    const followed = new Set((await getFollowedInterests()).map(interest => interest.label.toLowerCase()));
    return communities.filter(community =>
      community.interests?.some(tag => followed.has(tag.toLowerCase())),
    );
  }
}

export async function getCommunitiesForInterest(): Promise<CommunityBasic[]> {
  return communitiesForOneInterest;
}