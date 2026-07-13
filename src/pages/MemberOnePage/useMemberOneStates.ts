import { useCallback, useEffect, useMemo, useState } from 'react';
import { getMemberOnePageData, type CommunityEngagement, type MemberOnePageData } from '@src/data';

function getCommunityStatusRank(status: CommunityEngagement['status']): number {
  if (status === 'rejected' || status === 'banned') {
    return 0;
  }

  if (status === 'pending') {
    return 1;
  }

  return 2;
}

export function useMemberOneStates({ variant }: MemberOnePageProps) {
  const [rawMemberOnePageData, setRawMemberOnePageData] = useState<MemberOnePageData | null>(null);

  const applyPageData = useCallback((data: MemberOnePageData) => {
    setRawMemberOnePageData(data);
  }, []);

  useEffect(() => {
    getMemberOnePageData().then(applyPageData);
  }, [applyPageData]);

  const memberOnePageData = useMemo(() => {
    if (!rawMemberOnePageData) {
      return null;
    }

    switch (variant) {
      case 'empty':
        return {
          ...rawMemberOnePageData,
          engagements: { interests: [], communities: [] },
          about: {},
        };
      case 'related':
        return rawMemberOnePageData;
      case 'admin':
        return {
          ...rawMemberOnePageData,
          label: `${rawMemberOnePageData.firstName} ${rawMemberOnePageData.lastName}`,
        };
      case 'public':
      default:
        return {
          ...rawMemberOnePageData,
          about: {},
        };
    }
  }, [variant, rawMemberOnePageData]);

  const interests = memberOnePageData?.engagements.interests ?? [];

  const communities = useMemo(() => {
    const raw = memberOnePageData?.engagements.communities ?? [];

    const visible = variant === 'admin'
      ? raw
      : raw.filter(c => c.status !== 'pending' && c.status !== 'rejected');

    if (variant !== 'admin') {
      return visible;
    }

    return [...visible].sort((a, b) => {
      const rankDiff = getCommunityStatusRank(a.status) - getCommunityStatusRank(b.status);
      if (rankDiff !== 0) {
        return rankDiff;
      }

      return b.attendedCount - a.attendedCount;
    });
  }, [memberOnePageData, variant]);

  return {
    memberOnePageData,
    interests,
    communities,
  };
}

export const PAGE_VARIANT_OPTIONS = [
  'public', // default
  'related',
  'admin',
  'empty'
] as const;

export type MemberOnePageProps = {
  variant?: (typeof PAGE_VARIANT_OPTIONS)[number];
};
