import type { MemberCommunity, MemberQuestionResponse } from '@src/common-libs/types';
import { communities } from '../../stores/dummyData.ts';
import { tempMemberCommunitiesMap } from '../../stores/userData/index.ts';

export async function joinCommunity(
  communityId: string,
  responses: MemberQuestionResponse[],
): Promise<void> {
  void responses;
  await new Promise(resolve => setTimeout(resolve, 1000));

  const community = communities.find(c => c.id === communityId);
  if (!community) {
    return;
  }

  const existingCommunity = tempMemberCommunitiesMap[communityId];
  if (existingCommunity) {
    existingCommunity.status = 'pending';
    return;
  }

  const engagement: MemberCommunity = {
    id: community.id,
    name: community.name,
    image: community.image,
    href: community.href,
    description: community.description,
    attendedCount: 0,
    hostedCount: 0,
    joinedSince: new Date(),
    lastActivity: new Date(),
    status: 'pending',
  };

  tempMemberCommunitiesMap[communityId] = engagement;
}

export async function leaveCommunity(communityId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  delete tempMemberCommunitiesMap[communityId];
}
