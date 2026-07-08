import { useEffect, useRef } from 'react';
import { ColumnsLayout, PageLayout } from '@src/components';
import { sampleFullEvent } from '@src/data/dummyData.js';
import {
  EventAttendCard,
  EventCommunity,
  EventDetails,
  EventHosts,
  EventImage,
  EventIntro,
  EventReviews,
} from './components';
import {
  getElementDocumentOffsetTop,
  useScrolledPastDistance,
} from '@src/hooks/useScrolledPastDistance';
import './event-one-page.css';

export function EventOnePage() {
  const eventData = sampleFullEvent;
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
    const title = asideTitleRef.current;
    const sticky = asideStickyRef.current;
    if (!title || !sticky) {
      return;
    }

    const updateTitleHeight = () => {
      sticky.style.setProperty(
        '--event-one-page-aside-title-height',
        `${title.offsetHeight}px`,
      );
      // console.log('hello x: ', title.offsetHeight);
    };

    updateTitleHeight();
    window.addEventListener('resize', updateTitleHeight);

    return () => {
      window.removeEventListener('resize', updateTitleHeight);
      sticky.style.removeProperty('--event-one-page-aside-title-height');
    };
  }, [eventData.title]);

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
              <div className="event-one-page__divider" />
              <div style={{ minHeight: '20rem' }} />
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
                  <EventReviews />
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
