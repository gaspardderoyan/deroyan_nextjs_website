// app/collection/[slug]/page.tsx

// Import the ItemDetail component
import ItemDetail from '@/app/components/ItemDetail';
import { fetchItem, fetchAllItemSlugs } from '@/app/lib/api';
import ScrollToTop from '@/app/components/ScrollToTop';
import { notFound } from 'next/navigation';

// Define the type for page params
interface PageParams {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate static params for all item detail pages at build time
 * This function is called during build to pre-render all item pages
 */
export async function generateStaticParams() {
  try {
    // Fetch all item slugs
    const slugs = await fetchAllItemSlugs();
    
    if (slugs.length === 0) {
      console.warn('Warning: No item slugs were fetched for static generation. Check your API connection.');
    } else {
      console.log(`Generating static params for ${slugs.length} items`);
    }
    
    // Return an array of objects with the slug parameter
    return slugs.map(slug => ({
      slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    // Return an empty array to avoid build failure
    // The pages will be generated on-demand instead
    return [];
  }
}

// The main page component that displays an individual art item
// Using the generateMetadata pattern which is fully supported in Next.js
export async function generateMetadata({ params }: PageParams) {
  // Await the params before accessing its properties
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Fetch the item data to get the title
  try {
    const response = await fetchItem(slug);
    
    // If item exists, use its title for the metadata
    if (response.data.length > 0) {
      const item = response.data[0];
      return {
        title: item.title,
        description: item.description || `Détails de ${item.title}`,
      };
    }
  } catch (error) {
    console.error(`Error fetching metadata for item ${slug}:`, error);
  }
  
  // Fallback if item not found or error occurred
  return {
    title: `Item ${slug}`,
    description: 'Détails de l\'item',
  };
}

// The main page component - using proper typing
export default async function Page({ params }: PageParams) {
  // Extract slug from params after awaiting
  const { locale, slug} = await params;
  
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
    <>
      <ScrollToTop>
        <ItemDetail item={item} locale={locale} />
      </ScrollToTop>
    </>
  );
}
