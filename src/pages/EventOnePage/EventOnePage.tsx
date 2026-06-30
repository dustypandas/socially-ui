import { ColumnsLayout, PageLayout } from '../../components';
import { sampleFullEvent } from '../_data';
import {
  EventAttendBar,
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
    <PageLayout isEventPage>
      <section className="event-one-page">
        <div className="width-container">
          <ColumnsLayout mainPosition="right" stackAt={780}>
            <ColumnsLayout.Main>
              <div className="event-one-page__main">
                <EventIntro
                  title={eventData.title}
                  date={eventData.date.pageLabels}
                  location={eventData.location}
                />
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
                <EventImage src={eventData.img} alt={eventData.title} />
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
      <EventAttendBar
        profiles={eventData.attendees.profiles}
        attendeeCount={eventData.attendees.count}
      />
    </PageLayout>
  );
}
