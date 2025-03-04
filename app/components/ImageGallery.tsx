'use client';

import Image from 'next/image';
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger,
  DialogTitle 
} from '@/app/lib/dialog';
import { ImageData } from '@/app/lib';
import { getFullImageUrl } from '@/app/lib/api';

/**
 * Props for the ImageGallery component
 */
interface ImageGalleryProps {
  images: ImageData[];
  title: string;
}

/**
 * Client component that handles the image gallery with state management
 * This component is responsible for:
 * - Maintaining the selected image state
 * - Handling thumbnail clicks
 * - Rendering the image gallery with zoom functionality
 */
export default function ImageGallery({ images, title }: ImageGalleryProps) {
  // State to track the currently selected image index
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const numImages = images?.length || 0;
  
  // If no images, show a message
  if (numImages === 0) {
    return (
      <div className="flex flex-col">
        <div className="relative h-[350px] sm:h-[500px] lg:h-[650px] bg-[#EAE8DA] rounded-lg overflow-hidden">
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No image available</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Get the currently selected image
  const selectedImage = images[selectedImageIndex];
  
  // Build the full image URL by adding the base URL to the relative path
  const imageUrl = getFullImageUrl(selectedImage.url);
  
  // Function to handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[350px] sm:h-[500px] lg:h-[650px] bg-[#EAE8DA] rounded-lg overflow-hidden">
        {/* Wrap the image in a Dialog component for zoomable view */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative w-full h-full cursor-zoom-in">
              <Image 
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
                className="object-contain"
                priority
              />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-7xl border-0 bg-transparent p-0">
            {/* Adding DialogTitle for accessibility, with sr-only to hide it visually */}
            <DialogTitle className="sr-only">
              {title}
            </DialogTitle>
            <div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md bg-transparent shadow-md">
              <Image 
                src={imageUrl}
                alt={title}
                fill
                className="h-full w-full object-contain"
                priority
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Thumbnails row - only show if there's more than one image */}
      {numImages > 1 && (
        <div className="flex flex-row gap-2 mt-4 overflow-x-auto justify-center">
          {images.map((img, index) => {
            // Get the thumbnail URL or fallback to the original URL
            const thumbUrl = getFullImageUrl(img.formats?.thumbnail?.url || img.url);
            
            return (
              <div 
                key={img.id} 
                className={`
                  relative h-16 w-16 flex-shrink-0 cursor-pointer 
                  border-2 rounded overflow-hidden
                  ${index === selectedImageIndex ? 'opacity-60 border-black' : 'border-transparent hover:border-gray-300'}
                `}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  src={thumbUrl}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
} 