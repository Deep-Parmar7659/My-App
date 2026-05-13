// Base reusable hook
import { useEffect, useState } from "react";

export default function useFetch(fetchFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, [fetchFunction]);

  return {
    data,
    loading,
    error,
  };
}
