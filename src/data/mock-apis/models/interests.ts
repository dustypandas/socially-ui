import {
  interests,
  MAX_FOLLOWED_INTERESTS,
  members,
  myFollowedInterests,
} from '../../dummyData.ts';
import type { Interest, MemberFollower } from '../../types.ts';
import { shuffleArray } from './helpers.ts';

let followedInterestNames = [...myFollowedInterests];

export async function getFollowedInterests(): Promise<string[]> {
  return [...followedInterestNames];
}

export async function followInterest(interestName: string): Promise<void> {
  if (
    followedInterestNames.includes(interestName)
    || followedInterestNames.length >= MAX_FOLLOWED_INTERESTS
  ) {
    return;
  }

  followedInterestNames = [...followedInterestNames, interestName];
}

export async function unfollowInterest(interestName: string): Promise<void> {
  if (!followedInterestNames.includes(interestName)) return;

  followedInterestNames = followedInterestNames.filter(name => name !== interestName);
}

export async function getInterestsMapFollowers(interests: Interest[]): Promise<MemberFollower[]> {
  const byId = new Map(members.map(member => [member.id, member]));
  const ids = new Set<string>();

  for (const interest of interests) {
    for (const id of interest.followerIds ?? []) {
      ids.add(id);
    }
  }

  return [...ids].flatMap(id => {
    const member = byId.get(id);
    return member ? [member] : [];
  });
}

export async function getHomePopularInterests(): Promise<Interest[]> {
  const MAX_HOME_POPULAR_INTERESTS = 12;

  return shuffleArray(
    [...interests]
      .sort((a, b) => (b.followerIds?.length ?? 0) - (a.followerIds?.length ?? 0))
      .slice(0, MAX_HOME_POPULAR_INTERESTS),
  );
}
