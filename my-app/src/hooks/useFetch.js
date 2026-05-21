// Base reusable hook
import { useCallback, useEffect, useState } from "react";

export default function useFetch(fetchFunction) {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      const result = await fetchFunction();

      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    let isMounted = true;
    const executeFetch = async () => {
      if (isMounted) await fetchData();
    };
    executeFetch();
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
