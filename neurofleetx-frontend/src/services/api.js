import axios from 'axios';


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nfxtoken');
  if (!config.headers) config.headers = {};

  if (token) {
    
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});


function unwrapError(error) {
  if (error?.response?.data) return error.response.data;
  if (error?.message) return { message: error.message };
  return { message: 'Network or server error' };
}


export const loginUser = async (credentials) => {
  try {
    const res = await api.post('/auth/login', credentials);
    return res.data; // { token, user: { ... } }
  } catch (err) {
    throw unwrapError(err);
  }
};


export const fetchDashboardData = async () => {
  try {
    const res = await api.get('/dashboard');
    return res.data; 
  } catch (err) {
    throw unwrapError(err);
  }
};

export default api;
