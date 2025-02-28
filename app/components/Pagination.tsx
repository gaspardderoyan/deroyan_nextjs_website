'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, pageSize, basePath }: PaginationProps) {
  // Get current search parameters to preserve filters when navigating
  const searchParams = useSearchParams();
  
  // If there's only one page, don't show pagination
  if (totalPages <= 1) {
    return null;
  }

  // Function to generate the URL for a specific page while preserving other query parameters
  const getPageUrl = (page: number) => {
    // Create a new URLSearchParams object from the current search params
    const params = new URLSearchParams(searchParams.toString());
    
    // Update the page and pageSize parameters
    params.set('page', page.toString());
    params.set('pageSize', pageSize.toString());
    
    // Return the URL with all parameters
    return `${basePath}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center mt-8 space-x-1">
      {/* Previous page button */}
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors"
        >
          Previous
        </Link>
      )}
      
      {/* First page */}
      <Link
        href={getPageUrl(1)}
        className={`px-4 py-2 border border-black ${
          currentPage === 1
            ? 'bg-black text-white'
            : 'hover:bg-black hover:text-white transition-colors'
        }`}
      >
        1
      </Link>
      
      {/* Ellipsis for many pages */}
      {currentPage > 3 && (
        <span className="px-4 py-2 border border-black">...</span>
      )}
      
      {/* Page before current if not first or second page */}
      {currentPage > 2 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors"
        >
          {currentPage - 1}
        </Link>
      )}
      
      {/* Current page if not first page */}
      {currentPage !== 1 && currentPage !== totalPages && (
        <Link
          href={getPageUrl(currentPage)}
          className="px-4 py-2 border border-black bg-black text-white"
        >
          {currentPage}
        </Link>
      )}
      
      {/* Page after current if not last or second-to-last page */}
      {currentPage < totalPages - 1 && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors"
        >
          {currentPage + 1}
        </Link>
      )}
      
      {/* Ellipsis for many pages */}
      {currentPage < totalPages - 2 && (
        <span className="px-4 py-2 border border-black">...</span>
      )}
      
      {/* Last page if not the first page */}
      {totalPages > 1 && (
        <Link
          href={getPageUrl(totalPages)}
          className={`px-4 py-2 border border-black ${
            currentPage === totalPages
              ? 'bg-black text-white'
              : 'hover:bg-black hover:text-white transition-colors'
          }`}
        >
          {totalPages}
        </Link>
      )}
      
      {/* Next page button */}
      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors"
        >
          Next
        </Link>
      )}
    </div>
  );
} 