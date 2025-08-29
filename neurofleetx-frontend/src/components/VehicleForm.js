import React, { useState } from 'react';

export default function VehicleForm({ onAdd }) {
  const [licensePlate, setLicensePlate] = useState('');
  const [status, setStatus] = useState('active');

  const submit = (e) => {
    e.preventDefault();
    const v = {
      id: Date.now(),
      licensePlate: licensePlate || 'NEW-PLATE',
      location: '0,0',
      status,
      mileage: 0,
      fuelLevel: 100,
    };
    onAdd?.(v);
    setLicensePlate('');
    setStatus('active');
  };

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <label>
        License Plate
        <input
          type="text"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          placeholder="KA-01-AB-1234"
          style={{ width: '100%' }}
        />
      </label>
      <label>
        Status
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '100%' }}>
          <option value="active">active</option>
          <option value="idle">idle</option>
          <option value="maintenance">maintenance</option>
        </select>
      </label>
      <button type="submit">Add</button>
    </form>
  );
}
