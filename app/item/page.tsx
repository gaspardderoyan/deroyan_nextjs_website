// page to show all items, with pagination
import Link from 'next/link';
import Image from 'next/image';
import Pagination from '@/app/components/Pagination';
import { fetchItems, getFullImageUrl } from '@/app/lib/api';

// The Items component that displays a grid of items with pagination
export default async function Items({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  // Get page and pageSize from URL query parameters or use defaults
  // In Next.js 14/15, searchParams is a Promise that must be awaited
  const params = await searchParams;
  const currentPage = typeof params.page === 'string' ? parseInt(params.page) : 1;
  const currentPageSize = typeof params.pageSize === 'string' ? parseInt(params.pageSize) : 15;
  
  // Fetch items with pagination
  const result = await fetchItems(currentPage, currentPageSize);
  
  // Extract pagination info
  const { pagination } = result.meta;
  const totalPages = pagination.pageCount;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-12 md:px-16 lg:px-24 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Collection</h1>
        
        {/* Grid of items with angular black borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-black">
          {result.data.map((item) => {
            // Get the first image or undefined
            const image = item.images?.[0];
            // Build the full image URL if an image exists
            const imageUrl = image ? getFullImageUrl(image.formats?.medium?.url || image.url) : '';
            
            return (
              <Link 
                href={`/item/${item.documentId}`} 
                key={item.id}
                className="border-r border-b border-black hover:opacity-90 transition-opacity"
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
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* Use our custom Pagination component */}
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          pageSize={currentPageSize} 
          basePath="/item"
        />
      </div>
    </div>
  );
}

