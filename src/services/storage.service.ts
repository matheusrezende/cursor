import { Movie } from './tmdb.service';

// Storage keys
const WATCHLIST_KEY = 'tmdb_watchlist';
const WATCHED_KEY = 'tmdb_watched';

// Type for storing only essential movie data
type StoredMovie = Pick<Movie, 'id' | 'title' | 'poster_path' | 'release_date' | 'vote_average'>;

/**
 * Get movies from localStorage
 * @param key - Storage key
 * @returns Array of stored movies
 */
const getMoviesFromStorage = (key: string): StoredMovie[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error retrieving data from localStorage (${key}):`, error);
    return [];
  }
};

/**
 * Save movies to localStorage
 * @param key - Storage key
 * @param movies - Movies to store
 */
const saveMoviesToStorage = (key: string, movies: StoredMovie[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(movies));
    
    // Dispatch custom events when specific storage is updated
    if (key === WATCHLIST_KEY) {
      window.dispatchEvent(new CustomEvent('watchlistUpdated'));
    } else if (key === WATCHED_KEY) {
      window.dispatchEvent(new CustomEvent('watchedUpdated'));
    }
  } catch (error) {
    console.error(`Error saving data to localStorage (${key}):`, error);
  }
};

/**
 * Add a movie to storage
 * @param key - Storage key
 * @param movie - Movie to add
 */
const addMovieToStorage = (key: string, movie: Movie): void => {
  const storedMovies = getMoviesFromStorage(key);
  
  // Check if movie already exists
  if (!storedMovies.some(m => m.id === movie.id)) {
    const movieToStore: StoredMovie = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    };
    
    saveMoviesToStorage(key, [...storedMovies, movieToStore]);
  }
};

/**
 * Remove a movie from storage
 * @param key - Storage key
 * @param movieId - ID of movie to remove
 */
const removeMovieFromStorage = (key: string, movieId: number): void => {
  const storedMovies = getMoviesFromStorage(key);
  const updatedMovies = storedMovies.filter(movie => movie.id !== movieId);
  saveMoviesToStorage(key, updatedMovies);
};

// Watchlist functions
export const getWatchlist = (): StoredMovie[] => {
  return getMoviesFromStorage(WATCHLIST_KEY);
};

export const addToWatchlist = (movie: Movie): void => {
  addMovieToStorage(WATCHLIST_KEY, movie);
};

export const removeFromWatchlist = (movieId: number): void => {
  removeMovieFromStorage(WATCHLIST_KEY, movieId);
};

export const isInWatchlist = (movieId: number): boolean => {
  const watchlist = getWatchlist();
  return watchlist.some(movie => movie.id === movieId);
};

// Watched movies functions
export const getWatchedMovies = (): StoredMovie[] => {
  return getMoviesFromStorage(WATCHED_KEY);
};

export const addToWatched = (movie: Movie): void => {
  addMovieToStorage(WATCHED_KEY, movie);
  
  // Optionally remove from watchlist when added to watched
  removeFromWatchlist(movie.id);
};

export const removeFromWatched = (movieId: number): void => {
  removeMovieFromStorage(WATCHED_KEY, movieId);
};

export const isWatched = (movieId: number): boolean => {
  const watchedMovies = getWatchedMovies();
  return watchedMovies.some(movie => movie.id === movieId);
};

// Export StoredMovie type for reuse
export type { StoredMovie }; 