'use client';
// TODO: does this need to be a client component?

import Image from 'next/image';
import { getFullImageUrl } from '@/app/lib/api';
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger,
  DialogTitle 
} from '@/components/ui/dialog';

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

interface ItemDetailProps {
  item: {
    data: ArtItem;
  };
}

// TODO: get all of the images
// TODO: display the non-selected images thumbnails 
export default function ItemDetail({ item }: ItemDetailProps) {
  // State to track the currently selected image index
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const numImages = item.data.images?.length || 0;
  
  // Get the currently selected image (or the first one if none is selected)
  const selectedImage = numImages > 0 ? item.data.images[selectedImageIndex] : null;
  
  // Build the full image URL by adding the base URL to the relative path
  const imageUrl = selectedImage ? getFullImageUrl(selectedImage.url) : '';
  
  // Function to handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };
  
  // Convert the bullet_list string into an array by splitting at newline characters
  const bulletPoints = item.data.bullet_list?.split('\n') || [];

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
          {/* Left column - Image */}
          <div className="w-full lg:w-1/2 pt-8 pb-8 sm:pb-12 lg:pb-8 pr-0 lg:pr-6">
            {/* 
              Fixed height container for the image
              bg-gray-100 gives a light background
              rounded-lg adds rounded corners
              overflow-hidden ensures nothing spills outside the container
            */}
            <div className="flex flex-col">
              <div className="relative h-[350px] sm:h-[500px] lg:h-[650px] bg-[#EAE8DA] rounded-lg overflow-hidden">
                {/* Only show the image if we have one */}
                {selectedImage ? (
                  /* 
                    Wrap the image in a Dialog component for zoomable view
                    The Dialog is triggered by clicking on the image
                  */
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative w-full h-full cursor-zoom-in">
                        <Image 
                          src={imageUrl}
                          alt={item.data.title}
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
                        {item.data.title}
                      </DialogTitle>
                      <div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md bg-transparent shadow-md">
                        <Image 
                          src={imageUrl}
                          alt={item.data.title}
                          fill
                          className="h-full w-full object-contain"
                          priority
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  /* If there's no image, show this message */
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
              </div>
              
              {/* Thumbnails row - only show if there's more than one image */}
              {numImages > 1 && (
                <div className="flex flex-row gap-2 mt-4 overflow-x-auto justify-center">
                  {item.data.images.map((img, index) => {
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
          </div>

          {/* Right column - Item details */}
          <div className="w-full lg:w-1/2 lg:border-l lg:border-black pl-0 lg:pl-8 pt-6 lg:pt-8 pb-8 sm:pb-12 lg:pb-8">
            {/* Title of the art piece */}
            <h1 className="text-2xl font-bold mb-6">{item.data.title}</h1>
            
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
            {item.data.description && (
              <p className="text-gray-600">{item.data.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 