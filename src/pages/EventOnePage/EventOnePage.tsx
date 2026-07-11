import { useEffect, useRef } from 'react';
import { ColumnsLayout, PageLayout } from '@src/components';
import { getElementDocumentOffsetTop, useScrolledPastDistance } from '@src/hooks/useScrolledPastDistance';
import {
  EventAttendCard,
  EventCommunity,
  EventDescription,
  EventLocationDetails,
  EventHosts,
  EventImage,
  EventIntro,
  EventReviews,
  EventTags,
} from './components';
import { useEventOneStates } from './useEventOneStates';
import './event-one-page.css';

export function EventOnePage() {
  const {
    eventOnePageData,
  } = useEventOneStates();

  const attendCardRef = useRef<HTMLDivElement>(null);
  const asideTitleRef = useRef<HTMLHeadingElement>(null);
  const asideStickyRef = useRef<HTMLDivElement>(null);
  const isPastAttendCard = useScrolledPastDistance(
    {
      ref: attendCardRef,
      getDistance: (card) => getElementDocumentOffsetTop(card) + card.offsetHeight,
    },
    { mediaQuery: '(min-width: 780px)' },
  );

  useEffect(() => {
    const $title = asideTitleRef.current;
    const $sticky = asideStickyRef.current;
    if (!$title || !$sticky || !eventOnePageData) {
      return;
    }

    const updateTitleHeight = () => {
      $sticky.style.setProperty(
        '--event-one-page-aside-title-height',
        `${$title.offsetHeight}px`,
      );
    };

    updateTitleHeight();
    window.addEventListener('resize', updateTitleHeight);

    return () => {
      window.removeEventListener('resize', updateTitleHeight);
      $sticky.style.removeProperty('--event-one-page-aside-title-height');
    };
  }, [eventOnePageData?.title]);

  if (!eventOnePageData) {
    return null;
  }

  return (
    <PageLayout hasStaticHeader>
      <section className="event-one-page">
        <div className="width-container">
          <ColumnsLayout mainPosition="right">
            <ColumnsLayout.Main>
              <div className="event-one-page__hero">
                <div className="event-one-page__stacked-image">
                  <EventImage src={eventOnePageData.image} alt={eventOnePageData.title} />
                </div>
                <EventIntro
                  title={eventOnePageData.title}
                  date={eventOnePageData.date.pageLabels}
                  location={eventOnePageData.location}
                />
              </div>
              <EventAttendCard
                ref={attendCardRef}
                className="event-one-page__attend-card"
                profiles={eventOnePageData.attendees.avatars}
                attendeeCount={eventOnePageData.attendees.count}
              />
              <div className="interest-one-page__divider--hidden" />
              <EventDescription htmlContent={eventOnePageData.descriptionHtml} />
              <EventTags interests={eventOnePageData.eventInterests} />
              <div className="event-one-page__divider" />
              <EventReviews />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside asideWidth="min(320px, 32%)">
              <div className="event-one-page__aside">
                <div className="event-one-page__aside-image">
                  <EventImage src={eventOnePageData.image} alt={eventOnePageData.title} />
                </div>
                <div ref={asideStickyRef} className="event-one-page__aside-sticky">
                  <h3
                    ref={asideTitleRef}
                    className={[
                      'event-one-page__aside-title',
                      isPastAttendCard && 'event-one-page__aside-title--visible',
                    ].filter(Boolean).join(' ')}
                  >
                    {eventOnePageData.title}
                  </h3>
                  <div className="interest-one-page__divider--hidden" />
                  <EventCommunity community={eventOnePageData.community} />
                  <div className="event-one-page__divider--reverse-hidden" />
                  <EventHosts hosts={eventOnePageData.hosts} />
                  <div className="event-one-page__divider" />
                  <EventLocationDetails
                    location={eventOnePageData.location}
                    // label={eventOnePageData.title}
                  />
                </div>
              </div>
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
      <EventAttendCard
        isFixedBar
        isFixedBarVisible={isPastAttendCard}
        profiles={eventOnePageData.attendees.avatars}
        attendeeCount={eventOnePageData.attendees.count}
      />
    </PageLayout>
  );
}
