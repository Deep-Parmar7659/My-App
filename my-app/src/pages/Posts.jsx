import useDocumentTitle from "../hooks/useDocumentTitle";
import useFetchPosts from "../hooks/useFetchPosts";

export default function Posts() {
  const { posts, loading, error } = useFetchPosts();

  useDocumentTitle("Posts");

  // Loading State — skeleton cards matching post card layout
  if (loading) {
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
  if (error) {
    return <h1 className="text-2xl text-red-500 text-center mt-10">{error}</h1>;
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
        {posts.slice(0, 12).map((post) => (
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
    </div>
  );
}
