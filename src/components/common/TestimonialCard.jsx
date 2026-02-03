function TestimonialCard({ testimonial }) {
  // Handle different field names from API
  const studentName = testimonial.name || testimonial.studentName;
  const message = testimonial.message || testimonial.content || testimonial.testimonial;
  const destination = testimonial.destination || testimonial.university || testimonial.country;
  const rating = testimonial.rating || 5;
  const imageUrl = testimonial.imageUrl || testimonial.image;

  return (
    <div className="group bg-white rounded-xl shadow-md p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      {/* Quote Icon */}
      <div className="mb-4">
        <svg
          className="w-10 h-10 text-primary-200 group-hover:text-primary-300 transition-colors"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Rating Stars */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Testimonial Message */}
      <p className="text-gray-700 mb-6 leading-relaxed italic text-base">
        &ldquo;{message}&rdquo;
      </p>

      {/* Student Info */}
      <div className="flex items-center pt-4 border-t border-gray-100">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 ring-2 ring-primary-100 group-hover:ring-primary-300 transition-all">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={studentName}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              // Placeholder avatar
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary-600"
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
          </div>
          {/* Verified Badge */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ring-2 ring-white">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Name and Destination */}
        <div className="ml-4">
          <p className="font-bold text-gray-900 text-base group-hover:text-primary-600 transition-colors">
            {studentName}
          </p>
          {destination && (
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <svg className="w-4 h-4 mr-1 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{destination}</span>
            </div>
          )}
        </div>
      </div>

      {/* Course/Program (if available) */}
      {testimonial.course && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="font-medium">{testimonial.course}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestimonialCard;
