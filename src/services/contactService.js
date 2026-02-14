import axiosInstance from '../api/axios';

export const contactService = {
  // Submit contact form
  submit: async (data) => {
    const response = await axiosInstance.post('/students', {
      ...data,
      source: 'contact',
      isSubmitted: true,
    });
    return response.data.data;
  },

  // Get a contact draft by draftToken (public)
  getDraft: async (draftToken) => {
    const response = await axiosInstance.get(`/students/draft/${draftToken}`);
    return response.data.data;
  },

  // Save/update contact draft
  saveDraft: async (data) => {
    const response = await axiosInstance.post('/students', {
      ...data,
      source: 'contact',
      isSubmitted: false,
    });
    return response.data.data;
  },
};
