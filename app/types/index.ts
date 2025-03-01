/**
 * Shared type definitions for the application
 * This file centralizes common interfaces used across multiple components
 */

/**
 * Interface representing image data from the Strapi API
 * Contains information about an image including its dimensions and various format URLs
 */
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
  };
}

/**
 * Interface representing an art item from the Strapi API
 * Contains all the information about an art piece including its metadata and associated images
 */
export interface ArtItem {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  bullet_list: string;
  type: string;
  images: ImageData[];
  slug: string;
}

/**
 * Interface for the paginated response from Strapi API
 * Contains the data array and pagination metadata
 */
export interface PaginatedApiResponse {
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

/**
 * Interface for a single item response from Strapi API
 */
export interface SingleItemApiResponse {
  data: ArtItem;
  meta: Record<string, unknown>;
}

/**
 * Interface for filter parameters used in API requests
 */
export interface FilterParams {
  type?: string;
  region?: string;
  period?: string;
  [key: string]: string | undefined;
}

/**
 * Interface representing a UI element from the Strapi API
 * Contains information about a UI text element including its key, value, and localizations
 */
export interface UIElement {
  id: number;
  documentId: string;
  key: string;
  description: null | string;
  value: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  localizations: UIElement[];
}

/**
 * Interface for the UI elements response from Strapi API
 * Contains the data array of UI elements and pagination metadata
 */
export interface UIElementsResponse {
  data: UIElement[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
} 