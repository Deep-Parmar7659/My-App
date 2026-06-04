import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/userService";
import { getPosts } from "../../api/postService";

export default function useDashboardStats() {
  const usersQuery = useQuery({
    queryKey: ["dashboard-users"],
    queryFn: ({ signal }) => getUsers({ signal }),
  });

  const postsQuery = useQuery({
    queryKey: ["dashboard-posts"],
    queryFn: ({ signal }) => getPosts(0, signal),
  });

  return {
    stats: {
      users: usersQuery.data?.users?.length || 0,
      posts: postsQuery.data?.posts?.length || 0,
    },

    loading: usersQuery.isLoading || postsQuery.isLoading,

    error: usersQuery.error?.message || postsQuery.error?.message || null,
  };
}
