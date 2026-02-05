function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <svg
        className="w-12 h-12 text-red-500 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-red-800 mb-4">{message || 'Something went wrong'}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
