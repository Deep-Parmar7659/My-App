import { useMemo, useState } from "react";
import useDebounce from "./useDebounce";

export default function useSearch(data, searchKey) {
  // Search State
  const [search, setSearch] = useState("");

  // Debounced Search
  const debouncedSearch = useDebounce(search, 300);

  // Filtered Data
  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.filter((item) =>
      (item[searchKey] ?? "")
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase()),
    );
  }, [data, searchKey, debouncedSearch]);

  return {
    search,
    setSearch,
    filteredData,
  };
}
