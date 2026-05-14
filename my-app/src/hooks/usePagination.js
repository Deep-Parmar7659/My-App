import { useState } from "react";

export default function usePagination(data, itemsPerPage = 5) {
  const [currentPage, setCurrentPage] = useState(1);

  // Total Pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Current Data
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentData,
  };
}
