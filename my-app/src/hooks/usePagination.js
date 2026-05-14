import { useState } from "react";

export default function usePagination(data, itemsPerPage = 5) {
  const [currentPage, setCurrentPage] = useState(1);

  // Total Pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Validate Current Page
  const safeCurrentPage =
    currentPage > totalPages && totalPages > 0 ? 1 : currentPage;

  // Current Data
  const currentData = data.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage,
  );

  // Next Page
  const nextPage = () => {
    if (safeCurrentPage < totalPages) {
      setCurrentPage(safeCurrentPage + 1);
    }
  };

  // Previous Page
  const prevPage = () => {
    if (safeCurrentPage > 1) {
      setCurrentPage(safeCurrentPage - 1);
    }
  };

  return {
    currentPage: safeCurrentPage,
    setCurrentPage,
    totalPages,
    currentData,
    nextPage,
    prevPage,
  };
}
