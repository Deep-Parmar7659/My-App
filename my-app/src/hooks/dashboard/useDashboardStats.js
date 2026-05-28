import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/userService";
import { getPosts } from "../../api/postService";

export default function useDashboardStats() {
  const usersQuery = useQuery({
    queryKey: ["dashboard-users"],
    queryFn: () => getUsers(),
    staleTime: 1000 * 60 * 5,
  });

  const postsQuery = useQuery({
    queryKey: ["dashboard-posts"],
    queryFn: () => getPosts(),
    staleTime: 1000 * 60 * 5,
  });

  console.log("USERS DATA:", usersQuery.data);

  return {
    stats: {
      users: usersQuery.data?.total || 0,

      posts: postsQuery.data?.total || 0,
    },

    loading: usersQuery.isLoading || postsQuery.isLoading,

    error: usersQuery.error?.message || postsQuery.error?.message || null,
  };
}
