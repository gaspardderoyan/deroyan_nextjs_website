// app/item/[documentId]/page.tsx

// Import the ItemDetail component
import ItemDetail from '@/app/components/ItemDetail';
import { fetchItem } from '@/app/lib/api';

// Define the type for page params
interface PageParams {
  params: {
    documentId: string;
  };
}

// The main page component that displays an individual art item
// Using the generateMetadata pattern which is fully supported in Next.js
export async function generateMetadata({ params }: PageParams) {
  return {
    title: `Item ${params.documentId}`,
  };
}

// The main page component - using proper typing
export default async function Page({ params }: PageParams) {
  // Extract documentId from params
  const documentId = params.documentId;
  
  // Fetch the art item data using the documentId from the URL
  const item = await fetchItem(documentId);
  
  // Render the ItemDetail component with the fetched data
  return <ItemDetail item={item} />;
}
