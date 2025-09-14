import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validPassword = (p) => p.length >= 8 && /[A-Z]/.test(p) && /\d/.test(p);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    if (!validPassword(form.password))
      next.password = "Use 8+ chars, 1 uppercase, 1 number";
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    try {
      await signupUser(form);
      navigate("/", { replace: true });
    } catch (err) {
      setErrors((prev) => ({ ...prev, submit: "Sign up failed" }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="g-auth-bg">
      <div className="g-auth-card">
        <div className="g-auth-logo">
          <span className="g-dot g-blue" />
          <span className="g-dot g-red" />
          <span className="g-dot g-yellow" />
          <span className="g-dot g-green" />
          <span className="g-brand">NeuroFleetX</span>
        </div>
        <h1 className="g-title">Sign up</h1>
        <p className="g-subtitle">Create an account</p>

        {errors.submit && <div className="g-error">{errors.submit}</div>}

        <form className="g-form" onSubmit={submit}>
          <div className="g-field">
            <input
              className="g-input"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={update}
              autoComplete="name"
              required
            />
            {errors.name && <div className="g-error">{errors.name}</div>}
          </div>
          <div className="g-field">
            <input
              className="g-input"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={update}
              autoComplete="email"
              required
            />
            {errors.email && <div className="g-error">{errors.email}</div>}
          </div>
          <div className="g-field" style={{ position: "relative" }}>
            <input
              className="g-input"
              type={showPwd ? "text" : "password"}
              name="password"
              placeholder="Password (8+ chars, 1 uppercase, 1 number)"
              value={form.password}
              onChange={update}
              autoComplete="new-password"
              required
              style={{ paddingRight: "50px" }}
            />
            <button
              type="button"
              className="g-password-toggle"
              onClick={() => setShowPwd((v) => !v)}
              aria-label="Toggle password visibility"
            >
              {showPwd ? "Hide" : "Show"}
            </button>
            {errors.password && <div className="g-error">{errors.password}</div>}
          </div>
          <div className="g-actions">
            <button className="g-btn" type="submit" disabled={submitting}>
              {submitting ? "Creating…" : "Create account"}
            </button>
          </div>
        </form>

        <div className="g-help">
          <Link to="/">Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  );
}