import axiosInstance from '../api/axios';

export const applicationService = {
  // Submit or save a student application draft
  // If draftToken matches existing draft, it updates it
  // If isSubmitted=true, marks as submitted
  submit: async (data) => {
    const response = await axiosInstance.post('/students', {
      ...data,
      source: 'application',
    });
    return response.data.data;
  },

  // Get a student draft by draftToken (public)
  getDraft: async (draftToken) => {
    const response = await axiosInstance.get(`/students/draft/${draftToken}`);
    return response.data.data;
  },

  // Save draft (same endpoint as submit, but with isSubmitted=false)
  saveDraft: async (data) => {
    const response = await axiosInstance.post('/students', {
      ...data,
      source: 'application',
      isSubmitted: false,
    });
    return response.data.data;
  },

  // Update draft (same endpoint, include draftToken in data)
  updateDraft: async (draftToken, data) => {
    const response = await axiosInstance.post('/students', {
      ...data,
      draftToken,
      source: 'application',
      isSubmitted: false,
    });
    return response.data.data;
  },
};
