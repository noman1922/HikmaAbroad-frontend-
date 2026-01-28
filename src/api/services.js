import axiosInstance from './axios';

/**
 * Centralized API Service Layer
 * All API calls go through this layer for consistency and error handling
 */

// ============================================================================
// HOME SERVICE
// ============================================================================
export const homeService = {
  /**
   * Get aggregated home page data
   * @returns {Promise} Home page data including hero, destinations, services, etc.
   */
  getHomePage: async () => {
    const response = await axiosInstance.get('/home');
    return response.data;
  },
};

// ============================================================================
// DESTINATION SERVICE
// ============================================================================
export const destinationService = {
  /**
   * Get all active destinations (public)
   * @returns {Promise} Array of active destinations
   */
  getAll: async () => {
    const response = await axiosInstance.get('/destinations');
    return response.data;
  },

  /**
   * Get destination by ID
   * @param {string} id - Destination ID
   * @returns {Promise} Destination details
   */
  getById: async (id) => {
    const response = await axiosInstance.get(`/destinations/${id}`);
    return response.data;
  },

  /**
   * Get all destinations including inactive (admin)
   * @returns {Promise} Array of all destinations
   */
  getAllIncludingInactive: async () => {
    const response = await axiosInstance.get('/destinations/all');
    return response.data;
  },
};

// ============================================================================
// SERVICE SERVICE
// ============================================================================
export const serviceService = {
  /**
   * Get all active services (public)
   * @returns {Promise} Array of active services
   */
  getAll: async () => {
    const response = await axiosInstance.get('/services');
    return response.data;
  },

  /**
   * Get service by ID
   * @param {string} id - Service ID
   * @returns {Promise} Service details
   */
  getById: async (id) => {
    const response = await axiosInstance.get(`/services/${id}`);
    return response.data;
  },

  /**
   * Get all services including inactive (admin)
   * @returns {Promise} Array of all services
   */
  getAllIncludingInactive: async () => {
    const response = await axiosInstance.get('/services/all');
    return response.data;
  },
};

// ============================================================================
// STUDENT SERVICE (Applications)
// ============================================================================
export const studentService = {
  /**
   * Submit or save a student application
   * @param {Object} data - Application data
   * @param {string} data.name - Student name
   * @param {string} data.email - Student email
   * @param {string} data.phone - Student phone
   * @param {string} data.fromCountry - Student's country
   * @param {string} data.lastAcademicLevel - Last academic level
   * @param {string} data.draftToken - Draft token for saving/updating
   * @param {boolean} data.isSubmitted - Whether this is final submission
   * @returns {Promise} Submission response
   */
  submit: async (data) => {
    const response = await axiosInstance.post('/students', data);
    return response.data;
  },

  /**
   * Get a student draft by draft token (public)
   * @param {string} draftToken - Draft token
   * @returns {Promise} Draft data
   */
  getDraft: async (draftToken) => {
    const response = await axiosInstance.get(`/students/draft/${draftToken}`);
    return response.data;
  },

  /**
   * Save application as draft
   * @param {Object} data - Application data
   * @returns {Promise} Save response
   */
  saveDraft: async (data) => {
    const response = await axiosInstance.post('/students', {
      ...data,
      isSubmitted: false,
    });
    return response.data;
  },

  /**
   * Get all students (admin)
   * @param {Object} params - Query parameters
   * @returns {Promise} Array of students
   */
  getAll: async (params = {}) => {
    const response = await axiosInstance.get('/students', { params });
    return response.data;
  },

  /**
   * Get student by ID (admin)
   * @param {string} id - Student ID
   * @returns {Promise} Student details
   */
  getById: async (id) => {
    const response = await axiosInstance.get(`/students/${id}`);
    return response.data;
  },

  /**
   * Mark student as contacted (admin)
   * @param {string} id - Student ID
   * @returns {Promise} Update response
   */
  markAsContacted: async (id) => {
    const response = await axiosInstance.put(`/students/${id}/mark-contacted`);
    return response.data;
  },

  /**
   * Cleanup old drafts (admin)
   * @returns {Promise} Cleanup response
   */
  cleanupDrafts: async () => {
    const response = await axiosInstance.delete('/students/drafts/cleanup');
    return response.data;
  },

  /**
   * Export students as CSV (admin)
   * @param {Object} params - Query parameters
   * @returns {Promise} CSV data
   */
  exportCSV: async (params = {}) => {
    const response = await axiosInstance.get('/export/students', { 
      params,
      responseType: 'blob'
    });
    return response.data;
  },
};

// ============================================================================
// COUNSELLOR SERVICE
// ============================================================================
export const counsellorService = {
  /**
   * Get all counsellors (public)
   * @returns {Promise} Array of counsellors
   */
  getAll: async () => {
    const response = await axiosInstance.get('/counsellors');
    return response.data;
  },

  /**
   * Get counsellor by ID
   * @param {string} id - Counsellor ID
   * @returns {Promise} Counsellor details
   */
  getById: async (id) => {
    const response = await axiosInstance.get(`/counsellors/${id}`);
    return response.data;
  },
};

// ============================================================================
// EXPERIENCE SERVICE (Testimonials)
// ============================================================================
export const experienceService = {
  /**
   * Get all student experiences (public)
   * @returns {Promise} Array of experiences
   */
  getAll: async () => {
    const response = await axiosInstance.get('/experiences');
    return response.data;
  },

  /**
   * Get experience by ID
   * @param {string} id - Experience ID
   * @returns {Promise} Experience details
   */
  getById: async (id) => {
    const response = await axiosInstance.get(`/experiences/${id}`);
    return response.data;
  },
};

// ============================================================================
// CONTENT SERVICE (Pages)
// ============================================================================
export const contentService = {
  /**
   * Get a page by its key (public)
   * @param {string} key - Page key (e.g., 'about', 'privacy')
   * @returns {Promise} Page content
   */
  getPageByKey: async (key) => {
    const response = await axiosInstance.get(`/pages/${key}`);
    return response.data;
  },

  /**
   * Get about page
   * @returns {Promise} About page content
   */
  getAbout: async () => {
    const response = await axiosInstance.get('/pages/about');
    return response.data;
  },

  /**
   * Get all pages (admin)
   * @returns {Promise} Array of pages
   */
  getAllPages: async () => {
    const response = await axiosInstance.get('/pages');
    return response.data;
  },

  /**
   * Create or update a page (admin)
   * @param {string} key - Page key
   * @param {Object} data - Page data
   * @returns {Promise} Update response
   */
  updatePage: async (key, data) => {
    const response = await axiosInstance.put(`/pages/${key}`, data);
    return response.data;
  },

  /**
   * Delete a page (admin)
   * @param {string} key - Page key
   * @returns {Promise} Delete response
   */
  deletePage: async (key) => {
    const response = await axiosInstance.delete(`/pages/${key}`);
    return response.data;
  },
};

// ============================================================================
// SETTINGS SERVICE
// ============================================================================
export const settingsService = {
  /**
   * Get current site settings
   * @returns {Promise} Site settings
   */
  getSettings: async () => {
    const response = await axiosInstance.get('/settings');
    return response.data;
  },

  /**
   * Update site settings (admin)
   * @param {Object} data - Settings data
   * @returns {Promise} Update response
   */
  updateSettings: async (data) => {
    const response = await axiosInstance.put('/settings', data);
    return response.data;
  },
};

// ============================================================================
// AUTH SERVICE
// ============================================================================
export const authService = {
  /**
   * Admin login
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - Admin email
   * @param {string} credentials.password - Admin password
   * @returns {Promise} Login response with JWT token
   */
  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  /**
   * Admin logout
   */
  logout: () => {
    localStorage.removeItem('authToken');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
};

// ============================================================================
// UPLOAD SERVICE
// ============================================================================
export const uploadService = {
  /**
   * Upload an image file
   * @param {File} file - Image file to upload
   * @returns {Promise} Upload response with public URL
   */
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// ============================================================================
// CONTACT SERVICE
// ============================================================================
export const contactService = {
  /**
   * Submit contact form
   * @param {Object} data - Contact form data
   * @param {string} data.name - Contact name
   * @param {string} data.email - Contact email
   * @param {string} data.subject - Message subject
   * @param {string} data.message - Message content
   * @returns {Promise} Submission response
   */
  submit: async (data) => {
    const response = await axiosInstance.post('/contact', data);
    return response.data;
  },
};

// Export all services as a single object for convenience
export default {
  home: homeService,
  destination: destinationService,
  service: serviceService,
  student: studentService,
  counsellor: counsellorService,
  experience: experienceService,
  content: contentService,
  settings: settingsService,
  auth: authService,
  upload: uploadService,
  contact: contactService,
};
