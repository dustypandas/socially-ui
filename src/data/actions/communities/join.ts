import type { MemberQuestionResponse } from '@src/common-libs/types';

export async function joinCommunity(
  communityId: string,
  responses: MemberQuestionResponse[],
): Promise<void> {
  void communityId;
  void responses;
  await new Promise(resolve => setTimeout(resolve, 1000));
}
