import { useEffect } from 'react';
import Leaflet from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import type { InterestFollower } from '../../../../data/dummyData';
// import iconUrl from '../../../../assets/icon-map-marker.svg';
// import iconRetinaUrl from '../../../../assets/icon-map-marker.svg';
// import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import './followers-map.css';

const MADRID_CENTER: Leaflet.LatLngExpression = [40.4168, -3.7038];

Leaflet.Icon.Default.mergeOptions({
  // iconUrl,
  // iconRetinaUrl,
  // shadowUrl,
});

type FollowersMapProps = {
  followers: InterestFollower[];
};

function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    const invalidate = () => map.invalidateSize();

    invalidate();
    window.addEventListener('resize', invalidate);
    return () => window.removeEventListener('resize', invalidate);
  }, [map]);

  return null;
}

export function FollowersMap({ followers }: FollowersMapProps) {
  return (
    <div className="followers-map">
      <MapContainer
        center={MADRID_CENTER}
        zoom={12}
        scrollWheelZoom={false}
        className="followers-map__canvas"
      >
        <MapResizeHandler />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {followers.map(follower => (
          <Marker key={follower.id} position={[follower.lat, follower.lng]}>
            <Popup>{follower.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
