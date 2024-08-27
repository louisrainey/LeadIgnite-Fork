import React, { useState, useRef } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  DrawingManager
} from '@react-google-maps/api';

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
  const [drawingMode, setDrawingMode] =
    useState<google.maps.drawing.OverlayType | null>(null);
  const [shapeDrawn, setShapeDrawn] = useState(false);
  const [boundaryApplied, setBoundaryApplied] = useState(false);
  const shapeRef = useRef<any>(null);

  const onShapeComplete = (shape: any) => {
    if (shapeRef.current) {
      shapeRef.current.setMap(null); // Remove previous shape if exists
    }
    shapeRef.current = shape; // Store the new shape
    setDrawingMode(null);
    setShapeDrawn(true);
  };

  const handleCancel = () => {
    if (shapeRef.current) {
      shapeRef.current.setMap(null); // Remove shape from map
      shapeRef.current = null; // Clear the reference
    }
    setShapeDrawn(false);
    console.log('Drawing canceled');
  };

  const handleApply = () => {
    if (shapeRef.current) {
      shapeRef.current.setMap(null); // Hide shape from the map after applying
    }
    setBoundaryApplied(true);
    setShapeDrawn(false);
    console.log('Drawing applied');
  };

  const handleRemoveBoundaries = () => {
    if (shapeRef.current) {
      shapeRef.current.setMap(null); // Remove the shape completely
      shapeRef.current = null;
    }
    setBoundaryApplied(false);
    console.log('Boundaries removed');
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={['drawing']}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}

        {!boundaryApplied && (
          <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 transform rounded-lg bg-white p-2 text-center opacity-50 shadow-lg transition-opacity duration-300 hover:opacity-100">
            {!drawingMode ? (
              <p className="mb-2 text-sm font-semibold text-gray-800">
                Draw a shape around the properties you`d like to search for
              </p>
            ) : (
              <p className="mb-2 text-center text-sm font-semibold text-gray-800">
                Start Drawing!
              </p>
            )}
            {!shapeDrawn && (
              <div className="mb-2 flex justify-center space-x-2">
                <button
                  className="rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
                  onClick={() =>
                    setDrawingMode(google.maps.drawing.OverlayType.POLYGON)
                  }
                >
                  Polygon
                </button>
                <button
                  className="rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
                  onClick={() =>
                    setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE)
                  }
                >
                  Rectangle
                </button>
                <button
                  className="rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
                  onClick={() =>
                    setDrawingMode(google.maps.drawing.OverlayType.CIRCLE)
                  }
                >
                  Circle
                </button>
                <button
                  className="rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
                  onClick={() =>
                    setDrawingMode(google.maps.drawing.OverlayType.POLYLINE)
                  }
                >
                  Polyline
                </button>
              </div>
            )}
            {shapeDrawn && (
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleCancel}
                  className="rounded bg-gray-300 px-4 py-1 text-black shadow hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  className="rounded bg-blue-600 px-4 py-1 text-white shadow hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        )}

        {boundaryApplied && (
          <div
            onClick={handleRemoveBoundaries}
            className="absolute right-4 top-4 z-10 flex cursor-pointer items-center rounded-lg bg-red-500 px-4 py-2 text-white shadow-lg hover:bg-red-600"
          >
            <span className="mr-2">Remove Boundaries</span>
            <button>&#x2715;</button>
          </div>
        )}

        <DrawingManager
          onPolygonComplete={onShapeComplete}
          onRectangleComplete={onShapeComplete}
          onCircleComplete={onShapeComplete}
          onPolylineComplete={onShapeComplete}
          options={{
            drawingControl: false,
            drawingMode: drawingMode,
            polygonOptions: {
              fillColor: '#2196F3',
              fillOpacity: 0.5,
              strokeWeight: 2,
              clickable: false,
              editable: true,
              zIndex: 1
            }
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
