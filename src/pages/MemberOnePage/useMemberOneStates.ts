import { useCallback, useEffect, useState } from 'react';
import { getMemberOnePageData, type MemberOnePageData } from '@src/data';

export function useMemberOneStates() {
  const [memberOnePageData, setMemberOnePageData] = useState<MemberOnePageData | null>(null);

  const applyPageData = useCallback((data: MemberOnePageData) => {
    setMemberOnePageData(data);
  }, []);

  useEffect(() => {
    getMemberOnePageData().then(applyPageData);
  }, [applyPageData]);

  return {
    memberOnePageData,
  };
}
