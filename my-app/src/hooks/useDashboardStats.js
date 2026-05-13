// Dashboard logic
import useFetch from "./useFetch";
import { getPosts, getUsers } from "../services/api";

const fetchDashboardStats = async () => {
  const [usersData, postsData] = await Promise.all([getUsers(), getPosts()]);

  return {
    users: usersData.length,
    posts: postsData.length,
  };
};

export default function useDashboardStats() {
  const {
    data: stats,
    loading,
    error,
    refetch,
  } = useFetch(fetchDashboardStats);

  return {
    stats: stats || {
      users: 0,
      posts: 0,
    },
    loading,
    error,
    refetch,
  };
}
