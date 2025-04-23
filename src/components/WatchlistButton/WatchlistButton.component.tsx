import { useState, useEffect } from 'react';
import { IconButton, Button, Tooltip, ButtonProps, IconButtonProps } from '@mui/material';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { Movie } from '../../services/tmdb.service';
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from '../../services/storage.service';

type WatchlistButtonVariant = 'icon' | 'button';

interface WatchlistButtonProps {
  movie: Movie;
  variant?: WatchlistButtonVariant;
  iconProps?: Partial<IconButtonProps>;
  buttonProps?: Partial<ButtonProps>;
}

/**
 * Reusable watchlist button component
 * Can be rendered as either an icon button or a regular button
 */
const WatchlistButton = ({ 
  movie, 
  variant = 'icon',
  iconProps,
  buttonProps
}: WatchlistButtonProps) => {
  const [inWatchlist, setInWatchlist] = useState(false);
  
  useEffect(() => {
    setInWatchlist(isInWatchlist(movie.id));
  }, [movie.id]);
  
  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
    
    setInWatchlist(!inWatchlist);
  };
  
  if (variant === 'icon') {
    return (
      <Tooltip title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}>
        <IconButton 
          size="small" 
          onClick={handleWatchlistToggle}
          color={inWatchlist ? 'primary' : 'default'}
          {...iconProps}
        >
          {inWatchlist ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>
      </Tooltip>
    );
  }
  
  return (
    <Button
      variant={inWatchlist ? "contained" : "outlined"}
      color="primary"
      startIcon={inWatchlist ? <Bookmark /> : <BookmarkBorder />}
      onClick={handleWatchlistToggle}
      {...buttonProps}
    >
      {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </Button>
  );
};

export default WatchlistButton; 