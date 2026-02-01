import { Link } from 'react-router-dom';

function DestinationCard({ destination }) {
  return (
    <Link
      to={`/destinations/${destination.id}`}
      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      aria-label={`Learn more about studying in ${destination.name}`}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gray-200">
        <img
          src={destination.imageUrl || '/placeholder-destination.jpg'}
          alt={`Study in ${destination.name}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
          {destination.name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {destination.description}
        </p>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-primary-600 font-semibold">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span>{destination.universityCount || 0} Universities</span>
          </div>
          <span className="text-sm text-primary-600 font-medium flex items-center group-hover:translate-x-1 transition-transform">
            Learn More
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default DestinationCard;
