// page to show all items, with pagination
import Pagination from '@/app/components/Pagination';
import ItemGrid from '@/app/components/ItemGrid';
import { fetchItems } from '@/app/lib/api';

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
        <h1 className="text-3xl font-bold mb-8">Notre collection</h1>
        
        {/* Use the new ItemGrid component */}
        <ItemGrid items={result.data} />
        
        {/* Use our custom Pagination component */}
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          pageSize={currentPageSize} 
          basePath="/collection"
        />
      </div>
    </div>
  );
}

