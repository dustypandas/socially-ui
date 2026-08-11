import { useEffect } from 'react';
import Leaflet from 'leaflet';
import {
  MapContainer as LeafletMapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import iconMapMarkerSvg from '@src/assets/icon-map-marker.svg?raw';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css';
import './map-container.css';

const MADRID_CENTER: Leaflet.LatLngExpression = [40.4168, -3.7038];

const MARKER_SIZE = 32;

const markerSvgHtml = iconMapMarkerSvg
  .replace('fill="black"', 'fill="currentColor"')
  .replace('width="24"', `width="${MARKER_SIZE}"`)
  .replace('height="24"', `height="${MARKER_SIZE}"`);

const markerIcon = Leaflet.divIcon({
  className: 'map-container__marker-icon',
  html: markerSvgHtml,
  iconSize: [MARKER_SIZE, MARKER_SIZE],
  iconAnchor: [MARKER_SIZE / 2, MARKER_SIZE],
  popupAnchor: [0, -MARKER_SIZE],
});

type MapLocation = {
  id: string;
  lat: number;
  lng: number;
  label?: string;
};

type MapContainerProps = {
  locations: MapLocation[];
  zoom?: number;
  isWide?: boolean;
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

export function MapContainer({ locations, zoom = 13, isWide = false }: MapContainerProps) {
  const firstLocation = locations[0];
  const center = locations.length === 1 && firstLocation
    ? [firstLocation.lat, firstLocation.lng] satisfies Leaflet.LatLngExpression
    : MADRID_CENTER;

  return (
    <div className={['map-container', isWide && 'map-container--wide'].filter(Boolean).join(' ')}>
      <LeafletMapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="map-container__canvas"
        attributionControl={false}
      >
        <MapResizeHandler />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading maxClusterRadius={50}>
          {locations.map(location => (
            <Marker key={location.id} position={[location.lat, location.lng]} icon={markerIcon}>
              {location.label && <Popup>{location.label}</Popup>}
            </Marker>
          ))}
        </MarkerClusterGroup>
      </LeafletMapContainer>
    </div>
  );
}
