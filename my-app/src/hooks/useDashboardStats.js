// Dashboard logic
// Dashboard logic
import { useEffect, useState, useCallback } from "react";
import { getPosts, getUsers } from "../services/api";

export default function useDashboardStats() {
  const [stats, setStats] = useState({ users: 0, posts: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError(null);

      // getUsers/getPosts already return plain arrays now
      const [usersData, postsData] = await Promise.all([
        getUsers(signal),
        getPosts(signal),
      ]);

      setStats({
        users: Array.isArray(usersData) ? usersData.length : 0,
        posts: Array.isArray(postsData) ? postsData.length : 0,
      });
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    // Use a microtask or timeout to avoid synchronous setState during render phase
    // which can trigger cascading render warnings in some linting/strict environments
    setTimeout(() => {
      void fetchStats(controller.signal);
    }, 0);
    return () => controller.abort();
  }, [fetchStats]);

  return { stats, loading, error };
}
