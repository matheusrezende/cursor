import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Chip, 
  Grid, 
  CircularProgress, 
  Alert,
  Rating,
  Divider,
  Stack
} from '@mui/material';
import { 
  ArrowBack, 
  AccessTime, 
  CalendarMonth,
  Visibility, 
  VisibilityOff 
} from '@mui/icons-material';
import { useMovieDetails } from '../../hooks/useMovieDetails.hook';
import { useRelatedMovies } from '../../hooks/useRelatedMovies.hook';
import { getImageUrl, getFallbackImageUrl } from '../../utils/imageUrl.util';
import { isWatched, addToWatched, removeFromWatched } from '../../services/storage.service';
import MovieCard from '../../components/MovieCard/MovieCard.component';
import WatchlistButton from '../../components/WatchlistButton/WatchlistButton.component';
import { ROUTES } from '../../constants/routes.constants';
import { Movie, MovieDetails } from '../../services/tmdb.service';

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const movieId = id ? parseInt(id, 10) : 0;
  
  const [watched, setWatched] = useState(false);
  
  const { 
    data: movie, 
    isLoading, 
    error 
  } = useMovieDetails(movieId);

  const {
    data: relatedMoviesData,
    isLoading: isLoadingRelated,
    error: relatedError
  } = useRelatedMovies(movieId);
  
  useEffect(() => {
    if (movieId > 0) {
      setWatched(isWatched(movieId));
    }
  }, [movieId]);
  
  useEffect(() => {
    // Scroll to top when component mounts or movie ID changes
    window.scrollTo(0, 0);
  }, [movieId]);
  
  const handleBackClick = () => {
    // Check if we have a state with a previous path
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      // Otherwise just go back in history
      navigate(-1);
    }
  };
  
  const handleWatchedToggle = () => {
    if (movie) {
      if (watched) {
        removeFromWatched(movie.id);
      } else {
        // Convert MovieDetails to Movie for storage
        const movieForStorage: Movie = {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          overview: movie.overview,
          genre_ids: movie.genres.map(genre => genre.id)
        };
        addToWatched(movieForStorage);
      }
      
      setWatched(!watched);
    }
  };
  
  if (isLoading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '80vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  
  if (error || !movie) {
    return (
      <Container sx={{ py: 4 }}>
        <Button 
          startIcon={<ArrowBack />} 
          onClick={handleBackClick}
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        
        <Alert severity="error">
          Failed to load movie details. Please try again later.
        </Alert>
      </Container>
    );
  }
  
  // Format movie data
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const releaseDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'Unknown';
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'Unknown';
  const backdropUrl = getImageUrl(movie.backdrop_path, 'backdrop', 'large') || getFallbackImageUrl();
  const posterUrl = getImageUrl(movie.poster_path) || getFallbackImageUrl();
  const rating = movie.vote_average / 2;
  
  // Convert MovieDetails to Movie for the WatchlistButton
  const movieForWatchlist: Movie = {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    overview: movie.overview,
    genre_ids: movie.genres.map(genre => genre.id)
  };
  
  return (
    <>
      {/* Hero section with backdrop image */}
      <Box 
        sx={{ 
          position: 'relative',
          height: { xs: '350px', md: '500px' },
          overflow: 'hidden',
          mb: 4,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9))',
            zIndex: 1
          }
        }}
      >
        <Box 
          component="img"
          src={backdropUrl}
          alt={movie.title}
          sx={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            filter: 'brightness(0.8)'
          }}
        />
        
        <Container 
          maxWidth="xl" 
          sx={{ 
            position: 'relative', 
            height: '100%', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            pb: 4,
            zIndex: 2
          }}
        >
          <Button 
            startIcon={<ArrowBack />} 
            onClick={handleBackClick}
            sx={{ 
              alignSelf: 'flex-start', 
              mb: 'auto', 
              mt: 2,
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Back
          </Button>
          
          <Grid container spacing={3}>
            <Grid 
              item 
              xs={12} 
              sm={4} 
              md={3} 
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <Box 
                component="img"
                src={posterUrl}
                alt={movie.title}
                sx={{ 
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  display: 'block',
                  boxShadow: 6,
                  borderRadius: 1
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={8} md={9}>
              <Box>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700,
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    mb: 1
                  }}
                >
                  {movie.title} <Box component="span" sx={{ opacity: 0.7 }}>({releaseYear})</Box>
                </Typography>
                
                {movie.tagline && (
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontStyle: 'italic', 
                      opacity: 0.8,
                      mb: 2,
                      textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}
                  >
                    {movie.tagline}
                  </Typography>
                )}
                
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {movie.genres.map(genre => (
                    <Chip 
                      key={genre.id} 
                      label={genre.name}
                      size="small"
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.15)', 
                        color: 'white',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' }
                      }}
                    />
                  ))}
                </Box>
                
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mb: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <CalendarMonth fontSize="small" />
                    <Typography variant="body2">{releaseDate}</Typography>
                  </Stack>
                  
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <AccessTime fontSize="small" />
                    <Typography variant="body2">{runtime}</Typography>
                  </Stack>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating 
                      value={rating}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      ({movie.vote_average.toFixed(1)})
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid 
            item 
            xs={12} 
            sm={4} 
            md={3} 
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <Box 
              component="img"
              src={posterUrl}
              alt={movie.title}
              sx={{ 
                width: '100%',
                maxWidth: 300,
                height: 'auto',
                objectFit: 'cover',
                display: 'block',
                mx: 'auto',
                mb: 2
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={8} md={9}>
            <Box sx={{ display: 'flex', mb: 3, gap: 2 }}>
              <WatchlistButton 
                movie={movieForWatchlist} 
                variant="button" 
              />
              
              <Button
                variant="outlined"
                color="secondary"
                startIcon={watched ? <Visibility /> : <VisibilityOff />}
                onClick={handleWatchedToggle}
              >
                {watched ? 'Mark as Unwatched' : 'Mark as Watched'}
              </Button>
            </Box>
            
            <Typography variant="h5" sx={{ mb: 2 }}>Overview</Typography>
            <Typography paragraph>{movie.overview || 'No overview available.'}</Typography>
            
            <Divider sx={{ my: 4 }} />
            
            <Typography variant="h5" sx={{ mb: 3 }}>Details</Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  {movie.production_companies && movie.production_companies.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">Production Companies</Typography>
                      <Typography>
                        {movie.production_companies.map(company => company.name).join(', ')}
                      </Typography>
                    </Box>
                  )}
                  
                  {movie.status && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">Status</Typography>
                      <Typography>{movie.status}</Typography>
                    </Box>
                  )}
                  
                  {movie.budget > 0 && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">Budget</Typography>
                      <Typography>
                        ${movie.budget.toLocaleString()}
                      </Typography>
                    </Box>
                  )}
                  
                  {movie.revenue > 0 && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">Revenue</Typography>
                      <Typography>
                        ${movie.revenue.toLocaleString()}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  {movie.homepage && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">Website</Typography>
                      <Typography>
                        <a 
                          href={movie.homepage} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: 'inherit' }}
                        >
                          {movie.homepage}
                        </a>
                      </Typography>
                    </Box>
                  )}
                  
                  {movie.imdb_id && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">IMDB</Typography>
                      <Typography>
                        <a 
                          href={`https://www.imdb.com/title/${movie.imdb_id}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: 'inherit' }}
                        >
                          View on IMDB
                        </a>
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 4 }} />
            
            {/* Related Movies */}
            {!isLoadingRelated && !relatedError && relatedMoviesData && relatedMoviesData.results.length > 0 && (
              <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>You May Also Like</Typography>
                
                <Grid container spacing={3}>
                  {relatedMoviesData.results.slice(0, 4).map(relatedMovie => (
                    <Grid item xs={12} sm={6} md={3} key={relatedMovie.id}>
                      <MovieCard movie={relatedMovie} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MovieDetailsPage; 