export interface ImageData {
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
    large?: {url: string; width: number; height: number};
  };
}

export interface ArtItem {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  bullet_list: string;
  type: string;
  region: string;
  period: string;
  images: ImageData[];
  slug: string;
}

// TODO interface to store all the items for the Grid/Collection page
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

interface FilterParams {
  type?: string;
  region?: string;
  period?: string;
}
