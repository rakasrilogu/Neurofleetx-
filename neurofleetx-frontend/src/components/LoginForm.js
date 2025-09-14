// src/components/LoginForm.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(false);
    setLoading(true);
    try {
      const data = await loginUser({ email: email.trim(), password });
      const token = data?.token;
      if (token) {
        localStorage.setItem("nfxtoken", token);
        navigate("/dashboard", { replace: true });
      } else {
        setShowError(true);
      }
    } catch (err) {
      setShowError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="g-auth-bg">
      <div className="g-auth-card">
        {/* 🔹 NeuroFleetX logo placed here */}
        <div className="g-auth-logo">
        <span className="g-dot g-blue"></span>
        <span className="g-dot g-red"></span>
        <span className="g-dot g-yellow"></span>
        <span className="g-dot g-green"></span>
        <h2 className="g-brand">NeuroFleetX</h2>
      </div>
        <h1 className="g-title">Sign in</h1>
        <p className="g-subtitle">Use your account</p>

        {showError && <div className="g-error">Wrong credentials. Try again.</div>}

        <form onSubmit={handleSubmit} className="g-form">
          <div className="g-field">
            <input
              type="email"
              className="g-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div className="g-field">
            <input
              type="password"
              className="g-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <div className="g-actions">
            <button type="submit" className="g-btn" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </form>

        <div className="g-help">
          <Link to="/forgot-password">Forgot password?</Link>
          <span> • </span>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}