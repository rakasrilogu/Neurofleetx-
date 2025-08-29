import React, { useEffect, useState } from 'react';
import axios from 'axios';

import VehicleForm from '../components/VehicleForm';
import VehicleTable from '../components/VehicleTable';
import MapComponent from '../components/MapComponent';
import AnalyticsChart from '../components/AnalyticsChart';

import { connectVehicleTopic, disconnectVehicleTopic } from '../services/websocket';

const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const wsUrl = process.env.REACT_APP_WS_URL || 'http://localhost:8080/ws';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({ vehicles: 0, activeTrips: 0, alerts: 0, lastUpdated: null });
  const [vehicles, setVehicles] = useState([]);

  // Load dashboard metrics (protected)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const controller = new AbortController();

    axios
      .get(`${apiBase}/dashboard`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        signal: controller.signal,
      })
      .then((res) => setMetrics(res.data))
      .catch((err) => console.error('Dashboard load error:', err));

    return () => controller.abort();
  }, []);

  // Live vehicles via STOMP over SockJS
  useEffect(() => {
    const sub = connectVehicleTopic(wsUrl, (payload) => {
      if (Array.isArray(payload?.vehicles)) setVehicles(payload.vehicles);
    });
    return () => disconnectVehicleTopic(sub);
  }, []);

  return (
    <div style={{ padding: 16, display: 'grid', gap: 16 }}>
      <h2>Dashboard</h2>

      <div style={{ display: 'flex', gap: 16 }}>
        <InfoCard label="Vehicles" value={metrics.vehicles} />
        <InfoCard label="Active Trips" value={metrics.activeTrips} />
        <InfoCard label="Alerts" value={metrics.alerts} />
      </div>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
          <h3>Live Vehicles</h3>
          <VehicleTable vehicles={vehicles} />
        </div>
        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
          <h3>Add Vehicle</h3>
          <VehicleForm />
        </div>
      </div>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, minHeight: 360 }}>
          <h3>Map</h3>
          <MapComponent vehicles={vehicles} />
        </div>
        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, minHeight: 360 }}>
          <h3>Analytics</h3>
          <AnalyticsChart vehicles={vehicles} />
        </div>
      </div>

      <p style={{ marginTop: 8, color: '#666' }}>
        Last updated: {metrics.lastUpdated ? new Date(metrics.lastUpdated).toLocaleString() : '—'}
      </p>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12, minWidth: 160 }}>
      <div style={{ fontSize: 12, color: '#666' }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
