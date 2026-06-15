import { useParams } from "react-router-dom";
import usePost from "../hooks/posts/usePost";

export default function PostDetails() {
  const { id } = useParams();

  const { data: post, isLoading, error } = usePost(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading post.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post?.title}</h1>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {post?.body}
      </p>
    </div>
  );
}
