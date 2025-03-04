import Image from 'next/image';
import Link from 'next/link';
import { getFullImageUrl } from '@/app/lib/api';
import { ArtItem } from '@/app/lib';

// TypeScript interfaces for the component props
interface ItemGridProps {
  items: ArtItem[];
}

export default function ItemGrid({ items }: ItemGridProps) {
  return (
    // Main grid container with responsive columns
    // - 1 column on mobile, 2 on medium screens, 3 on large screens
    // - Border styling creates a grid outline effect with borders on top and left
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-black">
      {items.map((item) => {
        // Get the first image or undefined
        const image = item.images?.[0];
        // Build the full image URL if an image exists
        const imageUrl = image ? 
          getFullImageUrl(image.formats?.medium?.url || image.url) : '';
        
        return (
          // Link wrapper makes the entire grid cell clickable
          // - Each cell navigates to the detail page for this item
          // - Border styling completes the grid outline with borders on right and bottom
          // - touch-manipulation improves touch behavior on mobile devices
          <Link 
            key={item.id}
            href={`/collection/${item.slug}`}
            className="border-r border-b border-black relative cursor-pointer grid-item touch-manipulation"
          >
            {/* Square aspect ratio container for consistent cell dimensions */}
            <div className="relative aspect-square">
              {image ? (
                // Centering container for the image
                // - absolute positioning with inset-0 makes it fill the parent
                // - flex centering ensures the image is perfectly centered
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Constraining container that limits image to 80% of cell size */}
                  {/* This creates consistent padding around all images */}
                  <div className="relative w-full h-full max-w-[80%] max-h-[80%]">
                    {/* Next.js Image component with fill layout */}
                    {/* - object-contain ensures the image maintains its aspect ratio */}
                    {/* - sizes attribute optimizes responsive image loading */}
                    {/* - fill makes the image fill its parent container */}
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
                // Fallback display when no image is available
                // - Centered text message maintains consistent layout
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </div>
          </ Link>
        );
      })}
    </div>
  );
} 