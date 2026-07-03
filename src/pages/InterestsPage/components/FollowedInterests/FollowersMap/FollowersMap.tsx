import { useEffect } from 'react';
import Leaflet from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import type { MemberFollower } from '../../../../../data/dummyData';
import iconMapMarkerSvg from '../../../../../assets/icon-map-marker.svg?raw';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css';
import './followers-map.css';

const MADRID_CENTER: Leaflet.LatLngExpression = [40.4168, -3.7038];

const MARKER_SIZE = 32;

const markerSvgHtml = iconMapMarkerSvg
  .replace('fill="black"', 'fill="currentColor"')
  .replace('width="24"', `width="${MARKER_SIZE}"`)
  .replace('height="24"', `height="${MARKER_SIZE}"`);

const followerMarkerIcon = Leaflet.divIcon({
  className: 'followers-map__marker-icon',
  html: markerSvgHtml,
  iconSize: [MARKER_SIZE, MARKER_SIZE],
  iconAnchor: [MARKER_SIZE / 2, MARKER_SIZE],
  popupAnchor: [0, -MARKER_SIZE],
});

type FollowersMapProps = {
  followers: MemberFollower[];
  followersCount?: number;
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

export function FollowersMap({ followers, followersCount }: FollowersMapProps) {
  return (
    <div className="followers-map-wrap">
      {followersCount != null && (
        <h3 className="global-heading-text followers-map__title">{followersCount}+ followers</h3>
      )}
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
            <Marker key={follower.id} position={[follower.lat, follower.lng]} icon={followerMarkerIcon}>
              <Popup>{follower.name}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      </div>
    </div>
  );
}
