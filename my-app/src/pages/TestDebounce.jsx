import { useEffect, useState } from "react";

import useDebounce from "../hooks/useDebounce";

export default function TestDebounce() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    if (!debouncedSearch) return;

    console.log("API CALL:", debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="p-5">
      <h1 className="text-xl mb-4">Debounce Test</h1>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <p className="mt-4">Typing: {search}</p>

      <p>Debounced: {debouncedSearch}</p>
    </div>
  );
}
