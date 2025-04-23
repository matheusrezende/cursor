import { useQuery } from '@tanstack/react-query';
import { getPopularMovies, getUpcomingMovies, searchMovies } from '../services/tmdb.service';

/**
 * Hook for fetching popular movies
 * @param page - Page number (default: 1)
 * @returns Query result with popular movies data
 */
export const usePopularMovies = (page = 1) => {
  return useQuery({
    queryKey: ['popularMovies', page],
    queryFn: () => getPopularMovies(page),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook for fetching upcoming movies
 * @param page - Page number (default: 1)
 * @returns Query result with upcoming movies data
 */
export const useUpcomingMovies = (page = 1) => {
  return useQuery({
    queryKey: ['upcomingMovies', page],
    queryFn: () => getUpcomingMovies(page),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook for searching movies
 * @param query - Search query
 * @param page - Page number (default: 1)
 * @returns Query result with search results
 */
export const useMovieSearch = (query: string, page = 1) => {
  return useQuery({
    queryKey: ['movieSearch', query, page],
    queryFn: () => searchMovies(query, page),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: query.length > 0, // Only run query if search term is provided
  });
}; 