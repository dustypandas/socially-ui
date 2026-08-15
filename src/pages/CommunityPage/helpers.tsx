import type { ReactNode } from 'react';
import type { EventBasic, MapLocation } from '@src/common-libs/types';

export function nameAndOthersLabel(members: { label: string }[]): ReactNode {
  const primary = members[0]?.label;

  return (
    <>
      <strong>{primary}</strong>
      {members.length > 1 && (
        <>
          {' '}
          and {members.length - 1} {members.length > 2 ? 'others' : 'other'}
        </>
      )}
    </>
  );
}

export function getMapLocationsFromEvents(
  events: EventBasic[],
): Array<MapLocation & { id: string }> {
  return events.map(event => ({
    id: event.id,
    label: event.location.label,
    lat: event.location.lat,
    lng: event.location.lng,
  }));
}
