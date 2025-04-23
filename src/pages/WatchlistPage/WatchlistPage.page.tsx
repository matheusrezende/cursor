import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  CircularProgress,
  Fade,
  Zoom
} from '@mui/material';
import MovieCard from '../../components/MovieCard/MovieCard.component';
import EmptyState from '../../components/EmptyState/EmptyState.component';
import { getWatchlist } from '../../services/storage.service';
import { Movie } from '../../services/tmdb.service';

// Define a partial movie type that matches what's stored in localStorage
type WatchlistMovie = Pick<Movie, 'id' | 'title' | 'poster_path' | 'release_date' | 'vote_average'>;

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState<WatchlistMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removedIds, setRemovedIds] = useState<number[]>([]);

  useEffect(() => {
    // Fetch watchlist from local storage
    const storedWatchlist = getWatchlist();
    setWatchlist(storedWatchlist);
    setIsLoading(false);

    // Set up event listener for storage changes
    const handleStorageChange = () => {
      const newWatchlist = getWatchlist();
      
      // Find removed movie IDs for animation
      const currentIds = new Set(watchlist.map(movie => movie.id));
      const newIds = new Set(newWatchlist.map(movie => movie.id));
      
      const removed: number[] = [];
      currentIds.forEach(id => {
        if (!newIds.has(id)) {
          removed.push(id);
        }
      });
      
      if (removed.length > 0) {
        setRemovedIds(removed);
        // Clear removed IDs after animation completes
        setTimeout(() => {
          setRemovedIds([]);
          setWatchlist(newWatchlist);
        }, 500); // Match the exit animation duration
      } else {
        setWatchlist(newWatchlist);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for local updates within the same window
    window.addEventListener('watchlistUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('watchlistUpdated', handleStorageChange);
    };
  }, [watchlist]);

  // Render loading state
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Watchlist
        </Typography>

        {watchlist.length === 0 ? (
          <Fade in={true} timeout={800}>
            <Box>
              <EmptyState 
                title="Your watchlist is empty"
                message="Movies you add to your watchlist will appear here. Start exploring movies and add them to your watchlist!"
                icon="bookmark"
              />
            </Box>
          </Fade>
        ) : (
          <Grid container spacing={3}>
            {watchlist.map(movie => (
              <Zoom 
                key={movie.id} 
                in={!removedIds.includes(movie.id)} 
                timeout={500}
                unmountOnExit
              >
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <MovieCard movie={movie as Movie} />
                </Grid>
              </Zoom>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default WatchlistPage; 