import { useCallback, useEffect, useState } from 'react';
import type { Link, InterestPageData } from '@src/common-libs/types';
import {
  addExternalLink as addExternalLinkApi,
  getInterestPageData,
} from '@src/data';

export function useInterestPageStates({ variant }: InterestPageClientProps) {
  const [interestPageData, setInterestPageData] = useState<InterestPageData | null>(null);

  const applyPageData = useCallback((data: InterestPageData) => {
    setInterestPageData(data);
  }, []);

  // load initial data
  useEffect(() => {
    getInterestPageData().then(applyPageData);
  }, [applyPageData]);

  // mutating external links
  const handleRefreshInterestOne = useCallback(async () => {
    try {
      getInterestPageData().then(applyPageData);
    } catch {
      alert('error');
    }
  }, [applyPageData]);

  const handleAddExternalLink = useCallback(async (link: Link) => {
    const prev = interestPageData;
    setInterestPageData(current => current
      ? { ...current, externalLinks: [...(current.externalLinks ?? []), link] }
      : current,
    );

    try {
      await addExternalLinkApi(link);
      await handleRefreshInterestOne();
    } catch {
      alert('error');
      setInterestPageData(prev);
    }
  }, [interestPageData, handleRefreshInterestOne]);

  // empty variant
  const isEmptyVariant = variant === 'empty';

  const events = isEmptyVariant ? [] : interestPageData?.relatedEvents ?? [];
  const communities = isEmptyVariant ? [] : interestPageData?.relatedCommunities ?? [];
  const externalLinks = isEmptyVariant ? [] : interestPageData?.externalLinks ?? [];

  return {
    interestPageData,
    events,
    communities,
    externalLinks,
    handleAddExternalLink,
  };
}

export const PAGE_VARIANT_OPTIONS = [
  'empty'
] as const;

export type InterestPageClientProps = {
  variant?: (typeof PAGE_VARIANT_OPTIONS)[number];
};
