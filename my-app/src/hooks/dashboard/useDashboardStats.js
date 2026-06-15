import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/userService";
import { getPosts } from "../../api/postService";

export default function useDashboardStats() {
  const usersQuery = useQuery({
    queryKey: ["dashboard-users"],
    queryFn: () => getUsers(),
  });

  const postsQuery = useQuery({
    queryKey: ["dashboard-posts"],
    queryFn: () => getPosts(),
  });

  const usersCount = usersQuery.data?.total || 0;
  const postsCount = postsQuery.data?.total || 0;

  return {
    stats: {
      users: usersCount,
      posts: postsCount,
    },

    loading: usersQuery.isLoading || postsQuery.isLoading,

    error: usersQuery.error?.message || postsQuery.error?.message || null,
  };
}
