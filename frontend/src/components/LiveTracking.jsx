import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons in React builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const LiveTracking = ({ onLocationSelect }) => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 22.7196, // Indore default
    lng: 75.8577,
  });
  const mapRef = useRef(null);
  const initialCenteredRef = useRef(false);
  const watchIdRef = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported, using default Indore");
      return;
    }

    // Get initial location
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });

        // Center map only once
        if (mapRef.current && !initialCenteredRef.current) {
          mapRef.current.setView([latitude, longitude], 15);
          initialCenteredRef.current = true;
        }
      },
      (err) => {
        console.warn("Geolocation error:", err);
        // Fallback stays as Indore
      },
      {
        enableHighAccuracy: true, // request GPS if available
        timeout: 10000,
        maximumAge: 0,
      }
    );

    // Watch live updates (marker moves, but map doesn’t auto-center)
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (err) => console.warn("WatchPosition error:", err),
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 }
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // Manual recenter button
  const recenter = () => {
    if (mapRef.current && currentPosition) {
      mapRef.current.setView([currentPosition.lat, currentPosition.lng], 15, {
        animate: true,
      });
    }
  };

  // Handle dragging of marker
  const handleMarkerDragEnd = (e) => {
    const { lat, lng } = e.target.getLatLng();
    setCurrentPosition({ lat, lng });
    if (onLocationSelect) {
      onLocationSelect({ lat, lng });
    }
  };

  return (
    <div className="h-full w-full relative">
      {/* Recenter button */}
      <button
        onClick={recenter}
        className="absolute right-3 top-3 z-30 bg-white p-2 rounded shadow pointer-events-auto"
        style={{ width: 44, height: 44 }}
        title="Center map on me"
      >
        ⊕
      </button>

      <MapContainer
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        center={[currentPosition.lat, currentPosition.lng]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        touchZoom={true}
      >
        {/* OpenStreetMap free tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {/* Draggable marker */}
        <Marker
          position={[currentPosition.lat, currentPosition.lng]}
          draggable={true}
          eventHandlers={{ dragend: handleMarkerDragEnd }}
        >
          <Popup>
            {`Lat: ${currentPosition.lat.toFixed(5)}, Lng: ${currentPosition.lng.toFixed(5)}`}
            <br />
            Drag to adjust pickup location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LiveTracking;
