import Link from 'next/link';
import { getFullImageUrl } from '@/app/lib/api';
import { ArtItem } from '@/app/lib';
import ImageWithLoading from '@/app/components/ImageWithLoading';

// TypeScript interfaces for the component props
interface ItemGridProps {
  items: ArtItem[];
  locale: string;
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

export default function ItemGrid({ items, locale }: ItemGridProps) {
  return (
    // Main grid container with responsive columns
    // - 1 column on mobile and medium screens, 3 on large screens
    // - Border styling creates a grid outline effect with borders on top and left
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 border-t border-l border-black">
      {items.map((item) => {
        // Get the first image or undefined
        const image = item.images?.[0];
        // Build the full image URL if an image exists
        const imageUrl = image ? 
          getFullImageUrl(image.formats?.small?.url || image.url) : '';
        
        // Extract the first bullet point from bullet_list if available
        const bulletPoints = item.bullet_list?.split('\n') || [];
        // Use the first bullet point as alt text, or fall back to item title if no bullet points
        const altText = bulletPoints.length > 0 ? bulletPoints[0] : item.title;
        
        return (
          // Link wrapper makes the entire grid cell clickable
          // - Each cell navigates to the detail page for this item
          // - Border styling completes the grid outline with borders on right and bottom
          // - touch-manipulation improves touch behavior on mobile devices
          <Link 
            key={item.id}
            href={`/${locale}/collection/${item.slug}`}
            className="border-r border-b border-black relative cursor-pointer grid-item touch-manipulation"
          >
            {/* Square aspect ratio container for consistent cell dimensions */}
            <div className="relative aspect-square flex flex-col">
              {image ? (
                // Centering container for the image
                // - relative positioning with flex-1 to allow space for title
                // - flex centering ensures the image is perfectly centered
                <div className="relative flex-1 flex items-center justify-center">
                  {/* Using the separate client component for image loading */}
                  <ImageWithLoading src={imageUrl} alt={altText} />
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
              <div className="flex items-center justify-center py-4 text-center px-4 bg-[hsl(53,28%,92%)]">
                <h2 className="font-medium truncate">{formatTitle(item.title)}</h2>
              </div>
            </div>
          </ Link>
        );
      })}
    </div>
  );
} 