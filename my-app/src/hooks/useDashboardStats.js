import { useCallback, useEffect, useState } from "react";
import { getPosts, getUsers } from "../services/api";

export default function useDashboardStats() {
  const [stats, setStats] = useState({ users: 0, posts: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError(null);

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
    // Use a microtask or timeout to ensure the state update
    // happens after the initial render cycle to avoid cascading renders
    Promise.resolve().then(() => fetchStats(controller.signal));
    return () => controller.abort();
  }, [fetchStats]);

  return { stats, loading, error };
}
