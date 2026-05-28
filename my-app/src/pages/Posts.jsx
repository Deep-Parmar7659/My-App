import useDocumentTitle from "../hooks/ui/useDocumentTitle";
import useInfinitePosts from "../hooks/posts/useInfinitePosts";

import LoadMoreTrigger from "../components/LoadMoreTrigger";
import ErrorMessage from "../components/ErrorMessage";

import PostSkeleton from "../components/ui/PostSkeleton";
import EmptyState from "../components/ui/EmptyState";

export default function Posts() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePosts();

  const pages = Array.isArray(data?.pages) ? data.pages : [];

  const posts = pages.flatMap((page) => page?.posts || []);

  useDocumentTitle("Posts");

  // Loading State
  if (isLoading) {
    return (
      <div>
        {/* Heading Skeleton */}
        <div className="mb-8">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-32 mb-3 animate-pulse" />

          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-56 animate-pulse" />
        </div>

        {/* Reusable Skeletons */}
        <div className="grid gap-6">
          {[...Array(6)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return <ErrorMessage error={error} />;
  }

  // Empty State
  if (!posts.length) {
    return (
      <EmptyState
        title="No Posts Available"
        description="Posts will appear here once data is available."
      />
    );
  }

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
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
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

      {/* Infinite Scroll Trigger */}
      <LoadMoreTrigger
        onLoadMore={fetchNextPage}
        hasNextPage={Boolean(hasNextPage)}
        isFetching={isFetchingNextPage}
      />

      {/* Loading More State */}
      {isFetchingNextPage && (
        <div className="flex justify-center py-6">
          <div className="h-10 w-10 rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
        </div>
      )}

      {/* End Message */}
      {!hasNextPage && (
        <p className="text-center mt-6 text-gray-500">No More Posts</p>
      )}
    </div>
  );
}
