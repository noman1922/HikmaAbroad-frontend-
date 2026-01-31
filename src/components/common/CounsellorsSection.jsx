import { useState, useEffect } from 'react';
import { counsellorService } from '../../services/counsellorService';
import CounsellorCard from './CounsellorCard';
import SkeletonCard from '../UI/SkeletonCard';
import ErrorMessage from '../UI/ErrorMessage';

function CounsellorsSection({ 
  title = 'Meet Our Expert Counsellors',
  subtitle = 'Experienced professionals dedicated to your success',
  limit = null,
  showViewAll = false,
  viewAllLink = '/counsellors'
}) {
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCounsellors();
  }, []);

  const loadCounsellors = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await counsellorService.getAll();
      setCounsellors(data);
    } catch (err) {
      setError(err.message || 'Failed to load counsellors');
    } finally {
      setLoading(false);
    }
  };

  // Apply limit if specified
  const displayedCounsellors = limit ? counsellors.slice(0, limit) : counsellors;

  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <ErrorMessage message={error} onRetry={loadCounsellors} />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(limit || 4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && displayedCounsellors.length === 0 && (
          <div className="text-center py-12">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-gray-600 text-lg">
              No counsellors available at the moment.
            </p>
          </div>
        )}

        {/* Counsellors Grid */}
        {!loading && !error && displayedCounsellors.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayedCounsellors.map((counsellor) => (
                <CounsellorCard key={counsellor.id} counsellor={counsellor} />
              ))}
            </div>

            {/* View All Button */}
            {showViewAll && limit && counsellors.length > limit && (
              <div className="text-center mt-12">
                <a
                  href={viewAllLink}
                  className="inline-flex items-center px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-200"
                >
                  View All Counsellors
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default CounsellorsSection;
