import type { CommunityEngagement, MemberQuestionResponse } from '@src/common-libs/types';
import { communities } from '../../stores/dummyData.ts';
import { tempCommunityEngagementsMap } from '../../stores/userData/index.ts';

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

  const existing = tempCommunityEngagementsMap[communityId];
  if (existing) {
    existing.status = 'pending';
    return;
  }

  const engagement: CommunityEngagement = {
    id: community.id,
    name: community.name,
    image: community.image,
    href: community.href,
    description: community.description,
    attendedCount: 0,
    hostedCount: 0,
    joinedSince: new Date(),
    status: 'pending',
  };

  tempCommunityEngagementsMap[communityId] = engagement;
}

export async function leaveCommunity(communityId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  delete tempCommunityEngagementsMap[communityId];
}
