import { PaginatedApiResponse, FilterParams, UIElementsResponse } from '@/app/types';

/**
 * Fetches multiple items with pagination from the Strapi API
 * @param page - The page number to fetch (default: 1)
 * @param pageSize - The number of items per page (default: 10)
 * @param filters - Optional filter parameters for type, region, and period
 * @returns A promise that resolves to the paginated API response
 */
export async function fetchItems(
  page: number = 1, 
  pageSize: number = 10,
  filters?: FilterParams
): Promise<PaginatedApiResponse> {
  // Get the API URL from environment variables or use a default
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
  
  // Build the query string with pagination parameters
  let queryString = `populate=images&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  
  // Add filter parameters if provided
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryString += `&${key}=${encodeURIComponent(value)}`;
      }
    });
  }
  
  // Create a cache tag that includes the page, pageSize, and filters
  const filterString = filters ? Object.entries(filters).map(([k, v]) => `${k}=${v}`).join('-') : '';
  const cacheTag = `items-page-${page}-size-${pageSize}${filterString ? `-${filterString}` : ''}`;
  
  // Make the API call using the fetch API with pagination and filter parameters
  const response = await fetch(
    `${apiUrl}/api/carpets?${queryString}`,
    { next: { revalidate: 3600, tags: ['items-collection', cacheTag] } } // Cache for 1 hour with tags
  );
  
  // Check if the request was successful
  if (!response.ok) {
    // If not, throw an error that can be caught and handled
    throw new Error('Failed to fetch items');
  }
  
  // Parse the JSON response and return it
  return await response.json();
}

/**
 * Fetches a single item by its slug from the Strapi API
 * @param slug - The slug of the item to fetch
 * @returns A promise that resolves to the paginated API response (which should contain 0 or 1 items)
 */
export async function fetchItem(slug: string): Promise<PaginatedApiResponse> {
  // Get the API URL from environment variables or use a default
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
  
  // Make the API call using the fetch API
  // The ?populate=images part tells Strapi to include image data
  const response = await fetch(
    `${apiUrl}/api/carpets?filters[slug][$eq]=${slug}&populate=images`,
    { next: { revalidate: 3600, tags: [`item-${slug}`] } } // Cache for 1 hour and add a tag for targeted revalidation
  );
  
  // Check if the request was successful
  if (!response.ok) {
    // If not, throw an error that can be caught and handled
    throw new Error('Failed to fetch item');
  }
  
  // Parse the JSON response and return it
  return await response.json();
}

/**
 * Calculates the total number of pages based on total items and items per page
 * @param totalItems - The total number of items
 * @param itemsPerPage - The number of items per page
 * @returns The total number of pages
 */
export function calculateTotalPages(totalItems: number, itemsPerPage: number): number {
  return Math.ceil(totalItems / itemsPerPage);
}

/**
 * Gets the full image URL by combining the API URL with the image path
 * @param imagePath - The relative path to the image
 * @returns The full image URL
 */
export function getFullImageUrl(imagePath: string): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
  return `${apiUrl}${imagePath}`;
}

/**
 * Fetches UI elements from the API
 * This function is meant to be used during build time
 */
export async function getUIElements(): Promise<Record<string, string>> {
  try {
    // Get the API URL from environment variables or use a default
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
    
    // Fetch UI elements from the API
    const response = await fetch(`${apiUrl}/api/ui-elements?populate=*`, {
      next: { 
        // Cache the response with revalidation
        revalidate: 3600,
        tags: ['ui-elements'] 
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch UI elements: ${response.status}`);
    }

    const data: UIElementsResponse = await response.json();
    
    // Transform the response into a key-value map for easier access
    // Using French locale by default
    const uiElements: Record<string, string> = {};
    
    data.data.forEach((element) => {
      // Use the key as the property name and the value as the property value
      uiElements[element.key] = element.value;
    });

    return uiElements;
  } catch (error) {
    console.error("Error fetching UI elements:", error);
    // Return empty object in case of error
    return {};
  }
}

/**
 * Fetches all item slugs for static generation
 * This function is meant to be used during build time to generate static pages
 * @returns A promise that resolves to an array of all item slugs
 */
export async function fetchAllItemSlugs(): Promise<string[]> {
  try {
    // Get the API URL from environment variables or use a default
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
    
    // Array to store all slugs
    let allSlugs: string[] = [];
    
    // Start with page 1
    let currentPage = 1;
    let totalPages = 1;
    const pageSize = 100; // Fetch 100 items per page for efficiency
    
    // Helper function to add a delay between requests
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    // First request to get the first page and determine total pages
    const firstPageUrl = `${apiUrl}/api/carpets?fields[0]=slug&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`;
    console.log(`Fetching page ${currentPage} of items...`);
    
    const firstResponse = await fetch(
      firstPageUrl,
      { next: { tags: ['items-collection'] } }
    );
    
    if (!firstResponse.ok) {
      throw new Error(`Failed to fetch item slugs: ${firstResponse.status}`);
    }
    
    const firstResult: PaginatedApiResponse = await firstResponse.json();
    
    // Extract slugs from the first page
    const firstPageSlugs = firstResult.data.map(item => item.slug);
    allSlugs = [...allSlugs, ...firstPageSlugs];
    
    // Get total pages from the pagination metadata
    totalPages = firstResult.meta.pagination.pageCount;
    console.log(`Found ${totalPages} total pages of items`);
    
    // Fetch remaining pages if there are more than one
    for (currentPage = 2; currentPage <= totalPages; currentPage++) {
      console.log(`Fetching page ${currentPage} of ${totalPages}...`);
      
      // Add a small delay between requests to avoid rate limiting
      await delay(300);
      
      const pageUrl = `${apiUrl}/api/carpets?fields[0]=slug&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`;
      
      const response = await fetch(
        pageUrl,
        { next: { tags: ['items-collection'] } }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch item slugs for page ${currentPage}: ${response.status}`);
      }
      
      const result: PaginatedApiResponse = await response.json();
      
      // Extract slugs from this page and add to the array
      const pageSlugs = result.data.map(item => item.slug);
      allSlugs = [...allSlugs, ...pageSlugs];
    }
    
    console.log(`Successfully fetched all ${allSlugs.length} item slugs`);
    return allSlugs;
  } catch (error) {
    console.error("Error fetching item slugs:", error);
    return [];
  }
} 