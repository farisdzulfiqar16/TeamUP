function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-xl border border-gray-200 bg-gray-200 dark:border-gray-700  ${className}`}
    />
  );
}

export default SkeletonCard;
