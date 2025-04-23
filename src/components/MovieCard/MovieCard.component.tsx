import { Card, CardContent, CardMedia, Typography, Box, IconButton, Tooltip, Rating } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Movie } from '../../services/tmdb.service';
import { getImageUrl, getFallbackImageUrl } from '../../utils/imageUrl.util';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.constants';
import { isWatched, addToWatched, removeFromWatched } from '../../services/storage.service';
import { useState, useEffect } from 'react';
import WatchlistButton from '../WatchlistButton/WatchlistButton.component';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [watched, setWatched] = useState(false);
  
  useEffect(() => {
    setWatched(isWatched(movie.id));
  }, [movie.id]);
  
  const handleMovieClick = () => {
    navigate(ROUTES.MOVIE_DETAILS.replace(':id', movie.id.toString()), {
      state: { from: location.pathname + location.search }
    });
  };
  
  const handleWatchedToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (watched) {
      removeFromWatched(movie.id);
    } else {
      addToWatched(movie);
    }
    
    setWatched(!watched);
  };
  
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const posterUrl = getImageUrl(movie.poster_path) || getFallbackImageUrl();
  const rating = movie.vote_average / 2; // Convert from 10-point to 5-point scale
  
  return (
    <Card 
      sx={{ 
        maxWidth: 250, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 8,
          cursor: 'pointer'
        }
      }}
      onClick={handleMovieClick}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="375"
          image={posterUrl}
          alt={movie.title}
          sx={{ objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            p: 1,
          }}
        >
          <WatchlistButton 
            movie={movie} 
            variant="icon"
            iconProps={{ 
              sx: { 
                bgcolor: 'rgba(0, 0, 0, 0.5)', 
                mb: 1,
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                }
              } 
            }}
          />
          
          <Tooltip title={watched ? "Mark as unwatched" : "Mark as watched"}>
            <IconButton 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(0, 0, 0, 0.5)', 
                color: watched ? 'secondary.main' : 'text.secondary',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                }
              }}
              onClick={handleWatchedToggle}
            >
              {watched ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h6" component="div" noWrap title={movie.title}>
          {movie.title}
        </Typography>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
          <Typography variant="body2" color="text.secondary">
            {releaseYear}
          </Typography>
          
          <Rating 
            value={rating} 
            precision={0.5} 
            readOnly 
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard; 