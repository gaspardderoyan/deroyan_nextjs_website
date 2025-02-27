'use client';

import Image from 'next/image';

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

export default function ItemDetail({ item }: ItemDetailProps) {
  // Get the first image from the array (if any images exist)
  const image = item.data.images?.[0];
  
  // Build the full image URL by adding the base URL to the relative path
  const imageUrl = image ? `http://localhost:1337${image.url}` : '';
  
  // Convert the bullet_list string into an array by splitting at newline characters
  const bulletPoints = item.data.bullet_list?.split('\n') || [];

  return (
    // Container for the whole page with some padding
    <div className="container mx-auto">
      {/* 
        This div controls the layout:
        - On mobile: stacked (flex-col)
        - On medium screens and up: side by side (md:flex-row)
        The gap-8 adds spacing between the columns
      */}
      <div className="flex flex-col md:flex-row gap-8 ">
        {/* Wrapper div for both columns */}
        <div className="flex flex-col md:flex-row w-full">
          {/* Left column - Image */}
          <div className="w-full md:w-1/2 pt-8 pb-16">
            {/* 
              Fixed height container for the image
              bg-gray-100 gives a light background
              rounded-lg adds rounded corners
              overflow-hidden ensures nothing spills outside the container
            */}
            <div className="relative h-[650px] bg-[#EAE8DA] rounded-lg overflow-hidden">
              {/* Only show the image if we have one */}
              {image ? (
                /* 
                  Next.js Image component:
                  - fill makes it fill the parent container
                  - object-contain ensures the whole image is visible (no cropping)
                  - sizes tells the browser how much space the image will take up
                  - priority makes it load with higher priority
                */
                <Image 
                  src={imageUrl}
                  alt={item.data.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                  priority
                />
              ) : (
                /* If there's no image, show this message */
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </div>
          </div>

          {/* Right column - Item details */}
          <div className="w-full md:w-1/2 md:border-l md:border-black pl-8 pt-8 pb-16">
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