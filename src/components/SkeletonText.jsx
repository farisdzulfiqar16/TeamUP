function SkeletonText({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200  ${className}`}
    />
  );
}

export default SkeletonText;
