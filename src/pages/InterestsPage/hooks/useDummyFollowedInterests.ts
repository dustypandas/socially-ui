import { useCallback, useMemo, useState } from 'react';
import { myFollowedInterests, MAX_FOLLOWED_INTERESTS } from '@src/data/types.js';
import type { Interest } from '@src/store/slices/interestsSlice';

export function useDummyFollowedInterests(interests: Interest[]) {
  const [dummyFollowedNames, setDummyFollowedNames] = useState(
    () => [...myFollowedInterests],
  );

  const dummyFollowedInterests = useMemo(
    () => interests.filter(interest => dummyFollowedNames.includes(interest.name)),
    [interests, dummyFollowedNames],
  );

  const dummyFollowInterest = useCallback((interestName: string) => {
    setDummyFollowedNames(prev => {
      if (prev.includes(interestName) || prev.length >= MAX_FOLLOWED_INTERESTS) {
        return prev;
      }
      return [...prev, interestName];
    });
  }, []);

  const dummyUnfollowInterest = useCallback((interestName: string) => {
    setDummyFollowedNames(prev =>
      prev.includes(interestName)
        ? prev.filter(name => name !== interestName)
        : prev,
    );
  }, []);

  const canDummyFollowMore = dummyFollowedNames.length < MAX_FOLLOWED_INTERESTS;

  return {
    dummyFollowedNames,
    dummyFollowedInterests,
    dummyFollowInterest,
    dummyUnfollowInterest,
    dummyMaxFollowed: MAX_FOLLOWED_INTERESTS,
    canDummyFollowMore,
  };
}
