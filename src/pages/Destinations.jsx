import { useState, useEffect } from 'react';
import { destinationService } from '../services/destinationService';
import DestinationCard from '../components/common/DestinationCard';
import SkeletonCard from '../components/UI/SkeletonCard';
import ErrorMessage from '../components/UI/ErrorMessage';

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await destinationService.getAll();
      setDestinations(data);
    } catch (err) {
      setError(err.message || 'Failed to load destinations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern"></div>
        </div>

        <div className="container-custom relative py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Explore Study Destinations
            </h1>
            <p className="text-xl md:text-2xl text-primary-50 leading-relaxed">
              Discover world-class universities and education opportunities across the globe. 
              Find the perfect destination for your academic journey.
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Destinations Grid Section */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Section Header */}
          {!loading && !error && destinations.length > 0 && (
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Popular Study Destinations
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose from {destinations.length} top destinations offering quality education and 
                diverse cultural experiences
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-2xl mx-auto">
              <ErrorMessage message={error} onRetry={loadDestinations} />
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && destinations.length === 0 && (
            <div className="text-center py-16">
              <svg
                className="w-24 h-24 text-gray-300 mx-auto mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No Destinations Available
              </h3>
              <p className="text-gray-600 text-lg mb-6">
                We&apos;re currently updating our destination list. Please check back soon.
              </p>
              <button
                onClick={loadDestinations}
                className="btn-primary"
              >
                Refresh Page
              </button>
            </div>
          )}

          {/* Destinations Grid */}
          {!loading && !error && destinations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {!loading && !error && destinations.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-pattern"></div>
              </div>

              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Can&apos;t Find Your Dream Destination?
                </h2>
                <p className="text-xl text-primary-50 mb-8 max-w-2xl mx-auto">
                  Our expert counsellors can help you explore more options and find the perfect 
                  destination for your academic goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
                  >
                    Contact Us
                  </a>
                  <a
                    href="/apply"
                    className="px-8 py-4 bg-primary-500/20 backdrop-blur-sm border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Destinations;
