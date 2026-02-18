// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// Required field validation
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

// Min length validation
export const minLength = (value, min) => {
  if (typeof value === 'string') {
    return value.trim().length >= min;
  }
  return false;
};

// Max length validation
export const maxLength = (value, max) => {
  if (typeof value === 'string') {
    return value.trim().length <= max;
  }
  return false;
};
