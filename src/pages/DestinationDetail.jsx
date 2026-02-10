import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { destinationService } from '../services/destinationService';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

function DestinationDetail() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDestination();
  }, [id]);

  const loadDestination = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await destinationService.getById(id);
      setDestination(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container-custom section-padding">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom section-padding">
        <ErrorMessage message={error} onRetry={loadDestination} />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="container-custom section-padding text-center">
        <h2 className="text-2xl font-bold mb-4">Destination not found</h2>
        <Link to="/destinations" className="btn-primary">
          Back to Destinations
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={destination.imageUrl || '/placeholder-destination.jpg'}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {destination.name}
            </h1>
            <p className="text-xl text-white">{destination.tagline}</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">About {destination.name}</h2>
              <div className="prose max-w-none text-gray-700 mb-8">
                <p>{destination.description}</p>
                {destination.detailedDescription && <p>{destination.detailedDescription}</p>}
              </div>

              {destination.benefits && destination.benefits.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">Why Study Here?</h3>
                  <ul className="space-y-3">
                    {destination.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  {destination.universityCount && (
                    <div>
                      <p className="text-sm text-gray-600">Universities</p>
                      <p className="text-lg font-semibold">{destination.universityCount}+</p>
                    </div>
                  )}
                  {destination.language && (
                    <div>
                      <p className="text-sm text-gray-600">Language</p>
                      <p className="text-lg font-semibold">{destination.language}</p>
                    </div>
                  )}
                  {destination.currency && (
                    <div>
                      <p className="text-sm text-gray-600">Currency</p>
                      <p className="text-lg font-semibold">{destination.currency}</p>
                    </div>
                  )}
                  {destination.averageTuition && (
                    <div>
                      <p className="text-sm text-gray-600">Average Tuition</p>
                      <p className="text-lg font-semibold">{destination.averageTuition}</p>
                    </div>
                  )}
                </div>

                <Link to="/apply" className="btn-primary w-full mt-6 block text-center">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DestinationDetail;
