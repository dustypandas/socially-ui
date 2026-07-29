import type { EventBasic } from '@src/data';

export type HomeProfileEventScope = 'myInterests' | 'attending' | 'discover';

const HOME_PROFILE_EVENT_SCOPE_IDS: Record<HomeProfileEventScope, string[]> = {
  myInterests: [
    'lightning-talks',
    'open-mic-storytelling',
    'urban-sketching',
    'open-air-lindy-hop-class',
    'wine-tasting-event',
  ],
  attending: [
    'lightning-talks',
    'open-mic-storytelling',
  ],
  discover: [
    'psychedelic-sharing-circle',
    'urban-sketching',
    'open-air-lindy-hop-class',
    'wine-tasting-event',
  ],
};

export function filterHomeProfileEvents(
  events: EventBasic[],
  scope: HomeProfileEventScope,
): EventBasic[] {
  const ids = new Set(HOME_PROFILE_EVENT_SCOPE_IDS[scope]);
  return events.filter(event => ids.has(event.id));
}

export function countHomeProfileEventsByScope(
  events: EventBasic[],
): Record<HomeProfileEventScope, number> {
  return {
    myInterests: filterHomeProfileEvents(events, 'myInterests').length,
    attending: filterHomeProfileEvents(events, 'attending').length,
    discover: filterHomeProfileEvents(events, 'discover').length,
  };
}
