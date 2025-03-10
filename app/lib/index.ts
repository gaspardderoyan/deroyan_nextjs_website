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
    large?: {url: string; width: number; height: number};
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
  localizations: ArtItem[];
  slug: string;
}
