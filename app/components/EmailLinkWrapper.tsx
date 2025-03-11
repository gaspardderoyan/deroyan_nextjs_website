'use client';

import dynamic from 'next/dynamic';

/**
 * EmailLinkWrapper component
 * 
 * This is a client component wrapper that safely imports the EmailLink component.
 * By using 'use client', this component establishes a proper client boundary,
 * allowing us to use client-only features like dynamic imports with ssr: false.
 * 
 * This approach follows Next.js App Router best practices for mixing server and client components.
 */

// Dynamically import the EmailLink component with no SSR
// This ensures it only loads on the client side
const EmailLink = dynamic(() => import('./EmailLink'), { 
  ssr: false,
  // Show a placeholder while the component is loading
  loading: () => <span className="opacity-50">Loading email...</span>
});

export default function EmailLinkWrapper() {
  return <EmailLink />;
} 