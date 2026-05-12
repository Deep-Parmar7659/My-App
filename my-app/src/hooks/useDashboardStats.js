import { useEffect, useState } from "react";
import { getUsers, getPosts } from "../services/api";

export default function useDashboardStats() {
  const [stats, setStats] = useState({ users: 0, posts: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Multiple API Calls
        const [usersData, postsData] = await Promise.all([
          getUsers(),
          getPosts(),
        ]);
        setStats({ users: usersData.length, posts: postsData.length });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  return {
    stats,
    loading,
    error,
  };
}
