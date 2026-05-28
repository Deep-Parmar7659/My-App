import { useEffect, useState } from "react";
import useDebounce from "../shared/useDebounce";

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

        // searchFunction (searchUsers) returns a plain array
        const data = await searchFunction(debouncedSearch, controller.signal);
        setResults(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchResults();

    return () => controller.abort();
  }, [debouncedSearch, searchFunction]);

  return { search, setSearch, results, loading, error };
}
