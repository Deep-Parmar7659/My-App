// Base reusable hook
import { useCallback, useEffect, useState } from "react";

export default function useFetch(fetchFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const result = await fetchFunction();

      setData(result);

      setError("");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setTimeout(() => {
        fetchData();
      }, 0);
    }
    return () => {
      isMounted = false;
    };
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
