import { useState } from "react";

export default function usePagination(data, itemsPerPage = 5) {
  const [currentPage, setCurrentPage] = useState(1);

  // Total Pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
  };
}
