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

// This interface defines what props our page component will receive
// In Next.js app router, pages receive route parameters automatically
interface PageProps {
  params: {
    documentId: string;    // This will be the ID from the URL
  };
}

// The main page component that displays an individual art item
// This is an async component because it fetches data
export default async function ItemPage({ params }: PageProps) {
  // Ensure params.documentId is available before using it
  const { documentId } = params;
  
  // Fetch the art item data using the documentId from the URL
  // The await keyword pauses execution until the data is fetched
  const item = await fetchItem(documentId);
  
  // Render the ItemDetail component with the fetched data
  return <ItemDetail item={item} />;
}

// This function handles the API request to get a single item
// It's separated from the component for better organization
async function fetchItem(documentId: string): Promise<ApiResponse> {
  // Make the API call using the fetch API
  // The ?populate=images part tells Strapi to include image data
  const response = await fetch(
    `http://localhost:1337/api/carpets/${documentId}?populate=images`
  );
  
  // Check if the request was successful
  if (!response.ok) {
    // If not, throw an error that can be caught and handled
    throw new Error('Failed to fetch item');
  }
  
  // Parse the JSON response and return it
  return await response.json();
}
