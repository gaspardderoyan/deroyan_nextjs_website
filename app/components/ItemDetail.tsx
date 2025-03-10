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
    // Use a full-height container with relative positioning
    <div className="flex-grow flex flex-col relative">
      {/* Vertical divider that extends full height - positioned absolutely */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-black"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-0 flex-grow">
        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Image Gallery */}
          <div className="w-full lg:w-1/2 pt-8 pb-8 sm:pb-12 lg:pb-8 pr-0 lg:pr-6">
            <ImageGallery 
              images={item.data.images || []} 
              title={item.data.title} 
            />
          </div>

          {/* Right column - Item details */}
          <div className="w-full lg:w-1/2 pl-0 lg:pl-8 pt-6 lg:pt-8 pb-8 sm:pb-12 lg:pb-8">
            {/* Title of the art piece */}
            <h1 className="text-2xl font-bold mb-6">{title}</h1>
            
            {/* Bullet list */}
            <ul className="list-disc pl-5 mb-6 space-y-2">
              {bulletPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            
            {/* Description if it exists */}
            {description && (
              <p className="text-gray-600">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 