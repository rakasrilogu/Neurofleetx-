import React from 'react';

export default function VehicleTable({ vehicles = [] }) {
  if (!vehicles.length) return <div>No vehicles</div>;

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#fafafa' }}>
            <Th>ID</Th>
            <Th>Plate</Th>
            <Th>Status</Th>
            <Th>Location</Th>
            <Th>Mileage</Th>
            <Th>Fuel</Th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id} style={{ borderTop: '1px solid #eee' }}>
              <Td>{v.id}</Td>
              <Td>{v.licensePlate}</Td>
              <Td>{v.status}</Td>
              <Td>{v.location}</Td>
              <Td>{v.mileage}</Td>
              <Td>{v.fuelLevel}%</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }) {
  return <th style={{ textAlign: 'left', padding: '8px 6px' }}>{children}</th>;
}
function Td({ children }) {
  return <td style={{ padding: '8px 6px' }}>{children}</td>;
}
