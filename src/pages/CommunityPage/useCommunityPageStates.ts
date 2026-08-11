import { useCallback, useEffect, useMemo, useState } from 'react';
import { getCommunityPageData } from '@src/data';
import type { CommunityPageData } from '@src/common-libs/types';

export function useCommunityPageStates({ variant }: CommunityPageClientProps) {
  const [rawCommunityPageData, setRawCommunityPageData] = useState<CommunityPageData | null>(null);
  const [hasLeftMembership, setHasLeftMembership] = useState(false);

  const applyPageData = useCallback((data: CommunityPageData) => {
    setRawCommunityPageData(data);
    setHasLeftMembership(false);
  }, []);

  useEffect(() => {
    getCommunityPageData().then(applyPageData);
  }, [applyPageData]);

  const markJoinPending = useCallback(() => {
    setHasLeftMembership(false);
    setRawCommunityPageData(current => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        communityViewerStatus: 'pending',
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
        communityViewerStatus: null,
      };
    });
  }, []);

  const communityPageData = useMemo(() => {
    if (!rawCommunityPageData) {
      return null;
    }

    if ((variant === 'member' || variant === 'organizer') && !hasLeftMembership) {
      return {
        ...rawCommunityPageData,
        communityViewerStatus: 'member' as const,
        isOrganizer: variant === 'organizer',
      };
    }

    if (variant !== 'empty') {
      return rawCommunityPageData;
    }

    return {
      ...rawCommunityPageData,
      futureEvents: [],
      futureEventsTotalCount: 0,
      pastEvents: [],
      pastEventsTotalCount: 0,
      recentLocations: [],
      membersCount: 1,
      memberAvatars: rawCommunityPageData.memberAvatars.slice(0, 1),
      communityMembers: rawCommunityPageData.communityMembers.slice(0, 1),
      organizers: rawCommunityPageData.organizers.slice(0, 1),
      descriptionHtml: getFirstTwoParagraphs(rawCommunityPageData.descriptionHtml),
    };
  }, [variant, rawCommunityPageData, hasLeftMembership]);

  return {
    communityPageData,
    markJoinPending,
    markMembershipCleared,
  };
}

export const PAGE_VARIANT_OPTIONS = [
  'empty',
  'member',
  'organizer',
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
