import { useCallback, useEffect, useRef, useState } from 'react';
import {
  addInterest as addInterestApi,
  followInterest,
  getFilteredInterests,
  getInterestsPageData,
  unfollowInterest,
  type Interest,
  // type InterestCategoryGroup,
  type InterestsPageData,
  type MemberFollower,
} from '@src/data';
// import { groupInterestsByCategory } from '../helpers';

const MAX_FOLLOWED_INTERESTS = 10;

export function useInterests(searchQuery: string) {
  const pageDataRef = useRef<InterestsPageData | null>(null);
  const [filteredInterests, setFilteredInterests] = useState<Interest[]>([]);
  const [followedInterests, setFollowedInterests] = useState<Interest[]>([]);
  // const [categoryGroups, setCategoryGroups] = useState<InterestCategoryGroup[]>([]);
  const [memberFollowers, setMemberFollowers] = useState<MemberFollower[]>([]);
  const [canFollowMore, setCanFollowMore] = useState(true);

  const applyPageData = useCallback((data: InterestsPageData, filteredInterests?: Interest[]) => {
    pageDataRef.current = data;
    setFilteredInterests(filteredInterests ?? data.filteredInterests);
    setFollowedInterests(data.followedInterests);
    setMemberFollowers(data.memberFollowers);
    setCanFollowMore(data.canFollowMore);
    // setCategoryGroups(groupInterestsByCategory(filteredInterests));
  }, []);

  // load initial data
  useEffect(() => {
    getInterestsPageData().then(applyPageData);
  }, [applyPageData]);

  // load filtered interests
  useEffect(() => {
    if (!pageDataRef.current) return;

    if (searchQuery === '') {
      applyPageData(pageDataRef.current!);
      return;
    }

    getFilteredInterests(searchQuery).then(filteredInterests =>
      applyPageData(pageDataRef.current!, filteredInterests),
    );
  }, [searchQuery, applyPageData]);

  const handleRefreshInterests = useCallback(async () => {
    try {
      getInterestsPageData().then(applyPageData);
    } catch {
      alert('error');
    }
  }, [searchQuery, applyPageData]);

  // optimistic update
  const handleFollowInterest = useCallback(async (interest: Interest) => {
    const prev = { followedInterests, canFollowMore, memberFollowers };
    setFollowedInterests(current => [...current, interest]);
    setCanFollowMore(current => current && followedInterests.length + 1 < MAX_FOLLOWED_INTERESTS);

    try {
      await followInterest(interest.label);
      await handleRefreshInterests();
    } catch {
      alert('error');
      setFollowedInterests(prev.followedInterests);
      setCanFollowMore(prev.canFollowMore);
      setMemberFollowers(prev.memberFollowers);
    }
  }, [followedInterests, canFollowMore, handleRefreshInterests]);

  const handleUnfollowInterest = useCallback(async (label: string) => {
    const prev = { followedInterests, canFollowMore, memberFollowers };
    setFollowedInterests(current => current.filter(interest => interest.label !== label));
    setCanFollowMore(true);

    try {
      await unfollowInterest(label);
      await handleRefreshInterests();
    } catch {
      alert('error');
      setFollowedInterests(prev.followedInterests);
      setCanFollowMore(prev.canFollowMore);
      setMemberFollowers(prev.memberFollowers);
    }
  }, [followedInterests, canFollowMore, handleRefreshInterests]);

  const handleAddInterest = useCallback(async (label: string): Promise<boolean> => {
    if (!canFollowMore) return false;

    try {
      await addInterestApi(label);
      await handleRefreshInterests();
      return true;
    } catch {
      alert('error');
      return false;
    }
  }, [canFollowMore, handleRefreshInterests]);

  return {
    filteredInterests,
    followedInterests,
    memberFollowers,
    canFollowMore,
    maxFollowed: MAX_FOLLOWED_INTERESTS,
    handleFollowInterest,
    handleUnfollowInterest,
    handleRefreshInterests,
    handleAddInterest,
  };
}
