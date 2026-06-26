import { useEffect } from 'react';
import Leaflet from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import type { InterestFollower } from '../../../../../data/dummyData';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css';
import './followers-map.css';

const MADRID_CENTER: Leaflet.LatLngExpression = [40.4168, -3.7038];

Leaflet.Icon.Default.mergeOptions({});

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
        zoom={13}
        scrollWheelZoom={false}
        className="followers-map__canvas"
        attributionControl={false}
      >
        <MapResizeHandler />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading maxClusterRadius={50}>
          {followers.map(follower => (
            <Marker key={follower.id} position={[follower.lat, follower.lng]}>
              <Popup>{follower.name}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
