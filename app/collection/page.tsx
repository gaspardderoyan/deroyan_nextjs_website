// page to show all items, with pagination
import Pagination from '@/app/components/Pagination';
import ItemGrid from '@/app/components/ItemGrid';
import { fetchItems } from '@/app/lib/api';
import Filters from '@/app/components/Filters';

// The Items component that displays a grid of items with pagination
export default async function Items({
  searchParams,
}: {
  searchParams: Promise<{ 
    page?: string; 
    pageSize?: string;
    'filters[type][$eq]'?: string;
    'filters[region][$eq]'?: string;
    'filters[period][$eq]'?: string;
  }>;
}) {
  // Get page, pageSize, and filter parameters from URL query parameters or use defaults
  // In Next.js 14/15, searchParams is a Promise that must be awaited
  const params = await searchParams;
  const currentPage = typeof params.page === 'string' ? parseInt(params.page) : 1;
  const currentPageSize = typeof params.pageSize === 'string' ? parseInt(params.pageSize) : 15;
  
  // Extract filter parameters
  const filters: Record<string, string> = {};
  
  // Add type filter if present and not 'all'
  if (params['filters[type][$eq]'] && params['filters[type][$eq]'] !== 'all') {
    filters['filters[type][$eq]'] = params['filters[type][$eq]'];
  }
  
  // Add region filter if present and not 'all'
  if (params['filters[region][$eq]'] && params['filters[region][$eq]'] !== 'all') {
    filters['filters[region][$eq]'] = params['filters[region][$eq]'];
  }
  
  // Add period filter if present and not 'all'
  if (params['filters[period][$eq]'] && params['filters[period][$eq]'] !== 'all') {
    filters['filters[period][$eq]'] = params['filters[period][$eq]'];
  }
  
  // Fetch items with pagination and filters
  const result = await fetchItems(currentPage, currentPageSize, filters);
  
  // Extract pagination info
  const { pagination } = result.meta;
  const totalPages = pagination.pageCount;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-12 md:px-16 lg:px-24 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Notre collection</h1>
          
          {/* Add the Filters component */}
          <Filters />
        </div>
        
        {/* Display the total number of items found */}
        <p className="text-gray-600 mb-6">
          {pagination.total} {pagination.total === 1 ? 'objet trouvé' : 'objets trouvés'}
        </p>
        
        {/* Use the ItemGrid component */}
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

