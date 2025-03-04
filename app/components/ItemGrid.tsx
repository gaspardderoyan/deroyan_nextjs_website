import Image from 'next/image';
import Link from 'next/link';
import { getFullImageUrl } from '@/app/lib/api';
import { ArtItem } from '@/app/lib';

// TypeScript interfaces for the component props
interface ItemGridProps {
  items: ArtItem[];
}

/**
 * Function to format text to title case with special handling for:
 * - Single letters (like "a" or "l" in "l'art") remain lowercase
 * - Words with quotes (quotes aren't considered part of the word)
 * - Proper capitalization of all other words (first letter uppercase, rest lowercase)
 * 
 * @param text The string to format
 * @returns The formatted string with proper title case
 */
function formatTitle(text: string): string {
  if (!text) return '';
  
  // Convert the entire string to lowercase first
  const lowercaseText = text.toLowerCase();
  
  // Process the text with a simpler regex approach
  return lowercaseText.replace(/\b([a-z])([a-z]*)\b|(['"][a-z])([a-z]*)/gi, 
    (match, firstLetter, restOfWord, quotedFirstLetter, quotedRestOfWord) => {
      // Handle single letters - keep them lowercase
      if (firstLetter && !restOfWord) {
        return firstLetter.toLowerCase();
      }
      
      // Handle words with opening quotes
      if (quotedFirstLetter && quotedRestOfWord !== undefined) {
        // Keep the quote, capitalize the first actual letter
        return quotedFirstLetter.charAt(0) + quotedFirstLetter.charAt(1).toUpperCase() + quotedRestOfWord;
      }
      
      // Normal words - capitalize first letter
      if (firstLetter && restOfWord !== undefined) {
        return firstLetter.toUpperCase() + restOfWord;
      }
      
      // Default: return the match unchanged
      return match;
    }
  );
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
            className="border-r border-b border-black relative cursor-pointer grid-item touch-manipulation hover:bg-black/5 transition-colors duration-200 group"
          >
            {/* Square aspect ratio container for consistent cell dimensions */}
            <div className="relative aspect-square flex flex-col">
              {image ? (
                // Centering container for the image
                // - absolute positioning with inset-0 makes it fill the parent
                // - flex centering ensures the image is perfectly centered
                // - Changed from absolute to relative positioning with flex-1 to allow space for title
                <div className="relative flex-1 flex items-center justify-center">
                  {/* Constraining container that limits image to 75% of cell size to make room for title */}
                  {/* This creates consistent padding around all images */}
                  <div className="relative w-full h-full max-w-[75%] max-h-[75%]">
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
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
              
              {/* Title container at the bottom of the square */}
              {/* - flex items-center vertically centers the title within the container */}
              {/* - text-center centers the text horizontally */}
              {/* - truncate prevents long titles from breaking the layout */}
              {/* - px-4 adds horizontal padding to prevent text from touching the edges */}
              {/* - py-4 adds equal vertical padding for better spacing */}
              {/* - bg-[hsl(53,28%,93%)] sets the background color to the specified HSL value */}
              <div className="flex items-center justify-center py-4 text-center px-4 bg-[hsl(53,28%,92%)] group-hover:bg-black/5 transition-colors duration-200">
                <h2 className="font-medium truncate">{formatTitle(item.title)}</h2>
              </div>
            </div>
          </ Link>
        );
      })}
    </div>
  );
} 