import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '../services/tmdb.service';

/**
 * Hook for fetching movie details by ID
 * @param id - Movie ID
 * @returns Query result with movie details
 */
export const useMovieDetails = (id: number) => {
  return useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => getMovieDetails(id),
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: id > 0, // Only run if we have a valid ID
  });
}; 