function CounsellorCard({ counsellor }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img
          src={counsellor.imageUrl || '/placeholder-avatar.jpg'}
          alt={counsellor.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{counsellor.name}</h3>
        <p className="text-primary-600 font-medium mb-3">{counsellor.title}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {counsellor.bio || counsellor.description}
        </p>
        {counsellor.specialization && (
          <div className="flex flex-wrap gap-2">
            {counsellor.specialization.split(',').map((spec, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
              >
                {spec.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CounsellorCard;
