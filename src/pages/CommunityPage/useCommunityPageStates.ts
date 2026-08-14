import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getCommunityPageData,
  getResolvedCommunityMemberRequests,
  resolveCommunityMemberRequests,
} from '@src/data';
import type { CommunityPageData, CommunityViewerStatus } from '@src/common-libs/types';

export function useCommunityPageStates({ variant }: CommunityPageClientProps) {
  const [rawCommunityPageData, setRawCommunityPageData] = useState<CommunityPageData | null>(null);
  const [hasLeftMembership, setHasLeftMembership] = useState(false);
  const [resolvedMemberRequestIds, setResolvedMemberRequestIds] = useState<string[]>([]);

  const applyPageData = useCallback((data: CommunityPageData) => {
    setRawCommunityPageData(data);
    setHasLeftMembership(false);
  }, []);

  useEffect(() => {
    getCommunityPageData().then(applyPageData);
  }, [applyPageData]);

  useEffect(() => {
    getResolvedCommunityMemberRequests().then(setResolvedMemberRequestIds);
  }, []);

  const markJoinPending = useCallback(() => {
    setHasLeftMembership(false);
    setRawCommunityPageData(current => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        viewerStatus: 'pending',
      };
    });
  }, []);

  const markMembershipCleared = useCallback(() => {
    setHasLeftMembership(true);
    setRawCommunityPageData(current => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        viewerStatus: 'visitor',
      };
    });
  }, []);

  const resolveMemberRequests = useCallback(async () => {
    const communityId = rawCommunityPageData?.id;
    if (!communityId || resolvedMemberRequestIds.includes(communityId)) {
      return;
    }

    await resolveCommunityMemberRequests(communityId);
    setResolvedMemberRequestIds(current => (
      current.includes(communityId) ? current : [...current, communityId]
    ));
  }, [rawCommunityPageData?.id, resolvedMemberRequestIds]);

  const hasResolvedMemberRequests = rawCommunityPageData !== null
    && resolvedMemberRequestIds.includes(rawCommunityPageData.id);

  const communityPageData = useMemo(() => {
    if (!rawCommunityPageData) {
      return null;
    }

    let pageData: CommunityPageData;

    if (variant === 'rejected') {
      pageData = {
        ...rawCommunityPageData,
        viewerStatus: 'banned',
        isOrganiser: false,
      };
    } else if ((variant === 'member' || variant === 'organiser') && !hasLeftMembership) {
      pageData = {
        ...rawCommunityPageData,
        viewerStatus: 'member' as const,
        isOrganiser: variant === 'organiser',
      };
    } else if (variant === 'public') {
      pageData = {
        ...rawCommunityPageData,
        viewerStatus: null,
        isOrganiser: false,
      };
    } else if (variant === 'empty') {
      pageData = {
        ...rawCommunityPageData,
        viewerStatus: 'visitor',
        futureEvents: [],
        futureEventsTotalCount: 0,
        pastEvents: [],
        pastEventsTotalCount: 0,
        recentLocations: [],
        membersCount: 1,
        communityMembers: rawCommunityPageData.communityMembers.slice(0, 1),
        reviewsForOneCommunity: [],
        organisers: rawCommunityPageData.organisers.slice(0, 1),
        descriptionHtml: getFirstTwoParagraphs(rawCommunityPageData.descriptionHtml),
      };
    } else {
      pageData = {
        ...rawCommunityPageData,
        viewerStatus: 'visitor',
      };
    }

    if (pageData.isOrganiser === true) {
      return pageData;
    }

    return {
      ...pageData,
      communityMemberRequests: undefined,
    };
  }, [variant, rawCommunityPageData, hasLeftMembership]);

  const viewerStatus: CommunityViewerStatus | undefined = variant === 'rejected'
    ? 'banned'
    : communityPageData?.viewerStatus;

  return {
    communityPageData,
    viewerStatus,
    hasResolvedMemberRequests,
    resolveMemberRequests,
    markJoinPending,
    markMembershipCleared,
  };
}

export const PAGE_VARIANT_OPTIONS = [
  'empty',
  'public',
  'member',
  'organiser',
  'rejected',
] as const;

export type CommunityPageClientProps = {
  variant?: (typeof PAGE_VARIANT_OPTIONS)[number];
};

function getFirstTwoParagraphs(descriptionHtml: string): string {
  return descriptionHtml
    .split(/<\/p>/i)
    .map(part => part.trim())
    .filter(part => part.length > 0)
    .slice(0, 2)
    .map(part => `${part}</p>`)
    .join('\n');
}
