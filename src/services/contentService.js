import axiosInstance from '../api/axios';

export const contentService = {
  // Get aggregated home page data
  getHomePage: async () => {
    const response = await axiosInstance.get('/home');
    return response.data;
  },

  // Get a page by its key (public)
  getPageByKey: async (key) => {
    const response = await axiosInstance.get(`/pages/${key}`);
    return response.data;
  },

  // Get about page
  getAbout: async () => {
    const response = await axiosInstance.get('/pages/about');
    return response.data;
  },

  // Get all pages (admin)
  getAllPages: async () => {
    const response = await axiosInstance.get('/pages');
    return response.data;
  },

  // Get site settings
  getSettings: async () => {
    const response = await axiosInstance.get('/settings');
    return response.data;
  },
};
