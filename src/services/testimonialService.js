import axiosInstance from '../api/axios';

export const testimonialService = {
  // Get all student experiences (testimonials)
  getAll: async () => {
    const response = await axiosInstance.get('/experiences');
    return response.data;
  },

  // Get featured experiences (use getAll, no specific endpoint)
  getFeatured: async () => {
    const response = await axiosInstance.get('/experiences');
    return response.data;
  },

  // Get experience by ID (admin)
  getById: async (id) => {
    const response = await axiosInstance.get(`/experiences/${id}`);
    return response.data;
  },
};
