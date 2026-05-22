import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { searchUsers } from "../api/userService";

export default function SearchUsers() {
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
        setLoading(false);
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

  return (
    <div className="p-5">
      <h1 className="text-2xl mb-4">Search Users</h1>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full"
      />
      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="mt-4 space-y-2">
        {users.map((user) => (
          <div key={user.id} className="border p-3 rounded">
            {user.firstName}
          </div>
        ))}
      </div>
    </div>
  );
}
