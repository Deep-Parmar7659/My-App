import useUserSearch from "../hooks/useUserSearch";

export default function SearchUsers() {
  const { search, setSearch, users, loading, error } = useUserSearch();

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
            {user.firstName} {user.lastName}
          </div>
        ))}
      </div>
    </div>
  );
}
