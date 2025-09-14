// src/components/MapComponent.js
import React, { useMemo, useCallback, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function MapComponent({ vehicles = [] }) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";

  // Safe: don’t call the loader if no API key
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  const mapRef = useRef(null);
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const center = useMemo(() => ({ lat: 12.9716, lng: 77.5946 }), []);

  const positions = useMemo(() => {
    return vehicles
      .map((v) => {
        if (typeof v?.lat === "number" && typeof v?.lng === "number") return { lat: v.lat, lng: v.lng };
        if (typeof v?.latitude === "number" && typeof v?.longitude === "number") return { lat: v.latitude, lng: v.longitude };
        if (Array.isArray(v?.coords) && v.coords.length === 2) {
          const [a, b] = v.coords;
          if (typeof a === "number" && typeof b === "number") return { lat: a, lng: b };
        }
        if (typeof v?.location === "string") {
          const [a, b] = v.location.split(",").map((s) => parseFloat(s.trim()));
          if (!Number.isNaN(a) && !Number.isNaN(b)) return { lat: a, lng: b };
        }
        return null;
      })
      .filter(Boolean);
  }, [vehicles]);

  if (loadError) return <div>Error loading Google Maps. Check your API key.</div>;
  if (!apiKey) return <div>No Google Maps API key provided.</div>;
  if (!isLoaded) return <div>Loading map…</div>;

  return (
    <GoogleMap
      onLoad={onLoad}
      center={positions[0] || center}
      zoom={positions.length ? 11 : 10}
      mapContainerStyle={{ width: "100%", height: "360px" }}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {positions.map((pos, i) => (
        <Marker
          key={vehicles[i]?.id ?? vehicles[i]?.license_plate ?? i}
          position={pos}
          title={vehicles[i]?.license_plate ?? vehicles[i]?.licensePlate ?? `Vehicle ${i + 1}`}
        />
      ))}
    </GoogleMap>
  );
}
