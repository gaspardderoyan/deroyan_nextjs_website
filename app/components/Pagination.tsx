'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LocalizedTranslations } from '../lib/UI_api';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  basePath: string;
  LocalizedTranslationsWithLocale: LocalizedTranslations[string];
}

export default function Pagination({ currentPage, totalPages, pageSize, basePath, LocalizedTranslationsWithLocale }: PaginationProps) {
  // Get current search parameters to preserve filters when navigating
  const searchParams = useSearchParams();

  const localizedTranslations = LocalizedTranslationsWithLocale;
  
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

  // Common button classes with focus and active states explicitly reset
  const commonBtnClasses = "px-3 py-2 border border-black text-sm sm:text-base focus:outline-none";
  const activeBtnClasses = "bg-black text-white";
  const inactiveBtnClasses = "hover:bg-black hover:text-white transition-colors focus:bg-transparent focus:text-black active:bg-transparent active:text-black";
  
  // Navigation button classes (Previous/Next)
  const navBtnClasses = "px-2 sm:px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors text-sm sm:text-base focus:outline-none focus:bg-transparent focus:text-black active:bg-transparent active:text-black";

  return (
    <div className="flex flex-wrap justify-center mt-8 gap-1 px-2">
      {/* Previous page button */}
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className={navBtnClasses}
          aria-label="Previous page"
          prefetch={true}
        >
          {localizedTranslations['pagination.prev'].value}
        </Link>
      )}
      
      {/* First page */}
      <Link
        href={getPageUrl(1)}
        className={`${commonBtnClasses} ${
          currentPage === 1 ? activeBtnClasses : inactiveBtnClasses
        }`}
        prefetch={true}
      >
        1
      </Link>
      
      {/* Ellipsis for many pages - only show on larger screens */}
      {currentPage > 3 && (
        <span className="hidden sm:inline-block px-2 py-2 border border-black text-sm sm:text-base">...</span>
      )}
      
      {/* Page before current if not first or second page */}
      {currentPage > 2 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className={`${commonBtnClasses} ${inactiveBtnClasses}`}
          prefetch={true}
        >
          {currentPage - 1}
        </Link>
      )}
      
      {/* Current page if not first page */}
      {currentPage !== 1 && currentPage !== totalPages && (
        <Link
          href={getPageUrl(currentPage)}
          className={`${commonBtnClasses} ${activeBtnClasses}`}
          prefetch={true}
        >
          {currentPage}
        </Link>
      )}
      
      {/* Page after current if not last or second-to-last page */}
      {currentPage < totalPages - 1 && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className={`${commonBtnClasses} ${inactiveBtnClasses}`}
          prefetch={true}
        >
          {currentPage + 1}
        </Link>
      )}
      
      {/* Ellipsis for many pages - only show on larger screens */}
      {currentPage < totalPages - 2 && (
        <span className="hidden sm:inline-block px-2 py-2 border border-black text-sm sm:text-base">...</span>
      )}
      
      {/* Last page if not the first page */}
      {totalPages > 1 && (
        <Link
          href={getPageUrl(totalPages)}
          className={`${commonBtnClasses} ${
            currentPage === totalPages ? activeBtnClasses : inactiveBtnClasses
          }`}
          prefetch={true}
        >
          {totalPages}
        </Link>
      )}
      
      {/* Next page button */}
      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className={navBtnClasses}
          aria-label="Next page"
          prefetch={true}
        >
          {localizedTranslations['pagination.next'].value}
        </Link>
      )}
    </div>
  );
} 