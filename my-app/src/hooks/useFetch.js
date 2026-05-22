import { useEffect, useState } from "react";

export default function useFetch(asyncFunction) {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const result = await asyncFunction(controller.signal);

        setData(result);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Request Cancelled");

          return;
        }

        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      console.log("useFetch Cleanup Running");

      controller.abort();
    };
  }, [asyncFunction]);

  return {
    data,
    loading,
    error,
  };
}
