import React, { useEffect, useState } from "react";
import { listVehicles } from "../services/api";

function Th({ children }) {
  return <th style={{ textAlign: "left", padding: "8px 6px" }}>{children}</th>;
}
function Td({ children }) {
  return <td style={{ padding: "8px 6px" }}>{children}</td>;
}

export default function VehicleTable({ refreshKey = 0 }) {
  const [vehicles, setVehicles] = useState([]);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await listVehicles();
        if (!ignore) {
          setVehicles(Array.isArray(data) ? data : []);
          setErrorText("");
        }
      } catch (err) {
        if (!ignore) {
          if (err?.response) {
            console.error("Vehicles error:", err.response.status, err.response.data);
            setErrorText(`Error ${err.response.status}`);
          } else if (err?.request) {
            console.error("Vehicles network error:", err.request);
            setErrorText("Network error");
          } else {
            console.error("Vehicles setup error:", err?.message);
            setErrorText("Client setup error");
          }
        }
      }
    }

    load();
    return () => { ignore = true; };
  }, [refreshKey]);

  if (errorText) return <div style={{ color: "red" }}>Could not load vehicles</div>;
  if (!vehicles.length) return <div>No vehicles</div>;

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#fafafa" }}>
            <Th>ID</Th>
            <Th>Plate</Th>
            <Th>Status</Th>
            <Th>Location</Th>
            <Th>Mileage</Th>
            <Th>Fuel</Th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v, idx) => (
            <tr key={v.id ?? v.license_plate ?? idx} style={{ borderTop: "1px solid #eee" }}>
              <Td>{v.id}</Td>
              <Td>{v.license_plate}</Td>
              <Td>{v.status}</Td>
              <Td>{v.location ?? "-"}</Td>
              <Td>{v.mileage ?? "-"}</Td>
              <Td>{v.fuel_level != null ? `${v.fuel_level}%` : "-"}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
