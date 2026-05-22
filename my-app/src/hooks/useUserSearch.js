import { useEffect, useState } from "react";

import useDebounce from "./useDebounce";

import { searchUsers } from "../api/userService";

export default function useUserSearch() {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(search, 1000);

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

        const data = await searchUsers(debouncedSearch, controller.signal);

        setUsers(data.users || []);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Request Cancelled");

          return;
        }

        setError(error.message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    return () => {
      console.log("Search Cleanup Running");

      controller.abort();
    };
  }, [debouncedSearch]);

  return {
    search,
    setSearch,
    users,
    loading,
    error,
  };
}
