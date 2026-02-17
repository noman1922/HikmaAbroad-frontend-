import axiosInstance from '../api/axios';

export const uploadService = {
  // Upload an image file
  // Allowed types: jpg, png, webp
  // Max size: 5MB
  // Returns the public URL
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

  // Validate file before upload
  validateImage: (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPG, PNG, and WebP are allowed.');
    }

    if (file.size > maxSize) {
      throw new Error('File size exceeds 5MB limit.');
    }

    return true;
  },
};
