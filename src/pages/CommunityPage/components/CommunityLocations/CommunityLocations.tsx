import type { MapLocation } from '@src/common-libs/types';
import { MapContainer } from '../../../../components/MapContainer/MapContainer';
import './community-locations.css';

type CommunityLocationsProps = {
  locations: Array<MapLocation & { id: string }>;
  title?: string;
};

export function CommunityLocations({
  locations,
  title = 'Recent Locations',
}: CommunityLocationsProps) {
  if (locations.length === 0) {
    return null;
  }

  return (
    <section className="community-locations">
      <h3 className="community-organisers__title">
        {title}
      </h3>
      <MapContainer locations={locations} isWide />
    </section>
  );
}
