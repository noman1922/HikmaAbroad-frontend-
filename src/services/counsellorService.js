import axiosInstance from '../api/axios';

export const counsellorService = {
  // Get all counsellors (public)
  getAll: async () => {
    const response = await axiosInstance.get('/counsellors');
    return response.data;
  },

  // Get counsellor by ID (admin)
  getById: async (id) => {
    const response = await axiosInstance.get(`/counsellors/${id}`);
    return response.data;
  },
};
