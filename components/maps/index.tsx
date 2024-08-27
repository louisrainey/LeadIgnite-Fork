import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapComponentProps {
  apiKey: string;
  center: { lat: number; lng: number };
  markers: { lat: number; lng: number }[];
  zoom: number;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const MapComponent: React.FC<MapComponentProps> = ({
  apiKey,
  center,
  markers,
  zoom
}) => {
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
