import { Box, Typography, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MovieIcon from '@mui/icons-material/Movie';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BookmarkIcon from '@mui/icons-material/Bookmark';

type EmptyStateIconType = 'search' | 'movie' | 'watched' | 'bookmark';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: EmptyStateIconType;
}

/**
 * EmptyState component for displaying when no results are found
 */
const EmptyState = ({ title, message, icon = 'movie' }: EmptyStateProps) => {
  // Map of icon types to their components
  const iconMap = {
    search: <SearchIcon sx={{ fontSize: 60 }} />,
    movie: <MovieIcon sx={{ fontSize: 60 }} />,
    watched: <VisibilityIcon sx={{ fontSize: 60 }} />,
    bookmark: <BookmarkIcon sx={{ fontSize: 60 }} />,
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        bgcolor: 'background.paper',
        borderRadius: 2,
        my: 4
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          mb: 2,
          p: 2,
          bgcolor: 'action.hover',
          borderRadius: '50%',
          color: 'text.secondary'
        }}
      >
        {iconMap[icon]}
      </Box>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center">
        {message}
      </Typography>
    </Paper>
  );
};

export default EmptyState; 