import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import { searchUsers } from "../api/userService";

export default function useUserSearch(search) {
  const debouncedSearch = useDebounce(search, 500);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    // Empty Search
    if (!debouncedSearch.trim()) {
      Promise.resolve().then(() => setResults([]));
      return;
    }

    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);

        const data = await searchUsers(debouncedSearch, controller.signal);
        setResults(Array.isArray(data?.users) ? data.users : []);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Search Request Cancelled");
          return;
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
    return () => {
      controller.abort();
    };
  }, [debouncedSearch]);

  return {
    results,
    loading,
    error,
  };
}
