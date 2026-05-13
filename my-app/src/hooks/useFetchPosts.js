// Posts logic
import useFetch from "./useFetch";
import { getPosts } from "../services/api";

export default function useFetchPosts() {
  const { data: posts, loading, error, refetch } = useFetch(getPosts);

  return {
    posts: posts || [],
    loading,
    error,
    refetch,
  };
}
