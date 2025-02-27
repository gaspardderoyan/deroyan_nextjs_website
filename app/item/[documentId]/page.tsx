// app/item/[documentId]/page.tsx

// Import the ItemDetail component
import ItemDetail from '@/app/components/ItemDetail';

// TypeScript interfaces help us define what our data looks like
// Think of these as blueprints for the shape of our data

// This interface defines what an image object from your API looks like
interface ImageData {
  id: number;
  documentId: string;
  name: string;
  width: number;         // Width of the image in pixels
  height: number;        // Height of the image in pixels
  url: string;           // The relative URL path to the image
  formats: {             // Different sized versions of the same image
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
  };
}

// This interface defines what an art item from your API looks like
interface ArtItem {
  id: number;
  documentId: string;
  title: string;           // The title of the art piece
  description: string | null; // A description which might be null
  bullet_list: string;     // A string containing bullet points separated by newlines
  type: string;            // The type of item (carpet, tapestry, etc.)
  images: ImageData[];     // An array of images
}

// This interface defines the full API response structure
interface ApiResponse {
  data: ArtItem;           // The actual art item data
  meta: Record<string, unknown>; // Any metadata (using Record<string, unknown> for flexibility)
}

// This function handles the API request to get a single item
async function fetchItem(documentId: string): Promise<ApiResponse> {
  // Get the API URL from environment variables or use a default
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
  
  // Make the API call using the fetch API
  // The ?populate=images part tells Strapi to include image data
  const response = await fetch(
    `${apiUrl}/api/carpets/${documentId}?populate=images`
  );
  
  // Check if the request was successful
  if (!response.ok) {
    // If not, throw an error that can be caught and handled
    throw new Error('Failed to fetch item');
  }
  
  // Parse the JSON response and return it
  return await response.json();
}

// The main page component that displays an individual art item
// Using the generateMetadata pattern which is fully supported in Next.js
export async function generateMetadata(props: any) {
  return {
    title: `Item ${props.params.documentId}`,
  };
}

// The main page component - using a simpler approach to avoid type issues
export default async function Page(props: any) {
  // Extract documentId from params
  const documentId = props.params.documentId;
  
  // Fetch the art item data using the documentId from the URL
  const item = await fetchItem(documentId);
  
  // Render the ItemDetail component with the fetched data
  return <ItemDetail item={item} />;
}
