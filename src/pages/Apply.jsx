import { useState, useEffect, useCallback } from 'react';
import { applicationService } from '../services/applicationService';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// Generate a unique draft token
const generateDraftToken = () => {
  return crypto.randomUUID();
};

function Apply() {
  const [draftToken, setDraftToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [savingDraft, setSavingDraft] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fromCountry: '',
    lastAcademicLevel: '',
  });

  const [errors, setErrors] = useState({});

  // Load existing draft on mount
  useEffect(() => {
    const existingToken = localStorage.getItem('applicationDraftToken');
    if (existingToken) {
      setDraftToken(existingToken);
      loadExistingDraft(existingToken);
    } else {
      // Generate new draft token
      const newToken = generateDraftToken();
      setDraftToken(newToken);
      localStorage.setItem('applicationDraftToken', newToken);
    }
  }, []);

  const loadExistingDraft = async (token) => {
    try {
      const data = await applicationService.getDraft(token);
      if (data) {
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          fromCountry: data.fromCountry || '',
          lastAcademicLevel: data.lastAcademicLevel || '',
        });
        setLastSaved(new Date());
      }
    } catch (err) {
      console.error('Failed to load existing draft:', err);
      // If draft not found, keep the token for new draft
    }
  };

  // Save draft automatically on change
  const saveDraft = useCallback(async (data) => {
    if (!draftToken) return;

    try {
      setSavingDraft(true);
      await applicationService.saveDraft({
        ...data,
        draftToken,
        isSubmitted: false,
      });
      setLastSaved(new Date());
    } catch (err) {
      console.error('Failed to save draft:', err);
    } finally {
      setSavingDraft(false);
    }
  }, [draftToken]);

  // Auto-save draft logic
  useEffect(() => {
    if (!draftToken) return;
    const timer = setTimeout(() => {
      // Only save if there's some data in any field
      if (Object.values(formData).some(v => v && v.trim() !== '')) {
        saveDraft(formData);
      }
    }, 1000); // Save 1 second after user stops typing
    return () => clearTimeout(timer);
  }, [formData, draftToken, saveDraft]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-+()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.fromCountry.trim()) {
      newErrors.fromCountry = 'Country is required';
    }

    if (!formData.lastAcademicLevel) {
      newErrors.lastAcademicLevel = 'Academic level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await applicationService.submit({
        ...formData,
        draftToken,
        isSubmitted: true,
      });

      setSuccess(true);
      // Clear draft token after successful submission
      localStorage.removeItem('applicationDraftToken');
      setDraftToken(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Success Message */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Application Submitted!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your application. Our expert counsellors will review your information
            and get back to you within 24-48 hours.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <a
              href="/"
              className="block w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Back to Home
            </a>
            <a
              href="/services"
              className="block w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Explore Our Services
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern"></div>
        </div>

        <div className="container-custom relative py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Apply Now
            </h1>
            <p className="text-xl md:text-2xl text-primary-50 leading-relaxed">
              Start your journey to international education. Fill out the form below and
              our expert counsellors will guide you through the process.
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB" />
          </svg>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding">
        <div className="container-custom max-w-2xl">
          {/* Draft Status */}
          <div className="mb-6 flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Your progress is automatically saved</span>
            </div>
            {savingDraft && (
              <div className="flex items-center text-primary-600">
                <LoadingSpinner size="sm" />
                <span className="ml-2">Saving...</span>
              </div>
            )}
            {!savingDraft && lastSaved && (
              <span className="text-green-600">
                Saved {new Date(lastSaved).toLocaleTimeString()}
              </span>
            )}
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6 flex items-start">
              <svg className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* From Country Field */}
              <div>
                <label htmlFor="fromCountry" className="block text-sm font-semibold text-gray-700 mb-2">
                  From Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fromCountry"
                  name="fromCountry"
                  value={formData.fromCountry}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.fromCountry ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                  placeholder="e.g., United States, India, China"
                />
                {errors.fromCountry && (
                  <p className="mt-1 text-sm text-red-600">{errors.fromCountry}</p>
                )}
              </div>

              {/* Last Academic Level Field */}
              <div>
                <label htmlFor="lastAcademicLevel" className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Academic Level <span className="text-red-500">*</span>
                </label>
                <select
                  id="lastAcademicLevel"
                  name="lastAcademicLevel"
                  value={formData.lastAcademicLevel}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.lastAcademicLevel ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                >
                  <option value="">Select your last academic level</option>
                  <option value="High School">High School</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Associate Degree">Associate Degree</option>
                  <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
                  <option value="Master's Degree">Master&apos;s Degree</option>
                  <option value="Doctorate (PhD)">Doctorate (PhD)</option>
                  <option value="Other">Other</option>
                </select>
                {errors.lastAcademicLevel && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastAcademicLevel}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span className="ml-2">Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Privacy Note */}
              <p className="text-sm text-gray-600 text-center">
                By submitting this form, you agree to our{' '}
                <a href="/privacy" className="text-primary-600 hover:underline">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="/terms" className="text-primary-600 hover:underline">
                  Terms of Service
                </a>
              </p>
            </form>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-primary-50 rounded-xl p-6 border border-primary-100">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-gray-700 mb-3">
                  Our counsellors are here to assist you. If you have any questions about the application process,
                  feel free to reach out.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                >
                  Contact Us
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Apply;
