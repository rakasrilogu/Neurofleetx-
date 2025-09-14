import React, { useEffect, useState } from "react";
import api, { listVehicles } from "../services/api";
import VehicleForm from "../components/VehicleForm";
import VehicleTable from "../components/VehicleTable";
import MapComponent from "../components/MapComponent";
import AnalyticsChart from "../components/AnalyticsChart";
import "./dashboard.css";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    vehicles: 0,
    activeTrips: 0,
    alerts: 0,
    lastUpdated: null,
  });

  const [vehicles, setVehicles] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(false);
  const [vehError, setVehError] = useState("");

  // Load dashboard metrics
  useEffect(() => {
    const controller = new AbortController();
    api
      .get("/dashboard", { signal: controller.signal })
      .then((res) => setMetrics(res.data))
      .catch((err) => console.error("Dashboard load error:", err));
    return () => controller.abort();
  }, []);

  // Load vehicle list
  const fetchVehicles = async () => {
    setLoadingVehicles(true);
    setVehError("");
    try {
      const rows = await listVehicles();
      const list = Array.isArray(rows) ? rows : [];
      setVehicles(list);
      setMetrics((m) => ({
        ...m,
        vehicles: list.length,
        lastUpdated: new Date().toISOString(),
      }));
    } catch (err) {
      console.error("Vehicles fetch error:", err);
      setVehError("Could not load vehicles");
    } finally {
      setLoadingVehicles(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div style={{ padding: 16, display: "grid", gap: 16 }}>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: 16 }}>
        <InfoCard label="Vehicles" value={metrics.vehicles} />
        <InfoCard label="Active Trips" value={metrics.activeTrips} />
        <InfoCard label="Alerts" value={metrics.alerts} />
      </div>

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
          <h3>Live Vehicles</h3>
          {vehError ? (
            <div style={{ color: "red" }}>{vehError}</div>
          ) : (
            <VehicleTable vehicles={vehicles} />
          )}
          {loadingVehicles && <div>Loading…</div>}
        </div>

        <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
          <h3>Add Vehicle</h3>
          <VehicleForm onCreated={fetchVehicles} />
        </div>
      </div>

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
        <div
          style={{ border: "1px solid #eee", borderRadius: 8, padding: 12, minHeight: 360 }}
        >
          <h3>Map</h3>
          <MapComponent vehicles={vehicles} />
        </div>

        <div
          style={{ border: "1px solid #eee", borderRadius: 8, padding: 12, minHeight: 360 }}
        >
          <h3>Analytics</h3>
          <AnalyticsChart vehicles={vehicles} />
        </div>
      </div>

      <p style={{ marginTop: 8, color: "#666" }}>
        Last updated: {metrics.lastUpdated ? new Date(metrics.lastUpdated).toLocaleString() : "—"}
      </p>
    </div>
  );
}

// InfoCard component
function InfoCard({ label, value }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12, minWidth: 160 }}>
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
