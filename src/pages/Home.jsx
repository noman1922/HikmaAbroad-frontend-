import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contentService } from '../services/contentService';
import DestinationCard from '../components/common/DestinationCard';
import ServiceCard from '../components/common/ServiceCard';
import CounsellorCard from '../components/common/CounsellorCard';
import TestimonialCard from '../components/common/TestimonialCard';
import SkeletonCard from '../components/UI/SkeletonCard';
import ErrorMessage from '../components/UI/ErrorMessage';

function Home() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await contentService.getHomePage();
      setHomeData(data);
    } catch (err) {
      setError(err.message || 'Failed to load home page data');
    } finally {
      setLoading(false);
    }
  };

  // Show error state
  if (error) {
    return (
      <div className="container-custom section-padding">
        <ErrorMessage message={error} onRetry={loadHomeData} />
      </div>
    );
  }

  // Extract data with fallbacks
  const hero = homeData?.hero || {};
  const aboutSummary = homeData?.aboutSummary || '';
  const destinations = homeData?.destinations || [];
  const services = homeData?.services || [];
  const counsellors = homeData?.counsellors || [];
  const experiences = homeData?.experiences || [];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern"></div>
        </div>

        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              {loading ? (
                <>
                  <div className="h-12 bg-white/20 rounded-lg mb-6 animate-pulse"></div>
                  <div className="h-6 bg-white/20 rounded-lg mb-4 animate-pulse"></div>
                  <div className="h-6 bg-white/20 rounded-lg w-3/4 mb-8 animate-pulse"></div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <div className="h-12 w-40 bg-white/20 rounded-lg animate-pulse"></div>
                    <div className="h-12 w-40 bg-white/20 rounded-lg animate-pulse"></div>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    {hero.title || 'Your Gateway to Global Education'}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-primary-50 leading-relaxed">
                    {hero.subtitle || 'Expert guidance for studying abroad. Turn your dreams into reality with our comprehensive support.'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link
                      to="/apply"
                      className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl text-center"
                    >
                      Start Your Journey
                    </Link>
                    <Link
                      to="/destinations"
                      className="px-8 py-4 bg-primary-500/20 backdrop-blur-sm border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200 text-center"
                    >
                      Explore Destinations
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Hero Image */}
            <div className="relative">
              {loading ? (
                <div className="aspect-square bg-white/20 rounded-2xl animate-pulse"></div>
              ) : (
                <div className="relative">
                  {hero.imageUrl ? (
                    <img
                      src={hero.imageUrl}
                      alt="Study Abroad"
                      className="rounded-2xl shadow-2xl w-full h-auto"
                    />
                  ) : (
                    <div className="aspect-square bg-white/10 rounded-2xl flex items-center justify-center">
                      <svg
                        className="w-32 h-32 text-white/50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                  )}
                  {/* Decorative Elements */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary-500 rounded-full opacity-20 blur-2xl"></div>
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary-400 rounded-full opacity-20 blur-2xl"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* About Summary Section */}
      {(loading || aboutSummary) && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              {loading ? (
                <>
                  <div className="h-10 bg-gray-200 rounded-lg mb-4 w-64 mx-auto animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded-lg mb-2 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded-lg mb-2 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded-lg w-3/4 mx-auto animate-pulse"></div>
                </>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    About Us
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {aboutSummary}
                  </p>
                  <Link
                    to="/about"
                    className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                  >
                    Learn More About Us
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Popular Destinations Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Study Destinations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover world-class education opportunities across the globe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
              : destinations.slice(0, 6).map((dest) => (
                  <DestinationCard key={dest.id} destination={dest} />
                ))}
          </div>

          {!loading && destinations.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/destinations"
                className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                View All Destinations
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive support throughout your study abroad journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
              : services.slice(0, 6).map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
          </div>

          {!loading && services.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/services"
                className="inline-flex items-center px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-200"
              >
                Learn More About Our Services
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Counsellors Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Counsellors
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading
              ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
              : counsellors.slice(0, 4).map((counsellor) => (
                  <CounsellorCard key={counsellor.id} counsellor={counsellor} />
                ))}
          </div>
        </div>
      </section>

      {/* Student Experiences Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Student Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from students who achieved their dreams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading
              ? [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
              : experiences.slice(0, 3).map((experience) => (
                  <TestimonialCard key={experience.id} testimonial={experience} />
                ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern"></div>
        </div>

        <div className="container-custom text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-primary-50 max-w-2xl mx-auto leading-relaxed">
            Get personalized guidance from our expert counsellors and take the first step
            towards your international education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/apply"
              className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
            >
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-primary-500/20 backdrop-blur-sm border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
