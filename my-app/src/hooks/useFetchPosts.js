import useFetch from "./useFetch";

import { getPosts } from "../api/postService";

export default function useFetchPosts() {
  const { data, loading, error } = useFetch(getPosts);

  const normalizedPosts = Array.isArray(data?.posts) ? data.posts : [];

  return {
    posts: normalizedPosts,
    loading,
    error,
  };
}
