import React from 'react';

// Minimal placeholder that compiles without extra map libraries.
// Replace with a real map later if desired.
export default function MapComponent({ vehicles = [] }) {
  return (
    <div style={{ height: 300, background: '#f6f8fa', borderRadius: 8, padding: 8 }}>
      <div style={{ fontSize: 12, color: '#555', marginBottom: 6 }}>
        Map placeholder (render markers here later)
      </div>
      <pre style={{ fontSize: 12, whiteSpace: 'pre-wrap' }}>
        {JSON.stringify(vehicles.slice(0, 3), null, 2)}
      </pre>
    </div>
  );
}
