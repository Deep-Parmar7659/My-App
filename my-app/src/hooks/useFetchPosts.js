import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/postService";

export default function useFetchPosts() {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
    staleTime: 1000 * 60 * 5,
  });

  return {
    posts: data,
    loading: isLoading,
    error: error?.message || null,
  };
}
