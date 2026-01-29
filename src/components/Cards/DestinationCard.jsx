import { Link } from 'react-router-dom';

function DestinationCard({ destination }) {
  return (
    <Link
      to={`/destinations/${destination.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={destination.imageUrl || '/placeholder-destination.jpg'}
          alt={destination.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary-600 font-semibold">
            {destination.universityCount || 0} Universities
          </span>
          <span className="text-sm text-gray-500">Learn More →</span>
        </div>
      </div>
    </Link>
  );
}

export default DestinationCard;
