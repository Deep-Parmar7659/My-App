import { useMemo } from "react";

export default function useSearch(data, key, searchValue) {
  const filteredData = useMemo(() => {
    if (!searchValue) {
      return data;
    }
    return data.filter((item) =>
      item[key]?.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [data, key, searchValue]);

  return {
    filteredData,
  };
}
