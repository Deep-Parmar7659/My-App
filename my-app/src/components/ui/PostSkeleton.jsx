export default function PostSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow animate-pulse">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4" />

      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-5" />

      <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-28" />
    </div>
  );
}
