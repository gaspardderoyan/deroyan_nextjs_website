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

// Interface for a single item response from Strapi
interface SingleItemApiResponse {
  data: ArtItem;
  meta: Record<string, unknown>;
}

/**
 * Fetches multiple items with pagination from the Strapi API
 * @param page - The page number to fetch (default: 1)
 * @param pageSize - The number of items per page (default: 10)
 * @returns A promise that resolves to the paginated API response
 */
export async function fetchItems(page: number = 1, pageSize: number = 10): Promise<PaginatedApiResponse> {
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

/**
 * Fetches a single item by its documentId from the Strapi API
 * @param documentId - The documentId of the item to fetch
 * @returns A promise that resolves to the single item API response
 */
export async function fetchItem(documentId: string): Promise<SingleItemApiResponse> {
  // Get the API URL from environment variables or use a default
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
  
  // Make the API call using the fetch API
  // The ?populate=images part tells Strapi to include image data
  const response = await fetch(
    `${apiUrl}/api/carpets/${documentId}?populate=images`,
    { next: { revalidate: 3600 } } // Cache for 1 hour (optional)
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