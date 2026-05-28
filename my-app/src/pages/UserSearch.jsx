import { useState } from "react";
import useUserSearch from "../hooks/users/useUserSearch";

export default function UserSearch() {
  const [search, setSearch] = useState("");
  const { results, loading, error } = useUserSearch(search);

  return (
    <div className="p-6">
      {/* Heading */}
      <h1
        className="
          text-3xl font-bold
          mb-6
        "
      >
        User Search
      </h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full max-w-md
          border rounded-xl
          px-4 py-3
          mb-6
        "
      />

      {/* Loading */}
      {loading && <p>Searching...</p>}

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Results */}
      <div className="space-y-4">
        {results.map((user) => (
          <div
            key={user.id}
            className="
              p-4 rounded-xl
              border
            "
          >
            <h2 className="font-bold">
              {user.firstName} {user.lastName}
            </h2>

            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
