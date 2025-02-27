'use client';

import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, pageSize, basePath }: PaginationProps) {
  // If there's only one page, don't show pagination
  if (totalPages <= 1) {
    return null;
  }

  // Function to generate the URL for a specific page
  const getPageUrl = (page: number) => {
    return `${basePath}?page=${page}&pageSize=${pageSize}`;
  };

  return (
    <div className="flex justify-center mt-8 space-x-2">
      {/* Previous page button */}
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Previous
        </Link>
      )}
      
      {/* First page */}
      <Link
        href={getPageUrl(1)}
        className={`px-4 py-2 border rounded-md ${
          currentPage === 1
            ? 'bg-black text-white border-black'
            : 'border-gray-300 hover:bg-gray-100'
        }`}
      >
        1
      </Link>
      
      {/* Ellipsis for many pages */}
      {currentPage > 3 && (
        <span className="px-4 py-2">...</span>
      )}
      
      {/* Page before current if not first or second page */}
      {currentPage > 2 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          {currentPage - 1}
        </Link>
      )}
      
      {/* Current page if not first page */}
      {currentPage !== 1 && currentPage !== totalPages && (
        <Link
          href={getPageUrl(currentPage)}
          className="px-4 py-2 border rounded-md bg-black text-white border-black"
        >
          {currentPage}
        </Link>
      )}
      
      {/* Page after current if not last or second-to-last page */}
      {currentPage < totalPages - 1 && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          {currentPage + 1}
        </Link>
      )}
      
      {/* Ellipsis for many pages */}
      {currentPage < totalPages - 2 && (
        <span className="px-4 py-2">...</span>
      )}
      
      {/* Last page if not the first page */}
      {totalPages > 1 && (
        <Link
          href={getPageUrl(totalPages)}
          className={`px-4 py-2 border rounded-md ${
            currentPage === totalPages
              ? 'bg-black text-white border-black'
              : 'border-gray-300 hover:bg-gray-100'
          }`}
        >
          {totalPages}
        </Link>
      )}
      
      {/* Next page button */}
      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Next
        </Link>
      )}
    </div>
  );
} 