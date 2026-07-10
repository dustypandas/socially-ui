import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  addExternalLink as addExternalLinkApi,
  getInterestOnePageData,
  type InterestOnePageData,
  type Link,
} from '@src/data';

export function useInterestOneStates() {
  const location = useLocation();
  const [interestOnePageData, setInterestOnePageData] = useState<InterestOnePageData | null>(null);

  const applyPageData = useCallback((data: InterestOnePageData) => {
    setInterestOnePageData(data);
  }, []);

  // load initial data
  useEffect(() => {
    getInterestOnePageData().then(applyPageData);
  }, [applyPageData]);

  // mutating external links
  const handleRefreshInterestOne = useCallback(async () => {
    try {
      getInterestOnePageData().then(applyPageData);
    } catch {
      alert('error');
    }
  }, [applyPageData]);

  const handleAddExternalLink = useCallback(async (link: Link) => {
    const prev = interestOnePageData;
    setInterestOnePageData(current => current
      ? { ...current, externalLinks: [...(current.externalLinks ?? []), link] }
      : current,
    );

    try {
      await addExternalLinkApi(link);
      await handleRefreshInterestOne();
    } catch {
      alert('error');
      setInterestOnePageData(prev);
    }
  }, [interestOnePageData, handleRefreshInterestOne]);

  // empty variant
  const isEmptyVariant = location.pathname === '/interest-one-ui-empty';

  const events = useMemo(
    () => (isEmptyVariant ? [] : interestOnePageData?.relatedEvents ?? []),
    [isEmptyVariant, interestOnePageData],
  );

  const communities = useMemo(
    () => (isEmptyVariant ? [] : interestOnePageData?.relatedCommunities ?? []),
    [isEmptyVariant, interestOnePageData],
  );

  const externalLinks = useMemo(
    () => (isEmptyVariant ? [] : interestOnePageData?.externalLinks ?? []),
    [isEmptyVariant, interestOnePageData],
  );

  return {
    interestOnePageData,
    events,
    communities,
    externalLinks,
    handleAddExternalLink,
  };
}
