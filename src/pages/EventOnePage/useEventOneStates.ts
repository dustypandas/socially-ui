import { useCallback, useEffect, useMemo, useState } from 'react';
import { getEventOnePageData, type EventOnePageData } from '@src/data';

export function useEventOneStates({ variant }: EventOnePageProps) {
  const [rawEventOnePageData, setRawEventOnePageData] = useState<EventOnePageData | null>(null);

  const applyPageData = useCallback((data: EventOnePageData) => {
    setRawEventOnePageData(data);
  }, []);

  useEffect(() => {
    getEventOnePageData().then(applyPageData);
  }, [applyPageData]);

  const eventOnePageData = useMemo(() => {
    if (!rawEventOnePageData) {
      return null;
    }

    if (variant !== 'empty') {
      return rawEventOnePageData;
    }

    return {
      ...rawEventOnePageData,
      hosts: rawEventOnePageData.hosts.slice(0, 1),
      attendees: {
        count: 1,
        avatars: rawEventOnePageData.attendees.avatars.slice(0, 1),
      },
      descriptionHtml: getFirstTwoParagraphs(rawEventOnePageData.descriptionHtml),
      interests: rawEventOnePageData.interests?.slice(0, 1),
      reviews: [],
    };
  }, [variant, rawEventOnePageData]);

  return {
    eventOnePageData,
  };
}

export const PAGE_VARIANT_OPTIONS = [
  'empty',
] as const;

export type EventOnePageProps = {
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
