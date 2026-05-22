import { useCallback, useEffect, useState } from "react";

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
        if (error.name === "AbortError") return;
        setError(error.message);
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [asyncFunction],
  );

  useEffect(() => {
    const controller = new AbortController();
    Promise.resolve().then(() => fetchData(controller.signal));
    return () => controller.abort();
  }, [fetchData]);

  // refetch — manually re-trigger without abort
  const refetch = useCallback(() => {
    fetchData(new AbortController().signal);
  }, [fetchData]);

  return { data, loading, error, refetch };
}
