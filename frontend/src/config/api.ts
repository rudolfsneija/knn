import axios from 'axios';

// API configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? ''  // Use relative URLs for production (goes through nginx)
  : 'http://localhost:3000';     // Development API URL

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
