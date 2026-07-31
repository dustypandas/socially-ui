import { useMemo, useState } from 'react';
import { ButtonsGroup, EventTimeline, SectionTitle } from '@src/components';
import type { EventBasic } from '@src/data';
import {
  countHomeProfileEventsByScope,
  filterHomeProfileEvents,
  type HomeProfileEventScope,
} from '../../data/homeProfileEventScopes';
import './home-profile-upcoming-events.css';

const HOME_PROFILE_EVENT_SCOPE_OPTIONS = [
  { value: 'myInterests', label: 'My interests' },
  { value: 'attending', label: 'Attending' },
  { value: 'discover', label: 'Discover' },
] as const satisfies { value: HomeProfileEventScope; label: string }[];

type HomeProfileUpcomingEventsProps = {
  events: EventBasic[];
};

export function HomeProfileUpcomingEvents({ events }: HomeProfileUpcomingEventsProps) {
  const [eventScope, setEventScope] = useState<HomeProfileEventScope>('attending');

  const scopeCounts = useMemo(
    () => countHomeProfileEventsByScope(events),
    [events],
  );

  const filteredEvents = useMemo(
    () => filterHomeProfileEvents(events, eventScope),
    [events, eventScope],
  );

  const isEmpty = filteredEvents.length === 0;

  return (
    <section id="upcoming-events" className="home-profile-upcoming-events">
      <SectionTitle
        title="Upcoming Events"
        moreHref="#/events-ui"
        moreLabel="more events →"
      />
      <div className="home-profile-upcoming-events__filters">
        {HOME_PROFILE_EVENT_SCOPE_OPTIONS.map(option => (
          <ButtonsGroup
            key={option.value}
            selected={eventScope === option.value}
            onClick={() => setEventScope(option.value)}
          >
            {option.label} ({scopeCounts[option.value]})
          </ButtonsGroup>
        ))}
      </div>
      {isEmpty ? (
        <div className="home-profile-upcoming-events__empty">No upcoming events</div>
      ) : (
        <EventTimeline events={filteredEvents} />
      )}
      <div
        className="home-profile-section__end"
        data-section-id="upcoming-events"
      />
    </section>
  );
}
