import { useQuery } from '@tanstack/react-query';
import { getRelatedMovies } from '../services/tmdb.service';

/**
 * Hook for fetching related movies by movie ID
 * @param id - Movie ID
 * @param page - Page number (default: 1)
 * @returns Query result with related movies data
 */
export const useRelatedMovies = (id: number, page = 1) => {
  return useQuery({
    queryKey: ['relatedMovies', id, page],
    queryFn: () => getRelatedMovies(id, page),
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: id > 0, // Only run if we have a valid ID
  });
}; 