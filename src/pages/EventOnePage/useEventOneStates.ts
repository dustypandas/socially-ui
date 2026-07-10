import { useCallback, useEffect, useState } from 'react';
import { getEventOnePageData, type EventOnePageData } from '@src/data';

export function useEventOneStates() {
  const [eventOnePageData, setEventOnePageData] = useState<EventOnePageData | null>(null);

  const applyPageData = useCallback((data: EventOnePageData) => {
    setEventOnePageData(data);
  }, []);

  useEffect(() => {
    getEventOnePageData().then(applyPageData);
  }, [applyPageData]);

  return {
    eventOnePageData,
  };
}
