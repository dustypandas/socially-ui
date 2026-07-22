import {
  communities,
  communitiesForOneInterest,
  communityForOneEvent,
  myCommunityIds,
} from '../stores/dummyData.ts';
import { getFollowedInterests } from './interests.ts';
import type { CommunityAvatar, CommunityBasic } from '@src/common-libs/types';
import type { CommunityScope } from '@src/common-libs/helpers';

export async function getFilteredCommunities(
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

export async function getCommunitiesForOneInterest(): Promise<CommunityBasic[]> {
  return communitiesForOneInterest;
}

export async function getCommunityForOneEvent(): Promise<CommunityAvatar> {
  return communityForOneEvent;
}

export async function getOneCommunity(): Promise<CommunityBasic> {
  return communities.find(community => community.id === 'polylogue-madrid')!;
}
