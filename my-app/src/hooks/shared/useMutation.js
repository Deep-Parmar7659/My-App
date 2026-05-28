import { useState } from "react";

export default function useMutation(apiFunction) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const mutate = async (...args) => {
    try {
      setLoading(true);
      setError("");

      const result = await apiFunction(...args);

      return result;
    } catch (err) {
      setError(err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}
