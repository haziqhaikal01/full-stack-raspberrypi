// SORT DATA USING TAG KEYS (VERSION 5.1, 5.2)
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Location data
const locations: { id: string; name: string; coords: [number, number] }[] = [
  { id: "manchester", name: "Manchester", coords: [53.483959, -2.244644] },
  { id: "scotland", name: "Scotland", coords: [56.4907, -4.2026] },
];

// ✅ Component to update the map's view (center & zoom)
const ChangeView = ({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const GBMap = ({
  setSelectedLocation,
}: {
  setSelectedLocation: (location: string) => void;
}) => {
  const [center, setCenter] = useState<[number, number]>([
    53.483959, -2.244644,
  ]);
  const [zoom, setZoom] = useState(6); // ✅ Store zoom as state

  return (
    <MapContainer className="map-container">
      <ChangeView center={center} zoom={zoom} />{" "}
      {/* ✅ Updates center & zoom dynamically */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={location.coords}
          eventHandlers={{
            click: () => {
              setSelectedLocation(location.id);
              setCenter(location.coords);
              setZoom(8); // ✅ Adjust zoom dynamically if needed
            },
          }}
        >
          <Popup>
            <strong>{location.name}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default GBMap;
