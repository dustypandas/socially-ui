import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getCommunitiesPageData,
  type CommunitiesPageData,
  type CommunityBasic,
  type CommunityScope,
} from '@src/data';

export function useCommunitiesStates(
  searchQuery: string,
  communityScope: CommunityScope,
) {
  const pageDataRef = useRef<CommunitiesPageData | null>(null);
  const [filteredCommunities, setFilteredCommunities] = useState<CommunityBasic[]>([]);

  const applyPageData = useCallback((data: CommunitiesPageData, filteredCommunities?: CommunityBasic[]) => {
    pageDataRef.current = data;
    setFilteredCommunities(filteredCommunities ?? data.filteredCommunities);
  }, []);

  // Initial load
  useEffect(() => {
    getCommunitiesPageData('', 'all').then(applyPageData);
  }, [applyPageData]);

  // On search query or community scope change
  useEffect(() => {
    if (!pageDataRef.current) return;

    const isDefault = searchQuery === '' && communityScope === 'all';

    if (isDefault) {
      applyPageData(pageDataRef.current);
      return;
    }

    getCommunitiesPageData(searchQuery, communityScope).then(data =>
      applyPageData(pageDataRef.current!, data.filteredCommunities),
    );
  }, [searchQuery, communityScope, applyPageData]);

  return { filteredCommunities };
}
