// src/hooks/useVehicleForm.js
import { useCallback, useMemo, useState } from "react";
import { createVehicle } from "../services/api";

// Simple plate pattern like KA-01-AB-1234; adjust as needed
const plateRegex = /^[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4}$/;

export default function useVehicleForm({ initialStatus = "active", onCreated } = {}) {
  const [values, setValues] = useState({
    license_plate: "",
    status: initialStatus,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = useCallback((v) => {
    const e = {};
    if (!v.license_plate?.trim()) e.license_plate = "License plate is required";
    else if (!plateRegex.test(v.license_plate.trim().toUpperCase())) {
      e.license_plate = "Format like KA-01-AB-1234";
    }
    if (!v.status) e.status = "Status is required";
    return e;
  }, []);

  const onChange = useCallback((name, next) => {
    setValues((prev) => ({ ...prev, [name]: next }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerError("");
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      if (e?.preventDefault) e.preventDefault();
      const next = {
        license_plate: values.license_plate.trim().toUpperCase(),
        status: values.status,
      };
      const ve = validate(next);
      setErrors(ve);
      if (Object.keys(ve).length) return;

      setSubmitting(true);
      setServerError("");
      try {
        await createVehicle(next);
        // Reset form on success
        setValues({ license_plate: "", status: initialStatus });
        onCreated && onCreated();
      } catch (err) {
        // Axios error shapes: response/request/message
        if (err?.response) {
          const msg =
            err.response.data?.error ||
            err.response.data?.message ||
            `Error ${err.response.status}`;
          setServerError(msg);
        } else if (err?.request) {
          setServerError("Network error");
        } else {
          setServerError(err?.message || "Unexpected error");
        }
      } finally {
        setSubmitting(false);
      }
    },
    [values, validate, onCreated, initialStatus]
  );

  const bindings = useMemo(
    () => ({
      values,
      errors,
      serverError,
      submitting,
      onChange,
      handleSubmit,
      setValues, // exposed for advanced cases (optional)
    }),
    [values, errors, serverError, submitting, onChange, handleSubmit]
  );

  return bindings;
}
