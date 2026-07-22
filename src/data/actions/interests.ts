import { currentUser } from '../stores/dummyData.ts';
import type { Link } from '@src/common-libs/types';
import { getCanFollowMore } from '../queries/interests.ts';
import {
  tempFollowedInterests,
  tempInterestExternalLinks,
  tempInterests,
} from '../stores/interests.ts';

export async function addExternalLink(link: Link): Promise<void> {
  tempInterestExternalLinks.splice(
    0,
    tempInterestExternalLinks.length,
    ...[...tempInterestExternalLinks, link],
  );
}

export async function followInterest(interestLabel: string): Promise<void> {
  if (
    tempFollowedInterests.includes(interestLabel)
    || !(await getCanFollowMore())
  ) {
    return;
  }

  tempFollowedInterests.push(interestLabel);
}

export async function unfollowInterest(interestName: string): Promise<void> {
  if (!tempFollowedInterests.includes(interestName)) return;

  const next = tempFollowedInterests.filter(name => name !== interestName);
  tempFollowedInterests.splice(0, tempFollowedInterests.length, ...next);
}

export async function addInterest(newInterest: string): Promise<void> {
  const normalisedLabel = newInterest.trim().toLowerCase();
  if (!normalisedLabel) return;

  const exists = tempInterests.some(i => i.label.toLowerCase() === normalisedLabel);
  if (exists) return;

  tempInterests.push({
    label: normalisedLabel,
    category: 'General',
    followerIds: [currentUser.id],
  });
  tempFollowedInterests.push(normalisedLabel);
}
