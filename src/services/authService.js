import axiosInstance from '../api/axios';

export const authService = {
  // Admin login - returns JWT token on success
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    });
    
    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Get current token
  getToken: () => {
    return localStorage.getItem('authToken');
  },
};
