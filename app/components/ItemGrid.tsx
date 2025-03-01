'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getFullImageUrl } from '@/app/lib/api';
import { ArtItem } from '@/app/types';

// TypeScript interfaces for the component props
interface ItemGridProps {
  items: ArtItem[];
}

export default function ItemGrid({ items }: ItemGridProps) {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const [touchedItemId, setTouchedItemId] = useState<number | null>(null);
  const router = useRouter();
  const hasTouchRef = useRef(false);

  // Effect to detect touch devices
  useEffect(() => {
    // Check if device supports touch events
    const detectTouch = () => {
      hasTouchRef.current = true;
      // Remove listener once detected
      window.removeEventListener('touchstart', detectTouch);
    };
    
    window.addEventListener('touchstart', detectTouch, { once: true });
    
    return () => {
      window.removeEventListener('touchstart', detectTouch);
    };
  }, []);

  // Effect to reset touchedItemId when clicking elsewhere on the page
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Only reset if the click is outside our grid items
      if (!(e.target as Element).closest('.grid-item')) {
        setTouchedItemId(null);
      }
    };

    // Add event listener to document
    document.addEventListener('click', handleClickOutside);

    // Clean up event listener
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Function to handle mouse enter
  const handleMouseEnter = (id: number) => {
    // Only set hover state on non-touch devices
    if (!hasTouchRef.current) {
      setHoveredItemId(id);
    }
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  // Function to handle click/touch
  const handleClick = (e: React.MouseEvent, id: number, slug: string) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event from bubbling up to document
    
    // For touch devices, use the two-tap pattern
    if (hasTouchRef.current) {
      // If this item is already touched, navigate to its page
      if (touchedItemId === id) {
        router.push(`/collection/${slug}`);
        return;
      }
      
      // First tap: show the overlay
      setTouchedItemId(id);
    } else {
      // For mouse devices, navigate directly
      router.push(`/collection/${slug}`);
    }
  };

  // Function to handle touch start (for mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    // Mark as touch device
    hasTouchRef.current = true;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-black">
      {items.map((item) => {
        // Get the first image or undefined
        const image = item.images?.[0];
        // Build the full image URL if an image exists
        const imageUrl = image ? 
          getFullImageUrl(image.formats?.medium?.url || image.url) : '';
        
        // Convert the bullet_list string into an array by splitting at newline characters
        const bulletPoints = item.bullet_list?.split('\n') || [];
        
        // Check if this item is being hovered or touched
        const isActive = hoveredItemId === item.id || touchedItemId === item.id;
        
        return (
          <div 
            key={item.id}
            className="border-r border-b border-black relative cursor-pointer grid-item touch-manipulation"
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => handleClick(e, item.id, item.slug)}
            onTouchStart={handleTouchStart}
          >
            <div className="relative aspect-square">
              {image ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full max-w-[80%] max-h-[80%]">
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
              
              {/* Overlay that appears on hover/touch */}
              {isActive && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-2 sm:p-4 overflow-y-auto transition-opacity duration-300">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-center">{item.title}</h3>
                  
                  {bulletPoints.length > 0 && (
                    <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-xs sm:text-sm max-h-[60vh] overflow-y-auto">
                      {bulletPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  )}
                  
                  <p className="text-xs mt-2 sm:mt-4 text-gray-300 md:hidden">Tap again to view details</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
} 