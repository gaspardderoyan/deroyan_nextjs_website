'use client';

import { useEffect } from 'react';

interface ScrollToTopProps {
  children: React.ReactNode;
}

/**
 * ScrollToTop component
 * 
 * This component scrolls the window to the top when it mounts.
 * It's useful for ensuring pages start at the top when navigating
 * between routes, especially on mobile devices.
 */
export default function ScrollToTop({ children }: ScrollToTopProps) {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return <>{children}</>;
} 