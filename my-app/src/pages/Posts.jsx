import useDocumentTitle from "../hooks/ui/useDocumentTitle";import useInfinitePosts from "../hooks/posts/useInfinitePosts";
import LoadMoreTrigger from "../components/LoadMoreTrigger";
import ErrorMessage from "../components/ErrorMessage";

export default function Posts() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePosts();

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  useDocumentTitle("Posts");

  // Loading State — skeleton cards matching post card layout
  if (isLoading) {
    return (
      <div>
        {/* Heading Skeleton */}
        <div className="mb-8">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-32 mb-3 animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-56 animate-pulse" />
        </div>

        {/* Post Card Skeletons */}
        <div className="grid gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow animate-pulse"
            >
              {/* Title line */}
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4" />
              {/* Body lines */}
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-5" />
              {/* Button */}
              <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-28" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error State
  <ErrorMessage error={error} />;

  return (
    <div>
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Posts
        </h1>
        <p className="text-gray-500 mt-2">Explore latest published posts.</p>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            {/* Title */}
            <h2 className="text-2xl font-semibold text-purple-600 capitalize">
              {post.title}
            </h2>

            {/* Body */}
            <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
              {post.body}
            </p>

            {/* Button */}
            <button className="mt-5 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
              Read More
            </button>
          </div>
        ))}
      </div>

      {/* Auto Infinite Scroll */}
      <LoadMoreTrigger
        onLoadMore={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetching={isFetchingNextPage}
      />

      {/* Loading State */}
      {isFetchingNextPage && (
        <p className="text-center mt-6 text-gray-500">Loading more posts...</p>
      )}

      {/* End Message */}
      {!hasNextPage && (
        <p className="text-center mt-6 text-gray-500">No More Posts</p>
      )}
    </div>
  );
}
