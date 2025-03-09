// Define type for a single translation item
interface UIElement {
  id: number;
  documentId: string;
  key: string;
  description: null | string;
  value: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

interface UIElementResponse {
  data: UIElement[];
}

// Define the transformed data structure
export interface LocalizedTranslations {
  [locale: string]: {
    [key: string]: UIElement;
  };
}

// Function to fetch translations
async function fetchTranslations(locale: string): Promise<UIElement[]> {
    const apiUrl = 'http://localhost:1337/api/ui-elements';

    const response = await fetch(`${apiUrl}?locale=${locale}`);
  
  if (!response.ok) {
    throw new Error(`Error fetching translations for ${locale}`);
  }
  
  // Extract just the data array from the response
  const { data } = await response.json() as UIElementResponse;
  return data;
}

// Function to transform data into desired format
export async function getLocalizedTranslations(): Promise<LocalizedTranslations> {
  try {
    // Make parallel calls for both locales
    const [frTranslations, enTranslations] = await Promise.all([
      fetchTranslations('fr'),
      fetchTranslations('en')
    ]);
    
    // Initialize result object
    const result: LocalizedTranslations = {
      fr: {},
      en: {}
    };
    
    // Process French translations
    frTranslations.forEach(item => {
      result.fr[item.key] = item;
    });
    
    // Process English translations
    enTranslations.forEach(item => {
      result.en[item.key] = item;
    });
    
    return result;
  } catch (error) {
    console.error('Error fetching translations:', error);
    throw error;
  }
}

/*
// Usage example
async function example() {
  const data = await getLocalizedTranslations();
  
  console.log("data: ", data);
  console.log("typeof data: ", typeof(data));
  // Now you can access translations like this:
  console.log(data.en['filter.type.tapestry'].value); // Outputs the English version
  console.log(data.fr['filter.type.tapestry'].value); // Outputs the French version
}

example();
*/