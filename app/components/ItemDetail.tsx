// Server component for displaying item details
// The client-side interactivity is delegated to the ImageGallery component

import { ArtItem } from '@/app/lib';
import ImageGallery from './ImageGallery';

// TypeScript interfaces for the component props
interface ItemDetailProps {
  item: {
    data: ArtItem | null;
  };
}

export default function ItemDetail({ item, locale }: ItemDetailProps & { locale: string }) {
  // If no item data, show a message
  if (!item.data) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
        <p>Sorry, we couldn&apos;t find the item you&apos;re looking for.</p>
      </div>
    );
  }
  
  // Convert the bullet_list string into an array by splitting at newline characters
  const bulletPoints = locale === 'fr' ? item.data.bullet_list?.split('\n') || [] : item.data.localizations[0].bullet_list?.split('\n') || [];

  const title = locale === 'fr' ? item.data.title : item.data.localizations[0].title;

  const description = locale === 'fr' 
    ? (item.data.description || null) 
    : item.data.localizations[0].description || null;

  return (
    // Container for the whole page with some padding
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-0">
      {/* 
        This div controls the layout:
        - On mobile: stacked (flex-col)
        - On medium screens and up: side by side (md:flex-row)
        The gap-8 adds spacing between the columns
      */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Wrapper div for both columns */}
        <div className="flex flex-col lg:flex-row w-full">
          {/* Left column - Image Gallery (now a client component) */}
          <div className="w-full lg:w-1/2 pt-8 pb-8 sm:pb-12 lg:pb-8 pr-0 lg:pr-6">
            <ImageGallery 
              images={item.data.images || []} 
              title={item.data.title} 
            />
          </div>

          {/* Right column - Item details */}
          <div className="w-full lg:w-1/2 lg:border-l lg:border-black pl-0 lg:pl-8 pt-6 lg:pt-8 pb-8 sm:pb-12 lg:pb-8">
            {/* Title of the art piece */}
            <h1 className="text-2xl font-bold mb-6">{title}</h1>
            
            {/* 
              Bullet list:
              - list-disc adds bullet points
              - pl-5 adds padding on the left
              - space-y-2 adds vertical spacing between items
            */}
            <ul className="list-disc pl-5 mb-6 space-y-2">
              {/* 
                Map over each bullet point to create list items
                Each item needs a unique key (we use the index)
              */}
              {bulletPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            
            {/* 
              Only show the description if it exists
              text-gray-600 makes the text slightly lighter
            */}
            {description && (
              <p className="text-gray-600">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 