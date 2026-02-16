import axiosInstance from '../api/axios';

export const serviceService = {
  // Get all active services (public)
  getAll: async () => {
    const response = await axiosInstance.get('/services');
    return response.data;
  },

  // Get service by ID (admin)
  getById: async (id) => {
    const response = await axiosInstance.get(`/services/${id}`);
    return response.data;
  },

  // Get all services including inactive (admin)
  getAllIncludingInactive: async () => {
    const response = await axiosInstance.get('/services/all');
    return response.data;
  },
};
