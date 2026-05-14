export default function Pagination({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  goToPage,
}) {
  return (
    <div
      className="
        flex items-center
        justify-center
        gap-4
        mt-8
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
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;

          return (
            <button
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              className={`
                px-4 py-2 rounded-lg

                ${
                  currentPage === pageNumber
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                }
              `}
            >
              {pageNumber}
            </button>
          );
        })}
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
