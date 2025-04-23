import { API_BASE_URL, getDefaultQueryParams } from '../config/api.config';

// Interface for API response containing a list of movies
export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Movie interface for list views (partial data)
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
}

// Enhanced movie interface for detail view
export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  genres: { id: number; name: string }[];
  runtime: number | null;
  status: string;
  tagline: string | null;
  budget: number;
  revenue: number;
  homepage: string | null;
  imdb_id: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
}

/**
 * Fetch popular movies
 * @param page - Page number (default: 1)
 * @returns Promise with popular movies data
 */
export const getPopularMovies = async (page = 1): Promise<MovieListResponse> => {
  const params = new URLSearchParams({
    ...getDefaultQueryParams(),
    page: page.toString(),
  });

  const response = await fetch(`${API_BASE_URL}/movie/popular?${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch popular movies: ${response.status}`);
  }
  
  return response.json();
};

/**
 * Fetch upcoming movies
 * @param page - Page number (default: 1)
 * @returns Promise with upcoming movies data
 */
export const getUpcomingMovies = async (page = 1): Promise<MovieListResponse> => {
  const params = new URLSearchParams({
    ...getDefaultQueryParams(),
    page: page.toString(),
  });

  const response = await fetch(`${API_BASE_URL}/movie/upcoming?${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch upcoming movies: ${response.status}`);
  }
  
  return response.json();
};

/**
 * Fetch movie details by ID
 * @param id - Movie ID
 * @returns Promise with detailed movie data
 */
export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  const params = new URLSearchParams(getDefaultQueryParams());
  
  const response = await fetch(`${API_BASE_URL}/movie/${id}?${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.status}`);
  }
  
  return response.json();
};

/**
 * Search for movies by query
 * @param query - Search term
 * @param page - Page number (default: 1)
 * @returns Promise with search results
 */
export const searchMovies = async (query: string, page = 1): Promise<MovieListResponse> => {
  const params = new URLSearchParams({
    ...getDefaultQueryParams(),
    query,
    page: page.toString(),
  });
  
  const response = await fetch(`${API_BASE_URL}/search/movie?${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to search movies: ${response.status}`);
  }
  
  return response.json();
};

/**
 * Fetch related movies by movie ID
 * @param id - Movie ID
 * @param page - Page number (default: 1)
 * @returns Promise with related movies data
 */
export const getRelatedMovies = async (id: number, page = 1): Promise<MovieListResponse> => {
  const params = new URLSearchParams({
    ...getDefaultQueryParams(),
    page: page.toString(),
  });
  
  const response = await fetch(`${API_BASE_URL}/movie/${id}/similar?${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch related movies: ${response.status}`);
  }
  
  return response.json();
}; 