// page to show all items, with pagination
import Link from 'next/link';
import Image from 'next/image';
import Pagination from '@/app/components/Pagination';
import { fetchItems, getFullImageUrl } from '@/app/lib/api';

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
  
  // Extract pagination info
  const { pagination } = result.meta;
  const totalPages = pagination.pageCount;

  return (
    <div className="min-h-screen bg-[#EAE8DA]">
      <div className="container mx-auto px-8 py-8">
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
                <div className="relative aspect-square bg-[#EAE8DA]">
                  {image ? (
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain p-4"
                    />
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
          currentPage={page} 
          totalPages={totalPages} 
          pageSize={pageSize} 
          basePath="/item"
        />
      </div>
    </div>
  );
}

