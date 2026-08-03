import { useMemo, useState } from 'react';
import { ButtonsGroup, EventTimeline, SectionTitle } from '@src/components';
import type { EventBasic, HomeEventIdsMap, HomeProfileEventScope } from '@src/common-libs/types';
import './home-profile-upcoming-events.css';

const HOME_PROFILE_EVENT_SCOPE_OPTIONS = [
  { value: 'myInterests', label: 'My interests' },
  { value: 'attending', label: 'Attending' },
  { value: 'discover', label: 'Discover' },
] as const satisfies { value: HomeProfileEventScope; label: string }[];

type HomeProfileUpcomingEventsProps = {
  events: EventBasic[];
  eventScopeIds: Record<HomeProfileEventScope, HomeEventIdsMap>;
};

export function HomeProfileUpcomingEvents({ events, eventScopeIds }: HomeProfileUpcomingEventsProps) {
  const [eventScope, setEventScope] = useState<HomeProfileEventScope>('attending');

  const filteredEvents = useMemo(
    () => filterHomeProfileEvents(events, eventScope, eventScopeIds),
    [events, eventScope, eventScopeIds],
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
            {option.label} ({Object.keys(eventScopeIds[option.value]).length})
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

function filterHomeProfileEvents(
  events: EventBasic[],
  scope: HomeProfileEventScope,
  eventScopeIds: Record<HomeProfileEventScope, HomeEventIdsMap>,
): EventBasic[] {
  const ids = eventScopeIds[scope];
  return events.filter(event => event.id in ids);
}