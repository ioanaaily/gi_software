import axios from 'axios';
import config from '../config/config';

// Create a base axios instance with common configuration
const api = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for authentication
api.interceptors.request.use(
  config => {
    // Add authentication token to requests if available
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  response => response,
  error => {
    // Only log errors in development
    if (process.env.NODE_ENV !== 'production') {
      console.error('API Error:', error.message);
      
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
    }
    
    // Handle specific error cases
    if (error.response && error.response.status === 401) {
      // Unauthorized - could redirect to login
      // For future implementation: window.location.href = '/login';
      console.log('User is not authorized');
    }
    
    return Promise.reject(error);
  }
);

export default api;