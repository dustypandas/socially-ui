import { useCallback, useEffect, useMemo, useState } from 'react';
import { getCommunityOnePageData, type CommunityOnePageData } from '@src/data';

export function useCommunityOneStates({ variant }: CommunityOnePageProps) {
  const [rawCommunityOnePageData, setRawCommunityOnePageData] = useState<CommunityOnePageData | null>(null);

  const applyPageData = useCallback((data: CommunityOnePageData) => {
    setRawCommunityOnePageData(data);
  }, []);

  useEffect(() => {
    getCommunityOnePageData().then(applyPageData);
  }, [applyPageData]);

  const communityOnePageData = useMemo(() => {
    if (!rawCommunityOnePageData) {
      return null;
    }

    if (variant !== 'empty') {
      return rawCommunityOnePageData;
    }

    return {
      ...rawCommunityOnePageData,
      futureEvents: [],
      futureEventsTotalCount: 0,
      pastEvents: [],
      pastEventsTotalCount: 0,
      membersCount: 1,
      memberAvatars: rawCommunityOnePageData.memberAvatars.slice(0, 1),
      organizers: rawCommunityOnePageData.organizers.slice(0, 1),
      descriptionHtml: getFirstTwoParagraphs(rawCommunityOnePageData.descriptionHtml),
    };
  }, [variant, rawCommunityOnePageData]);

  return {
    communityOnePageData,
  };
}

export const PAGE_VARIANT_OPTIONS = [
  'empty',
] as const;

export type CommunityOnePageProps = {
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
