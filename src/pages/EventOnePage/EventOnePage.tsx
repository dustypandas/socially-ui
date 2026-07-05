import { ColumnsLayout, PageLayout } from '../../components';
import { sampleFullEvent } from '../../data/dummyData.js';
import {
  EventAttendCard,
  EventCommunity,
  EventDescription,
  EventHosts,
  EventImage,
  EventIntro,
} from './components';
import './event-one-page.css';

export function EventOnePage() {
  const eventData = sampleFullEvent;

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
              <div className="event-one-page__main">
                <EventAttendCard
                  className="event-one-page__attend-card"
                  profiles={eventData.attendees.profiles}
                  attendeeCount={eventData.attendees.count}
                />
                <EventDescription details={eventData.details} />
              </div>
            </ColumnsLayout.Main>
            <ColumnsLayout.Aside sticky asideWidth="min(320px, 32%)">
              <div className="event-one-page__aside">
                <div className="event-one-page__aside-image">
                  <EventImage src={eventData.img} alt={eventData.title} />
                </div>
                <EventCommunity
                  name={eventData.community.name}
                  img={eventData.community.img}
                  details={eventData.community.details}
                />
                <EventHosts hosts={eventData.hosts} />
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
