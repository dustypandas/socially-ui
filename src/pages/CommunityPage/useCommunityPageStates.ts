import { useCallback, useEffect, useMemo, useState } from 'react';
import { getCommunityPageData, type CommunityPageData } from '@src/data';

export function useCommunityPageStates({ variant }: CommunityPageClientProps) {
  const [rawCommunityPageData, setRawCommunityPageData] = useState<CommunityPageData | null>(null);

  const applyPageData = useCallback((data: CommunityPageData) => {
    setRawCommunityPageData(data);
  }, []);

  useEffect(() => {
    getCommunityPageData().then(applyPageData);
  }, [applyPageData]);

  const communityPageData = useMemo(() => {
    if (!rawCommunityPageData) {
      return null;
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
      membersCount: 1,
      memberAvatars: rawCommunityPageData.memberAvatars.slice(0, 1),
      organizers: rawCommunityPageData.organizers.slice(0, 1),
      descriptionHtml: getFirstTwoParagraphs(rawCommunityPageData.descriptionHtml),
    };
  }, [variant, rawCommunityPageData]);

  return {
    communityPageData,
  };
}

export const PAGE_VARIANT_OPTIONS = [
  'empty',
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
