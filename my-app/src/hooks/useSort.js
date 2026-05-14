import { useMemo, useState } from "react";

export default function useSort(data, sortKey) {
  // Sort State
  const [sortOrder, setSortOrder] = useState("asc");

  // Sorted Data
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortKey].localeCompare(b[sortKey]);
      }

      return b[sortKey].localeCompare(a[sortKey]);
    });
  }, [data, sortKey, sortOrder]);

  return {
    sortOrder,
    setSortOrder,
    sortedData,
  };
}
