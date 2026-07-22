import {
  interests,
  MAX_FOLLOWED_INTERESTS,
  members,
} from '../stores/dummyData.ts';
import type { Interest, Link, MemberFollower } from '@src/common-libs/types';
import {
  tempFollowedInterests,
  tempInterestExternalLinks,
  tempInterests,
} from '../stores/interests.ts';
import { shuffleArray } from '@src/common-libs/helpers';

export async function getHomePopularInterests(): Promise<Interest[]> {
  const MAX_HOME_POPULAR_INTERESTS = 12;

  return shuffleArray(
    interests
      .sort((a, b) => (b.followerIds?.length ?? 0) - (a.followerIds?.length ?? 0))
      .slice(0, MAX_HOME_POPULAR_INTERESTS),
  );
}

export async function getInterestsMemberFollowers(selectedInterests: string[]): Promise<MemberFollower[]> {
  const byId = new Map(members.map(member => [member.id, member]));
  const ids = new Set<string>();

  for (const interestLabel of selectedInterests) {
    const interestData = tempInterests.find(i => i.label === interestLabel);
    if (interestData) {
      for (const id of interestData.followerIds ?? []) {
        ids.add(id);
      }
    }
  }

  return [...ids].flatMap(id => {
    const member = byId.get(id);
    return member ? [member] : [];
  });
}

export async function getInterestExternalLinks(): Promise<Link[]> {
  return [...tempInterestExternalLinks];
}

export async function getFilteredInterests(searchQuery: string): Promise<Interest[]> {
  const normalisedQuery = searchQuery.trim().toLowerCase();
  if (!normalisedQuery) return tempInterests;

  return tempInterests.filter(interest =>
    interest.label.toLowerCase().includes(normalisedQuery),
  );
}

export async function getFollowedInterests(): Promise<Interest[]> {
  return tempFollowedInterests.flatMap(label => {
    const interest = tempInterests.find(i => i.label === label);
    return interest ? [interest] : [];
  });
}

export async function getMaxFollowedInterests(): Promise<number> {
  return MAX_FOLLOWED_INTERESTS;
}

export async function getCanFollowMore(): Promise<boolean> {
  return tempFollowedInterests.length < MAX_FOLLOWED_INTERESTS;
}

export async function getOneInterest(): Promise<Interest> {
  return interests.find(interest => interest.label === 'spanish')!;
}
