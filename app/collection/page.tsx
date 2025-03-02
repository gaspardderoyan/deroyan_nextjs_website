// page to show all items, with pagination
import Pagination from '@/app/components/Pagination';
import ItemGrid from '@/app/components/ItemGrid';
import { fetchItems, getUIElements } from '@/app/lib/api';
import Filters from '@/app/components/Filters';

const filterOptions = {
  'type': ['all', 'carpet', 'tapestry', 'textile'],
  'region': ['all', 'europe', 'orient'],
  'period': ['all', 'th15', 'th16', 'th17', 'th18', 'th19', 'th20']
};

// generate static params for the filters
export async function generateStaticParams() {
  // Fetch UI elements for both languages and create filter options in one go
  const [frUIElements, enUIElements] = await Promise.all([
    getUIElements('fr'),
    getUIElements('en')
  ]);
  
  // Helper function to create filter options for a given language and UI elements
  const createFilterOptions = (uiElements: Record<string, string>) => {
    // Create an object to store all filter options
    const options: Record<string, Array<{ value: string, label: string }>> = {};
    
    // Loop through each filter category (type, region, period)
    Object.entries(filterOptions).forEach(([category, values]) => {
      // Create the category key with the proper naming convention (e.g., typeOptions)
      const optionKey = `${category}Options`;
      
      // Map the values to objects with value and localized label
      options[optionKey] = values.map(option => ({
        value: option,
        label: uiElements[`filter.${category}.${option}`] || 'not found'
      }));
    });
    
    return options;
  };
  
  // Create options for both languages using the helper function
  const fr = createFilterOptions(frUIElements);
  const en = createFilterOptions(enUIElements);
  
  // Return options organized by locale
  return { fr, en };
}

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
        {/* Header section with responsive layout */}
        <div className="mb-6">
          {/* On desktop: h1 and filters side by side */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Notre collection</h1>
              
              {/* Display the total number of items found */}
              <p className="text-gray-600 mb-4 lg:mb-0">
                {pagination.total} {pagination.total === 1 ? 'objet trouvé' : 'objets trouvés'}
              </p>
            </div>
            
            {/* Filters - full width on mobile/tablet, aligned right on desktop */}
            <div className="w-full lg:w-auto">
              {/* Filters component 
              TODO: use generateStaticParams and pass the correct text for the filters
              */}
              <Filters />
            </div>
          </div>
        </div>
        
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

