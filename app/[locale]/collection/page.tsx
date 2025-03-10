// app/collection/page.tsx
// page to show all items, with pagination
import Pagination from '@/app/components/Pagination';
import ItemGrid from '@/app/components/ItemGrid';
import Filters from '@/app/components/Filters';
import { fetchItems } from '@/app/lib/api';
import { getLocalizedTranslations, LocalizedTranslations } from '@/app/lib/UI_api';
import { validateLocale } from '@/app/lib/i18n';

// The Items component that displays a grid of items with pagination
export default async function Items({
  searchParams,
  params
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  // this promise resolves to an object that can have any number of keys, each a string,
  // and each key's value can be a string, or an array of strings, or undefined
  params: { locale: string };
}) {
  // Get page, pageSize, and filter parameters from URL query parameters or use defaults
  // In Next.js 14/15, searchParams is a Promise that must be awaited
  const resolvedSearchParams = await searchParams;
  const currentPage = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;
  const currentPageSize = typeof resolvedSearchParams.pageSize === 'string' ? parseInt(resolvedSearchParams.pageSize) : 39;
  
  // Extract filter parameters
  const filters: Record<string, string> = {};
  
  // Add type filter if present and not 'all'
  if (resolvedSearchParams['filters[type][$eq]'] && resolvedSearchParams['filters[type][$eq]'] !== 'all') {
    filters['filters[type][$eq]'] = String(resolvedSearchParams['filters[type][$eq]']);
  }
  
  // Add region filter if present and not 'all'
  if (resolvedSearchParams['filters[region][$eq]'] && resolvedSearchParams['filters[region][$eq]'] !== 'all') {
    filters['filters[region][$eq]'] = String(resolvedSearchParams['filters[region][$eq]']);
  }
  
  // Add period filter if present and not 'all'
  if (resolvedSearchParams['filters[period][$eq]'] && resolvedSearchParams['filters[period][$eq]'] !== 'all') {
    filters['filters[period][$eq]'] = String(resolvedSearchParams['filters[period][$eq]']);
  }

  // get the locale from the params
  const { locale } = await params;

  // ensure we use a valid locale
  const validLocale = validateLocale(locale);
  
  // Fetch items with pagination and filters
  // Here, filters is an object with keys that are the filter names and values that are the filter values
  const result = await fetchItems(currentPage, currentPageSize, filters);
  
  // Extract pagination info
  const { pagination } = result.meta;
  const totalPages = pagination.pageCount;

  // fetch the UI elements text
  const data: LocalizedTranslations = await getLocalizedTranslations();

  // Define localized text based on the validLocale
  const collectionTitle = validLocale === 'en' ? 'Our Collection' : 'Notre collection';
  const itemFoundText = validLocale === 'en' 
    ? (pagination.total === 1 ? 'item found' : 'items found')
    : (pagination.total === 1 ? 'objet trouvé' : 'objets trouvés');

  // Return the component with a single root element
  return (
    <div className="container mx-auto px-12 md:px-16 lg:px-24 py-8">
      {/* Header section with responsive layout */}
      <div className="mb-6">
        {/* On desktop: h1 and filters side by side */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{collectionTitle}</h1>
            
            {/* Display the total number of items found */}
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 lg:mb-0">
              {pagination.total} {itemFoundText}
            </p>
          </div>
          
          {/* Filters - full width on mobile/tablet, aligned right on desktop */}
          <div className="w-full lg:w-auto">
            {/* Filters component */}
            <Filters LocalizedTranslationsWithLocale={data[validLocale]} />
          </div>
        </div>
      </div>
      
      {/* Use the ItemGrid component */}
      <ItemGrid items={result.data} locale={validLocale} />
      
      {/* Use our custom Pagination component with locale-aware basePath */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        pageSize={currentPageSize} 
        basePath={`/${validLocale}/collection`}
        LocalizedTranslationsWithLocale={data[validLocale]}
      />
    </div>
  );
}

