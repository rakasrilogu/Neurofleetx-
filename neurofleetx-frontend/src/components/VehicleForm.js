import React, { useState } from "react";
import { createVehicle } from "../services/api";

export default function VehicleForm({ onCreated }) {
  const [licensePlate, setLicensePlate] = useState("");
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createVehicle({ license_plate: licensePlate.trim().toUpperCase(), status });
      setLicensePlate("");
      setStatus("active");
      onCreated && onCreated();
    } catch (err) {
      if (err.response) {
        setError(`Error ${err.response.status}`);
      } else if (err.request) {
        setError("Network error");
      } else {
        setError("Client setup error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <input
        placeholder="KA-01-AB-1234"
        value={licensePlate}
        onChange={(e) => setLicensePlate(e.target.value)}
        required
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="active">active</option>
        <option value="idle">idle</option>
        <option value="maintenance">maintenance</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? "Adding…" : "Add"}
      </button>
    </form>
  );
}
