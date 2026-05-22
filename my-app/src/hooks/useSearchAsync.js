import { useEffect, useState } from "react";

import useDebounce from "./useDebounce";

export default function useSearchAsync(searchFunction, delay = 1000) {
  const [search, setSearch] = useState("");

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(search, delay);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchResults() {
      if (!debouncedSearch.trim()) {
        setResults([]);

        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await searchFunction(debouncedSearch, controller.signal);

        setResults(data.users || []);
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

    fetchResults();

    return () => {
      console.log("Search Cleanup Running");

      controller.abort();
    };
  }, [debouncedSearch, searchFunction]);

  return {
    search,
    setSearch,
    results,
    loading,
    error,
  };
}
