import axios from 'axios';

// Axios instance with base URL from CRA .env (must use REACT_APP_ prefix)
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Safely add Authorization header if a token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nfxtoken');
  if (!config.headers) config.headers = {};

  if (token) {
    // Use backticks for template literal interpolation
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

// Helper to normalize errors
function unwrapError(error) {
  if (error?.response?.data) return error.response.data;
  if (error?.message) return { message: error.message };
  return { message: 'Network or server error' };
}

// POST /auth/login
export const loginUser = async (credentials) => {
  try {
    const res = await api.post('/auth/login', credentials);
    return res.data; // { token, user: { ... } }
  } catch (err) {
    throw unwrapError(err);
  }
};

// GET /dashboard (token added by interceptor)
export const fetchDashboardData = async () => {
  try {
    const res = await api.get('/dashboard');
    return res.data; // { vehicles, activeTrips, alerts, ... }
  } catch (err) {
    throw unwrapError(err);
  }
};

export default api;
