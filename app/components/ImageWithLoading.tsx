'use client';

import { useState } from 'react';
import Image from 'next/image';

/**
 * Client component that handles image loading with animation
 * This component is responsible for:
 * - Tracking the loading state of the image
 * - Displaying a skeleton loader while the image loads
 * - Applying a fade-in animation when the image is ready
 */
export default function ImageWithLoading({ 
  src, 
  alt 
}: { 
  src: string; 
  alt: string;
}) {
  // State to track if the image has loaded
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full max-w-[90%] max-h-[90%] md:max-w-[80%] md:max-h-[80%]">
      {/* Skeleton loader that shows while the image is loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[hsl(53,28%,89%)] animate-pulse" />
      )}
      
      {/* Next.js Image component with fill layout */}
      {/* - object-contain ensures the image maintains its aspect ratio */}
      {/* - sizes attribute optimizes responsive image loading */}
      {/* - fill makes the image fill its parent container */}
      {/* - transition opacity provides the fade-in effect when loaded */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`
          object-contain
          transition-opacity duration-300 ease-in-out
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
} 