import { useState, useEffect, useCallback } from "react";

export default function useFetch(asyncFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (signal) => {
      try {
        setLoading(true);
        setError(null);

        const result = await asyncFunction(signal);

        setData(result);
      } catch (error) {
        // Ignore aborted requests
        if (error.name === "AbortError") {
          return;
        }

        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction],
  );

  useEffect(() => {
    const controller = new AbortController();

    const executeFetch = async () => {
      await fetchData(controller.signal);
    };

    executeFetch();

    return () => {
      controller.abort();
    };
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
