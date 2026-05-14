import useDocumentTitle from "../hooks/useDocumentTitle";
import useFetchPosts from "../hooks/useFetchPosts";

export default function Posts() {
  const { posts, loading, error } = useFetchPosts();

  useDocumentTitle("Dashboard");

  // Loading State
  if (loading) {
    return (
      <h1 className="text-2xl font-bold text-center mt-10">Loading Posts...</h1>
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
        <h1 className="text-4xl font-bold text-gray-800">Posts</h1>

        <p className="text-gray-500 mt-2">Explore latest published posts.</p>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6">
        {posts.slice(0, 12).map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            {/* Title */}
            <h2 className="text-2xl font-semibold text-purple-600 capitalize">
              {post.title}
            </h2>

            {/* Body */}
            <p className="text-gray-600 mt-4 leading-relaxed">{post.body}</p>

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
