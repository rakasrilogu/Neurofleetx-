// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
}); // baseURL via instance [21][22]

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("nfxtoken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
); // add Authorization automatically [6][23]

// Auth
export const loginUser = async ({ email, password }) => {
  const res = await api.post("/auth/login", { email, password });
  if (res?.data?.token) {
    localStorage.setItem("nfxtoken", res.data.token);
  }
  return res.data;
}; // persist token on login [24][6]

export const signupUser = async ({ name, email, password }) => {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data;
}; // simple register helper [24]

export const logoutUser = () => localStorage.removeItem("nfxtoken"); // clear token [6]

// Vehicles
export const listVehicles = async () => {
  const res = await api.get("/vehicles");
  return res.data;
}; // list [24]

export const createVehicle = async (payload) => {
  const res = await api.post("/vehicles", payload);
  return res.data;
}; // create [24]

export default api;
