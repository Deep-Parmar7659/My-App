import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/userService";
import { getPosts } from "../api/postService";

export default function useDashboardStats() {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    staleTime: 1000 * 60 * 5,
  });

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
    staleTime: 1000 * 60 * 5,
  });

  return {
    stats: {
      users: usersQuery.data?.length || 0,
      posts: postsQuery.data?.length || 0,
    },
    loading: usersQuery.isLoading || postsQuery.isLoading,
    error: usersQuery.error?.message || postsQuery.error?.message || null,
  };
}
