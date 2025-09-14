import React from 'react';
export default function AnalyticsChart({ vehicles = [] }) {
  const active = vehicles.filter((v) => v.status === 'active').length;
  const idle = vehicles.filter((v) => v.status === 'idle').length;
  const maintenance = vehicles.filter((v) => v.status === 'maintenance').length;

  return (
    <div style={{ height: 300, background: '#f6f8fa', borderRadius: 8, padding: 8 }}>
      <div style={{ fontSize: 12, color: '#555', marginBottom: 6 }}>
        Analytics placeholder (replace with charts)
      </div>
      <ul style={{ margin: 0, paddingLeft: 16, lineHeight: 1.8 }}>
        <li>Active: {active}</li>
        <li>Idle: {idle}</li>
        <li>Maintenance: {maintenance}</li>
      </ul>
    </div>
  );
}

