import { useRef } from 'react';
import { ColumnsLayout, PageLayout } from '@src/components';
import { sampleFullEvent } from '@src/data/dummyData.js';
import {
  EventAttendCard,
  EventCommunity,
  EventDescription,
  EventHosts,
  EventImage,
  EventIntro,
} from './components';
import {
  getElementDocumentOffsetTop,
  useScrolledPastDistance,
} from '@src/hooks/useScrolledPastDistance';
import './event-one-page.css';

export function EventOnePage() {
  const eventData = sampleFullEvent;
  const imageRef = useRef<HTMLDivElement>(null);
  const isExpandedAttendCard = useScrolledPastDistance(
    {
      ref: imageRef,
      getDistance: (image) => getElementDocumentOffsetTop(image) + image.offsetHeight,
    },
    { mediaQuery: '(min-width: 780px)' },
  );

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
                className={[
                  'event-one-page__attend-card',
                  isExpandedAttendCard && 'event-one-page__attend-card--expanded',
                ].filter(Boolean).join(' ')}
                profiles={eventData.attendees.profiles}
                attendeeCount={eventData.attendees.count}
              />
              <EventDescription details={eventData.details} />
              <div style={{ minHeight: '20rem' }}></div>
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside asideWidth="min(320px, 32%)">
              <div className="event-one-page__aside">
                <div ref={imageRef} className="event-one-page__aside-image">
                  <EventImage src={eventData.img} alt={eventData.title} />
                </div>
                <div className="event-one-page__aside-sticky">
                  <h3
                    className={[
                      'event-one-page__aside-title',
                      isExpandedAttendCard && 'event-one-page__aside-title--visible',
                    ].filter(Boolean).join(' ')}
                  >
                    {eventData.title}
                  </h3>
                  <EventCommunity
                    name={eventData.community.name}
                    img={eventData.community.img}
                    details={eventData.community.details}
                  />
                  <EventHosts hosts={eventData.hosts} />
                </div>
              </div>
            </ColumnsLayout.Aside>
          </ColumnsLayout>
        </div>
      </section>
      <EventAttendCard
        isFixedBar
        profiles={eventData.attendees.profiles}
        attendeeCount={eventData.attendees.count}
      />
    </PageLayout>
  );
}
