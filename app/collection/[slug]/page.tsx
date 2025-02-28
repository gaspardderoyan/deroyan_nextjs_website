// app/collection/[slug]/page.tsx

// Import the ItemDetail component
import ItemDetail from '@/app/components/ItemDetail';
import { fetchItem } from '@/app/lib/api';
import ScrollToTop from '@/app/components/ScrollToTop';
import { notFound } from 'next/navigation';

// Define the type for page params
interface PageParams {
  params: Promise<{
    slug: string;
  }>;
}

// The main page component that displays an individual art item
// Using the generateMetadata pattern which is fully supported in Next.js
export async function generateMetadata({ params }: PageParams) {
  // Await the params before accessing its properties
  const resolvedParams = await params;
  return {
    title: `Item ${resolvedParams.slug}`,
  };
}

// The main page component - using proper typing
export default async function Page({ params }: PageParams) {
  // Extract slug from params after awaiting
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Fetch the art item data using the slug from the URL
  const response = await fetchItem(slug);
  
  // If no items found, show the 404 page
  if (response.data.length === 0) {
    return notFound();
  }
  
  // Extract the first item from the response data array and format it for ItemDetail
  const item = { data: response.data[0] };
  
  // Render the ItemDetail component with the fetched data
  // Wrap with ScrollToTop component to ensure page scrolls to top on load
  return (
    <ScrollToTop>
      <ItemDetail item={item} />
    </ScrollToTop>
  );
}
