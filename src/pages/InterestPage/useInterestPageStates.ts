import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  addExternalLink as addExternalLinkApi,
  getInterestPageData,
  type InterestPageData,
  type Link,
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

  const events = useMemo(
    () => (isEmptyVariant ? [] : interestPageData?.relatedEvents ?? []),
    [isEmptyVariant, interestPageData],
  );

  const communities = useMemo(
    () => (isEmptyVariant ? [] : interestPageData?.relatedCommunities ?? []),
    [isEmptyVariant, interestPageData],
  );

  const externalLinks = useMemo(
    () => (isEmptyVariant ? [] : interestPageData?.externalLinks ?? []),
    [isEmptyVariant, interestPageData],
  );

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
