import { useCallback, useEffect, useMemo, useState } from 'react';
import { MAX_FOLLOWED_INTERESTS } from '@src/data/dummyData.ts';
import {
  followInterest,
  getFollowedInterests,
  getInterestsMapFollowers,
  unfollowInterest,
} from '@src/data';
import type { MemberProfile } from '@src/data';
import type { Interest } from '@src/store/slices/interestsSlice';

export function useFollowedInterests(interests: Interest[]) {
  const [followedInterests, setFollowedInterests] = useState<string[]>([]);
  const [memberFollowers, setMemberFollowers] = useState<MemberProfile[]>([]);

  useEffect(() => {
    getFollowedInterests().then(setFollowedInterests);
  }, []);

  const dummyFollowedInterests = useMemo(
    () => interests.filter(interest => followedInterests.includes(interest.name)),
    [interests, followedInterests],
  );

  useEffect(() => {
    if (dummyFollowedInterests.length === 0) {
      setMemberFollowers([]);
      return;
    }

    getInterestsMapFollowers(dummyFollowedInterests).then(setMemberFollowers);
  }, [dummyFollowedInterests]);

  const dummyFollowInterest = useCallback(async (interestName: string) => {
    await followInterest(interestName);
    setFollowedInterests(await getFollowedInterests());
  }, []);

  const dummyUnfollowInterest = useCallback(async (interestName: string) => {
    await unfollowInterest(interestName);
    setFollowedInterests(await getFollowedInterests());
  }, []);

  return {
    followedInterests,
    dummyFollowedInterests,
    memberFollowers,
    dummyFollowInterest,
    dummyUnfollowInterest,
    dummyMaxFollowed: MAX_FOLLOWED_INTERESTS,
    canDummyFollowMore: followedInterests.length < MAX_FOLLOWED_INTERESTS,
  };
}
