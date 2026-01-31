function CounsellorCard({ counsellor }) {
  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {counsellor.imageUrl ? (
          <img
            src={counsellor.imageUrl}
            alt={counsellor.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          // Placeholder avatar
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-24 h-24 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {counsellor.name}
        </h3>
        
        {/* Title/Position */}
        <p className="text-primary-600 font-semibold mb-3 text-sm uppercase tracking-wide">
          {counsellor.title || counsellor.position || 'Education Counsellor'}
        </p>
        
        {/* Bio/Description */}
        {(counsellor.bio || counsellor.description) && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {counsellor.bio || counsellor.description}
          </p>
        )}
        
        {/* Specialization Tags */}
        {counsellor.specialization && (
          <div className="flex flex-wrap gap-2 mt-4">
            {counsellor.specialization.split(',').slice(0, 3).map((spec, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full hover:bg-primary-100 transition-colors"
              >
                {spec.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Contact Info (if available) */}
        {(counsellor.email || counsellor.phone) && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
            {counsellor.email && (
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${counsellor.email}`} className="hover:text-primary-600 transition-colors">
                  {counsellor.email}
                </a>
              </div>
            )}
            {counsellor.phone && (
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${counsellor.phone}`} className="hover:text-primary-600 transition-colors">
                  {counsellor.phone}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CounsellorCard;
