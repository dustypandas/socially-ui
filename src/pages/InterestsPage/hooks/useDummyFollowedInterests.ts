import { useCallback, useMemo, useState } from 'react';
import { followedInterestIds, MAX_FOLLOWED_INTERESTS } from '@src/data/dummyData.js';
import type { Interest } from '@src/store/slices/interestsSlice';

export function useDummyFollowedInterests(interests: Interest[]) {
  const [dummyFollowedIds, setDummyFollowedIds] = useState(
    () => [...followedInterestIds],
  );

  const dummyFollowedInterests = useMemo(
    () => interests.filter(interest => dummyFollowedIds.includes(interest.id)),
    [interests, dummyFollowedIds],
  );

  const dummyFollowInterest = useCallback((interestId: string) => {
    setDummyFollowedIds(prev => {
      if (prev.includes(interestId) || prev.length >= MAX_FOLLOWED_INTERESTS) {
        return prev;
      }
      return [...prev, interestId];
    });
  }, []);

  const dummyUnfollowInterest = useCallback((interestId: string) => {
    setDummyFollowedIds(prev =>
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : prev,
    );
  }, []);

  const canDummyFollowMore = dummyFollowedIds.length < MAX_FOLLOWED_INTERESTS;

  return {
    dummyFollowedIds,
    dummyFollowedInterests,
    dummyFollowInterest,
    dummyUnfollowInterest,
    dummyMaxFollowed: MAX_FOLLOWED_INTERESTS,
    canDummyFollowMore,
  };
}
