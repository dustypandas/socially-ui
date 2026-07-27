import { EventCardHorizontal, SectionTitle } from '@src/components';
import type { EventBasic } from '@src/data';
import { getDateAndTimeLabels } from '@src/helpers/labelHelpers';
import './home-profile-upcoming-events.css';

type HomeProfileUpcomingEventsProps = {
  events: EventBasic[];
};

export function HomeProfileUpcomingEvents({ events }: HomeProfileUpcomingEventsProps) {
  const isEmpty = events.length === 0;

  return (
    <section className="home-profile-upcoming-events">
      <SectionTitle
        title="Upcoming Events"
        hideMore={events.length <= 3}
        moreHref="#/events-ui"
        moreLabel="more events →"
      />
      {isEmpty ? (
        <div className="home-profile-upcoming-events__empty">No upcoming events</div>
      ) : (
        <div className="home-profile-upcoming-events__list">
          {events.map(event => {
            const dateAndTimeLabels = getDateAndTimeLabels(event.startTime);

            return (
              <div key={event.id} className="home-profile-upcoming-events__item">
                <div className="home-profile-upcoming-events__item-line" />
                <div className="home-profile-upcoming-events__item-timeline">
                  <div className="home-profile-upcoming-events__item-datetime">
                    <span className="home-profile-upcoming-events__item-date">
                      {dateAndTimeLabels.dateLabel}
                    </span>
                    <span className="home-profile-upcoming-events__item-time">
                      {dateAndTimeLabels.timeLabel}
                    </span>
                  </div>
                  <div className="home-profile-upcoming-events__item-dot-wrapper">
                    <div className="home-profile-upcoming-events__item-dot" />
                  </div>
                </div>
                <EventCardHorizontal event={{ ...event }} />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
