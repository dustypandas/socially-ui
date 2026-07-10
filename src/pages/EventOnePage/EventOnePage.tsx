import { useEffect, useRef, useState } from 'react';
import { ColumnsLayout, PageLayout } from '@src/components';
import { getEventPageData, type EventPageData } from '@src/data';
import {
  EventAttendCard,
  EventCommunity,
  EventDetails,
  EventLocationDetails,
  EventHosts,
  EventImage,
  EventIntro,
  EventReviews,
  EventTags,
} from './components';
import {
  getElementDocumentOffsetTop,
  useScrolledPastDistance,
} from '@src/hooks/useScrolledPastDistance';
import './event-one-page.css';

export function EventOnePage() {
  const [eventData, setEventData] = useState<EventPageData | null>(null);
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
    getEventPageData().then(setEventData);
  }, []);

  useEffect(() => {
    const $title = asideTitleRef.current;
    const $sticky = asideStickyRef.current;
    if (!$title || !$sticky || !eventData) {
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
  }, [eventData?.title]);

  if (!eventData) {
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
                  <EventImage src={eventData.img} alt={eventData.title} />
                </div>
                <EventIntro
                  title={eventData.title}
                  date={eventData.date.pageLabels}
                  location={eventData.location}
                />
              </div>
              <EventAttendCard
                ref={attendCardRef}
                className="event-one-page__attend-card"
                profiles={eventData.attendees.profiles}
                attendeeCount={eventData.attendees.count}
              />
              <EventDetails details={eventData.details} />
              <EventTags interests={eventData.eventInterests} />
              <div className="event-one-page__divider" />
              <EventReviews />
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside asideWidth="min(320px, 32%)">
              <div className="event-one-page__aside">
                <div className="event-one-page__aside-image">
                  <EventImage src={eventData.img} alt={eventData.title} />
                </div>
                <div ref={asideStickyRef} className="event-one-page__aside-sticky">
                  <h3
                    ref={asideTitleRef}
                    className={[
                      'event-one-page__aside-title',
                      isPastAttendCard && 'event-one-page__aside-title--visible',
                    ].filter(Boolean).join(' ')}
                  >
                    {eventData.title}
                  </h3>
                  <EventCommunity
                    name={eventData.community.name}
                    img={eventData.community.img}
                    details={eventData.community.details}
                  />
                  <div className="event-one-page__divider" />
                  <EventHosts hosts={eventData.hosts} />
                  <div className="event-one-page__divider" />
                  <EventLocationDetails location={eventData.location} />
                </div>
              </div>
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
      <EventAttendCard
        isFixedBar
        isFixedBarVisible={isPastAttendCard}
        profiles={eventData.attendees.profiles}
        attendeeCount={eventData.attendees.count}
      />
    </PageLayout>
  );
}
