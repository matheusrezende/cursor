import { ReactNode } from 'react';
import { Grid, Box } from '@mui/material';

interface MovieGridProps {
  children: ReactNode;
}

/**
 * A responsive grid layout for displaying movie cards
 */
const MovieGrid = ({ children }: MovieGridProps) => {
  return (
    <Box>
      <Grid container spacing={3}>
        {children}
      </Grid>
    </Box>
  );
};

export default MovieGrid; 