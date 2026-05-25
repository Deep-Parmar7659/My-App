import { useEffect, useState } from "react";
import { getUsers } from "../api/userService";
import { getPosts } from "../api/postService";

export default function useDashboardStats() {
  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStats() {
      try {
        setLoading(true);
        setError(null);

        const [usersData, postsData] = await Promise.all([
          getUsers(controller.signal),
          getPosts(controller.signal),
        ]);

        setStats({
          users: Array.isArray(usersData?.users) ? usersData.users.length : 0,
          posts: Array.isArray(postsData?.posts) ? postsData.posts.length : 0,
        });
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }

        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    stats,
    loading,
    error,
  };
}
