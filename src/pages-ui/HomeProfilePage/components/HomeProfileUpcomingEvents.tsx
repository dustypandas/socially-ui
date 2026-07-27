import { useMemo, useState } from 'react';
import { ButtonsGroup, EventCardHorizontal, SectionTitle } from '@src/components';
import { filterEvents, type EventBasic, type TimeFilter } from '@src/data';
import { getDateAndTimeLabels } from '@src/helpers/labelHelpers';
import './home-profile-upcoming-events.css';

const HOME_PROFILE_TIME_FILTER_OPTIONS = [
  { value: 'today', label: 'Today' },
  { value: 'thisWeek', label: 'This week' },
  { value: 'nextWeek', label: 'Next week' },
] as const satisfies { value: TimeFilter; label: string }[];

type HomeProfileUpcomingEventsProps = {
  events: EventBasic[];
};

export function HomeProfileUpcomingEvents({ events }: HomeProfileUpcomingEventsProps) {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('thisWeek');

  const filteredEvents = useMemo(
    () => filterEvents(events, '', timeFilter, 'any'),
    [events, timeFilter],
  );

  const isEmpty = filteredEvents.length === 0;

  return (
    <section className="home-profile-upcoming-events">
      <SectionTitle
        title="Upcoming Events"
        hideMore={filteredEvents.length <= 3}
        moreHref="#/events-ui"
        moreLabel="all events →"
      />
      <div className="home-profile-upcoming-events__filters">
        {HOME_PROFILE_TIME_FILTER_OPTIONS.map(option => (
          <ButtonsGroup
            key={option.value}
            selected={timeFilter === option.value}
            onClick={() => setTimeFilter(option.value)}
          >
            {option.label}
          </ButtonsGroup>
        ))}
      </div>
      {isEmpty ? (
        <div className="home-profile-upcoming-events__empty">No upcoming events</div>
      ) : (
        <div className="home-profile-upcoming-events__list">
          {filteredEvents.map(event => {
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
