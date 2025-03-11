'use client';

import { useState } from 'react';
import Image from 'next/image';

/**
 * Client component for the hero image with loading state
 * 
 * This component handles:
 * - Loading state tracking for the image
 * - Displaying a skeleton loader while the image loads
 * - Smooth fade-in animation when the image is ready
 * - Maintaining the same layout and styling as the original implementation
 */
export function HeroImage({ 
  imageUrl, 
  alt 
}: { 
  imageUrl: string; 
  alt: string;
}) {
  // State to track if the image has loaded
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* Skeleton loader that shows while the image is loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#EAE8DA] animate-pulse rounded-full" />
      )}
      
      {/* Next.js Image component with the same dimensions and styling as original */}
      <Image
        src={imageUrl}
        alt={alt}
        width={1000}
        height={1000}
        className={`
          w-full h-full object-cover
          transition-opacity duration-500 ease-in-out
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
        onLoad={() => setIsLoaded(true)}
        priority
      />
    </div>
  );
} 