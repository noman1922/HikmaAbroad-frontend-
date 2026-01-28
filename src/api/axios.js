import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5076/api/v1';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error('Bad Request:', data.message || 'Invalid request');
          break;
        case 401:
          console.error('Unauthorized: Please log in');
          localStorage.removeItem('authToken');
          // Only redirect to login for admin routes
          if (window.location.pathname.startsWith('/admin')) {
            window.location.href = '/admin/login';
          }
          break;
        case 403:
          console.error('Forbidden: You do not have permission');
          break;
        case 404:
          console.error('Not Found:', data.message || 'Resource not found');
          break;
        case 500:
          console.error('Server Error:', data.message || 'Internal server error');
          break;
        default:
          console.error(`Error ${status}:`, data.message || 'An error occurred');
      }

      // Return a standardized error object
      return Promise.reject({
        status,
        message: data.message || data.error || 'An error occurred',
        data: data,
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error: No response from server');
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your internet connection.',
        data: null,
      });
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return Promise.reject({
        status: -1,
        message: error.message || 'An unexpected error occurred',
        data: null,
      });
    }
  }
);

export default axiosInstance;
