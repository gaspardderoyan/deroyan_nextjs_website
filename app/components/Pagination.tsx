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

  // Common button classes for all pagination elements (arrows and page numbers)
  // Using the same dimensions for all elements to ensure consistency
  const btnClasses = "flex items-center justify-center w-10 h-10 border border-black text-xs sm:text-sm focus:outline-none";
  const activeBtnClasses = "bg-black text-white";
  const inactiveBtnClasses = "hover:bg-black hover:text-white transition-colors focus:bg-transparent focus:text-black active:bg-transparent active:text-black";

  return (
    <div className="flex items-center justify-center mt-6 sm:mt-8 gap-1 px-2">
      {/* Previous page button (arrow) */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className={`${btnClasses} ${inactiveBtnClasses}`}
          aria-label="Previous page"
          prefetch={true}
        >
          <span aria-hidden="true">←</span>
        </Link>
      ) : (
        <div className={`${btnClasses} opacity-50 cursor-not-allowed`}>
          <span aria-hidden="true">←</span>
        </div>
      )}
      
      {/* First page - only show if not current page */}
      {currentPage > 1 && (
        <Link
          href={getPageUrl(1)}
          className={`${btnClasses} ${inactiveBtnClasses}`}
          prefetch={true}
        >
          1
        </Link>
      )}
      
      {/* Current page */}
      <Link
        href={getPageUrl(currentPage)}
        className={`${btnClasses} ${activeBtnClasses}`}
        prefetch={true}
        aria-current="page"
      >
        {currentPage}
      </Link>
      
      {/* Last page - only show if not current page */}
      {currentPage < totalPages && (
        <Link
          href={getPageUrl(totalPages)}
          className={`${btnClasses} ${inactiveBtnClasses}`}
          prefetch={true}
        >
          {totalPages}
        </Link>
      )}
      
      {/* Next page button (arrow) */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className={`${btnClasses} ${inactiveBtnClasses}`}
          aria-label="Next page"
          prefetch={true}
        >
          <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <div className={`${btnClasses} opacity-50 cursor-not-allowed`}>
          <span aria-hidden="true">→</span>
        </div>
      )}
    </div>
  );
} 