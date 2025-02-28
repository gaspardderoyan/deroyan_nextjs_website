'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getFullImageUrl } from '@/app/lib/api';

// TypeScript interfaces for the component props
interface ImageData {
  id: number;
  documentId: string;
  name: string;
  width: number;
  height: number;
  url: string;
  formats: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
  };
}

interface ArtItem {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  bullet_list: string;
  type: string;
  images: ImageData[];
}

interface ItemGridProps {
  items: ArtItem[];
}

export default function ItemGrid({ items }: ItemGridProps) {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const [touchedItemId, setTouchedItemId] = useState<number | null>(null);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Effect to detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    
    // Check initially
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Effect to reset touchedItemId when clicking elsewhere on the page
  useEffect(() => {
    const handleClickOutside = () => {
      setTouchedItemId(null);
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
    if (!isMobile) {
      setHoveredItemId(id);
    }
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredItemId(null);
    }
  };

  // Function to handle click/touch
  const handleClick = (e: React.MouseEvent, id: number, documentId: string) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event from bubbling up to document
    
    if (isMobile) {
      // On mobile: first tap shows info, second tap navigates
      if (touchedItemId === id) {
        router.push(`/collection/${documentId}`);
      } else {
        setTouchedItemId(id);
      }
    } else {
      // On desktop: always navigate on click
      router.push(`/collection/${documentId}`);
    }
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
        const isActive = isMobile ? touchedItemId === item.id : hoveredItemId === item.id;
        
        return (
          <div 
            key={item.id}
            className="border-r border-b border-black relative cursor-pointer"
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => handleClick(e, item.id, item.documentId)}
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