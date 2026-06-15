import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/userService";
import { getPosts } from "../../api/postService";

export default function useDashboardStats() {
  const usersQuery = useQuery({
    queryKey: ["dashboard-users"],
    queryFn: getUsers(),
  });

  const postsQuery = useQuery({
    queryKey: ["dashboard-posts"],
    queryFn: getPosts(),
  });

  return {
    stats: {
      users: usersQuery.data?.users?.length || usersQuery.data?.total || 0,
      posts: postsQuery.data?.total || 0,
    },

    loading: usersQuery.isLoading || postsQuery.isLoading,

    error: usersQuery.error?.message || postsQuery.error?.message || null,
  };
}
