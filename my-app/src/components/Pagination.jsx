export default function Pagination({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  goToPage,
}) {
  // Smart Page Numbers
  const getPageNumbers = () => {
    const pages = [];

    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div
      className="
        flex items-center
        justify-center
        gap-4
        mt-8
        flex-wrap
      "
    >
      {/* Previous */}
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="
          bg-blue-600
          text-white
          px-5 py-2
          rounded-lg
          disabled:opacity-50
        "
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => goToPage(pageNumber)}
            className={`
                px-4 py-2 rounded-lg

                transition

                ${
                  currentPage === pageNumber
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                }
              `}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages || totalPages === 0}
        className="
          bg-blue-600
          text-white
          px-5 py-2
          rounded-lg
          disabled:opacity-50
        "
      >
        Next
      </button>
    </div>
  );
}
