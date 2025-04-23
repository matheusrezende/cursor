// Base URLs for TMDB API
export const API_BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Common image sizes
export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original',
  },
} as const;

// Get API key from environment variable
// This should be provided in a .env file
export const getApiKey = (): string => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  
  if (!apiKey) {
    console.error('Missing TMDB API key. Please add VITE_TMDB_API_KEY to your .env file');
    return '';
  }
  
  return apiKey;
};

// Default query parameters for API requests
export const getDefaultQueryParams = (): Record<string, string> => ({
  api_key: getApiKey(),
  language: 'en-US',
}); 