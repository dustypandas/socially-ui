import { useCallback, useEffect, useRef, useState } from 'react';
import type { EventBasic, EventsPageData } from '@src/common-libs/types';
import type { OpenToFilter, TimeFilter } from '@src/common-libs/helpers';
import {
  getEventsPageData,
  getFilteredEvents,
} from '@src/data';

export function useEventsStates(
  interestQuery: string,
  timeFilter: TimeFilter,
  openToFilter: OpenToFilter,
) {
  const pageDataRef = useRef<EventsPageData | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<EventBasic[]>([]);

  const applyPageData = useCallback((data: EventsPageData, events?: EventBasic[]) => {
    pageDataRef.current = data;
    setFilteredEvents(events ?? data.filteredEvents);
  }, []);

  useEffect(() => {
    getEventsPageData().then(applyPageData);
  }, [applyPageData]);

  useEffect(() => {
    if (!pageDataRef.current) return;

    const isDefault =
      interestQuery === ''
      && timeFilter === 'thisWeek'
      && openToFilter === 'any';

    if (isDefault) {
      applyPageData(pageDataRef.current);
      return;
    }

    getFilteredEvents({ interestQuery, timeFilter, openToFilter }).then(events =>
      applyPageData(pageDataRef.current!, events),
    );
  }, [interestQuery, timeFilter, openToFilter, applyPageData]);

  return { filteredEvents };
}
