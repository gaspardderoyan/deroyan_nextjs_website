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
    <div className="container mx-auto px-16 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Collection</h1>
      
      {/* Grid of items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {result.data.map((item) => {
          // Get the first image or undefined
          const image = item.images?.[0];
          // Build the full image URL if an image exists
          const imageUrl = image ? getFullImageUrl(image.formats?.medium?.url || image.url) : '';
          
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
      
      {/* Use our custom Pagination component */}
      <Pagination 
        currentPage={page} 
        totalPages={totalPages} 
        pageSize={pageSize} 
        basePath="/item"
      />
    </div>
  );
}

