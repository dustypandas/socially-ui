import { useCallback, useEffect, useMemo, useState } from 'react';
import { getEventPageData, type EventPageData } from '@src/data';

export function useEventPageStates({ variant }: EventPageClientProps) {
  const [rawEventPageData, setRawEventPageData] = useState<EventPageData | null>(null);

  const applyPageData = useCallback((data: EventPageData) => {
    setRawEventPageData(data);
  }, []);

  useEffect(() => {
    getEventPageData().then(applyPageData);
  }, [applyPageData]);

  const eventPageData = useMemo(() => {
    if (!rawEventPageData) {
      return null;
    }

    if (variant !== 'empty') {
      return rawEventPageData;
    }

    return {
      ...rawEventPageData,
      hosts: rawEventPageData.hosts.slice(0, 1),
      attendees: {
        count: 1,
        avatars: rawEventPageData.attendees.avatars.slice(0, 1),
      },
      descriptionHtml: getFirstTwoParagraphs(rawEventPageData.descriptionHtml),
      interests: rawEventPageData.interests?.slice(0, 1),
      reviews: [],
    };
  }, [variant, rawEventPageData]);

  return {
    eventPageData,
  };
}

export const PAGE_VARIANT_OPTIONS = [
  'empty',
] as const;

export type EventPageClientProps = {
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
