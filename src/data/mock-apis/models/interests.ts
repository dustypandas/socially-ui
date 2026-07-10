import {
  externalLinksForOneInterest,
  interests,
  MAX_FOLLOWED_INTERESTS,
  members,
  myFollowedInterests,
  sampleCurrentUser,
} from '../../dummyData.ts';
import type { Interest, Link, MemberFollower } from '../../types.ts';
import { shuffleArray } from './helpers.ts';

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

  for (const interest of selectedInterests) {
    const interestData = tempInterests.find(i => i.label === interest);
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

// mutable, for interests page
let tempFollowedInterests = [...myFollowedInterests];
let tempInterests = [...interests];
let tempInterestExternalLinks = [...externalLinksForOneInterest];

export async function getInterestExternalLinks(): Promise<Link[]> {
  return [...tempInterestExternalLinks];
}

export async function addExternalLink(link: Link): Promise<void> {
  tempInterestExternalLinks = [...tempInterestExternalLinks, link];
}

export async function followInterest(interestName: string): Promise<void> {
  if (
    tempFollowedInterests.includes(interestName)
    || !(await getCanFollowMore())
  ) {
    return;
  }

  tempFollowedInterests = [...tempFollowedInterests, interestName];
}

export async function unfollowInterest(interestName: string): Promise<void> {
  if (!tempFollowedInterests.includes(interestName)) return;

  tempFollowedInterests = tempFollowedInterests.filter(name => name !== interestName);
}

export async function addInterest(newInterest: string): Promise<void> {
  const normalisedLabel = newInterest.trim().toLowerCase();
  if (!normalisedLabel) return;

  const exists = tempInterests.some(i => i.label.toLowerCase() === normalisedLabel);
  if (exists) return;

  tempInterests = [...tempInterests, { label: normalisedLabel, category: 'General', followerIds: [sampleCurrentUser.id] }];
  tempFollowedInterests = [...tempFollowedInterests, normalisedLabel];
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

// export async function getInterests(): Promise<Interest[]> {
//   return [...allInterests];
// }

export async function getCanFollowMore(): Promise<boolean> {
  return tempFollowedInterests.length < MAX_FOLLOWED_INTERESTS;
}

