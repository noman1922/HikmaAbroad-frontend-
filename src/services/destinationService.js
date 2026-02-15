import axiosInstance from '../api/axios';

export const destinationService = {
  // Get all active destinations (public)
  getAll: async () => {
    const response = await axiosInstance.get('/destinations');
    return response.data;
  },

  // Get destination by ID (admin)
  getById: async (id) => {
    const response = await axiosInstance.get(`/destinations/${id}`);
    return response.data;
  },

  // Get all destinations including inactive (admin)
  getAllIncludingInactive: async () => {
    const response = await axiosInstance.get('/destinations/all');
    return response.data;
  },

  // Use getAll for featured destinations (no specific endpoint)
  getFeatured: async () => {
    const response = await axiosInstance.get('/destinations');
    return response.data;
  },
};
