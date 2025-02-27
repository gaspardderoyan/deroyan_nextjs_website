// page to show all items, with pagination
import Link from 'next/link';
import Image from 'next/image';

// TypeScript interfaces for the API response
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

// Interface for the paginated response from Strapi
interface PaginatedApiResponse {
  data: ArtItem[];
  meta: {
    pagination: {
      page: number;      // Current page
      pageSize: number;  // Items per page
      pageCount: number; // Total number of pages
      total: number;     // Total number of items
    };
  };
}

// This function fetches multiple items with pagination
async function fetchItems(page: number = 1, pageSize: number = 10): Promise<PaginatedApiResponse> {
  // Get the API URL from environment variables or use a default
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
  
  // Make the API call using the fetch API with pagination parameters
  // The ?populate=images part tells Strapi to include image data
  const response = await fetch(
    `${apiUrl}/api/carpets?populate=images&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    { next: { revalidate: 3600 } } // Cache for 1 hour (optional)
  );
  
  // Check if the request was successful
  if (!response.ok) {
    // If not, throw an error that can be caught and handled
    throw new Error('Failed to fetch items');
  }
  
  // Parse the JSON response and return it
  return await response.json();
}

// The Items component that displays a grid of items with pagination
export default async function Items({
  searchParams,
}: {
  searchParams: { page?: string; pageSize?: string };
}) {
  // Get page and pageSize from URL query parameters or use defaults
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.pageSize ? parseInt(searchParams.pageSize) : 9;
  
  // Fetch items with pagination
  const result = await fetchItems(page, pageSize);
  
  // Get the API URL for building image URLs
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
  
  // Extract pagination info
  const { pagination } = result.meta;
  const totalPages = pagination.pageCount;

  return (
    <div className="container mx-auto px-16 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Collection</h1>
      
      {/* Grid of items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {result.data.map((item) => {
          // Get the first image or undefined
          const image = item.images?.[0];
          // Build the full image URL if an image exists
          const imageUrl = image ? `${apiUrl}${image.formats?.medium?.url || image.url}` : '';
          
          return (
            <Link 
              href={`/item/${item.documentId}`} 
              key={item.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-64 bg-[#EAE8DA]">
                {image ? (
                  <Image
                    src={imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              </div>
            </Link>
          );
        })}
      </div>
      
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {/* Previous page button */}
          {page > 1 && (
            <Link
              href={`/item?page=${page - 1}&pageSize=${pageSize}`}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Previous
            </Link>
          )}
          
          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Link
              key={pageNum}
              href={`/item?page=${pageNum}&pageSize=${pageSize}`}
              className={`px-4 py-2 border rounded-md ${
                pageNum === page
                  ? 'bg-black text-white border-black'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              {pageNum}
            </Link>
          ))}
          
          {/* Next page button */}
          {page < totalPages && (
            <Link
              href={`/item?page=${page + 1}&pageSize=${pageSize}`}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

