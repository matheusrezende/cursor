import { IMAGE_BASE_URL, IMAGE_SIZES } from '../config/api.config';

type ImageType = 'poster' | 'backdrop' | 'profile';
type ImageSize = 'small' | 'medium' | 'large' | 'original';

/**
 * Get full image URL from TMDB path
 * @param path - TMDB image path
 * @param type - Image type (poster, backdrop, profile)
 * @param size - Image size (small, medium, large, original)
 * @returns Full image URL or null if path is null
 */
export const getImageUrl = (
  path: string | null, 
  type: ImageType = 'poster', 
  size: ImageSize = 'medium'
): string | null => {
  if (!path) {
    return null;
  }
  
  const sizeValue = IMAGE_SIZES[type][size];
  return `${IMAGE_BASE_URL}/${sizeValue}${path}`;
};

/**
 * Get a fallback image URL when movie poster is not available
 * @returns URL to a placeholder image
 */
export const getFallbackImageUrl = (): string => {
  // This is a simple grey placeholder. In production, a better placeholder would be created.
  return 'https://via.placeholder.com/342x513?text=No+Image';
}; 