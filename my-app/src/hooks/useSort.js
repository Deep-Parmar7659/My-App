import { useMemo, useState } from "react";

export default function useSort(data, sortKey) {
  // Sort State
  const [sortOrder, setSortOrder] = useState("asc");

  // Sorted Data
  const sortedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return [...data].sort((a, b) => {
      const aVal = a[sortKey] ?? "";
      const bVal = b[sortKey] ?? "";

      if (sortOrder === "asc") {
        return aVal.localeCompare(bVal);
      }

      return bVal.localeCompare(aVal);
    });
  }, [data, sortKey, sortOrder]);

  return {
    sortOrder,
    setSortOrder,
    sortedData,
  };
}
