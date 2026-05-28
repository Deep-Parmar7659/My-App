import { useEffect, useState } from "react";
import { searchUsers } from "../../api/userService";
import useDebounce from "../shared/useDebounce";

export default function useUserSearch(searchTerm) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchUsers() {
      if (!debouncedSearch.trim()) {
        setUsers([]);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const result = await searchUsers(debouncedSearch, controller.signal);
        setUsers(result || []);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();

    return () => controller.abort();
  }, [debouncedSearch]);

  return {
    users,
    loading,
    error,
  };
}
