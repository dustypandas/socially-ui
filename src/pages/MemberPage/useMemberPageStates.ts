import { useCallback, useEffect, useMemo, useState } from 'react';
import { getMemberPageData } from '@src/data';
import type { MemberCommunity, MemberPageData } from '@src/common-libs/types';

function getCommunityStatusRank(status: MemberCommunity['status']): number {
  if (status === 'rejected' || status === 'banned') {
    return 0;
  }

  if (status === 'pending') {
    return 1;
  }

  return 2;
}

export function useMemberPageStates({ variant }: MemberPageClientProps) {
  const [rawMemberPageData, setRawMemberPageData] = useState<MemberPageData | null>(null);

  const applyPageData = useCallback((data: MemberPageData) => {
    setRawMemberPageData(data);
  }, []);

  useEffect(() => {
    getMemberPageData().then(applyPageData);
  }, [applyPageData]);

  const memberPageData = useMemo(() => {
    if (!rawMemberPageData) {
      return null;
    }

    switch (variant) {
      case 'empty':
        return {
          ...rawMemberPageData,
          memberInterests: [],
          memberCommunities: [],
          about: {},
        };
      case 'related':
        return rawMemberPageData;
      case 'admin':
        return {
          ...rawMemberPageData,
          label: `${rawMemberPageData.firstName} ${rawMemberPageData.lastName}`,
        };
      case 'public':
      default:
        return {
          ...rawMemberPageData,
          about: {},
        };
    }
  }, [variant, rawMemberPageData]);

  const interests = memberPageData?.memberInterests ?? [];

  const communities = useMemo(() => {
    const raw = memberPageData?.memberCommunities ?? [];

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
  }, [memberPageData, variant]);

  return {
    memberPageData,
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

export type MemberPageClientProps = {
  variant?: (typeof PAGE_VARIANT_OPTIONS)[number];
};
