import type { MapLocation } from '@src/common-libs/types';
import { MapContainer } from '@src/components';
import './community-locations.css';

type CommunityLocationsProps = {
  locations: Array<MapLocation & { id: string }>;
};

export function CommunityLocations({ locations }: CommunityLocationsProps) {
  if (locations.length === 0) {
    return null;
  }

  return (
    <section className="community-locations">
      <h3 className="community-organisers__title">
        Recent Locations
      </h3>
      <MapContainer locations={locations} isWide />
    </section>
  );
}
