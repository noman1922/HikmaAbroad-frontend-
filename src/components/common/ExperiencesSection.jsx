import { useState, useEffect } from 'react';
import { testimonialService } from '../../services/testimonialService';
import TestimonialCard from './TestimonialCard';
import SkeletonCard from '../UI/SkeletonCard';
import ErrorMessage from '../UI/ErrorMessage';

function ExperiencesSection({ 
  title = 'Student Success Stories',
  subtitle = 'Hear from students who achieved their dreams',
  limit = null,
  showViewAll = false,
  viewAllLink = '/experiences',
  backgroundColor = 'bg-white'
}) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await testimonialService.getAll();
      setExperiences(data);
    } catch (err) {
      setError(err.message || 'Failed to load student experiences');
    } finally {
      setLoading(false);
    }
  };

  // Apply limit if specified
  const displayedExperiences = limit ? experiences.slice(0, limit) : experiences;

  return (
    <section className={`section-padding ${backgroundColor}`}>
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
            <ErrorMessage message={error} onRetry={loadExperiences} />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(limit || 3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && displayedExperiences.length === 0 && (
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-gray-600 text-lg">
              No student experiences available at the moment.
            </p>
          </div>
        )}

        {/* Experiences Grid */}
        {!loading && !error && displayedExperiences.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedExperiences.map((experience) => (
                <TestimonialCard key={experience.id} testimonial={experience} />
              ))}
            </div>

            {/* View All Button */}
            {showViewAll && limit && experiences.length > limit && (
              <div className="text-center mt-12">
                <a
                  href={viewAllLink}
                  className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  View All Success Stories
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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

export default ExperiencesSection;
