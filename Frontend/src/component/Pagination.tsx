import React from "react";
import type { IPaginationProps } from "../types/component.types";

export const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPages = () => {
    const pages = [];

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      start = 1;
      end = Math.min(5, totalPages);
    }

    if (currentPage > totalPages - 3) {
      start = Math.max(totalPages - 4, 1);
      end = totalPages;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pagesToShow = getPages();

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      {pagesToShow[0] > 1 && (
        <button
          onClick={() => onPageChange(1)}
          className="px-3 py-1 rounded bg-gray-700 text-white"
        >
          1
        </button>
      )}

      {pagesToShow[0] > 2 && <span className="text-gray-400">...</span>}

      {pagesToShow.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-white"
          }`}
        >
          {page}
        </button>
      ))}

      {pagesToShow[pagesToShow.length - 1] < totalPages - 1 && (
        <span className="text-gray-400">...</span>
      )}

      {pagesToShow[pagesToShow.length - 1] < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-1 rounded bg-gray-700 text-white"
        >
          {totalPages}
        </button>
      )}
    </div>
  );
};
