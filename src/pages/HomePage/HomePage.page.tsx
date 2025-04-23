import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Tabs, 
  Tab, 
  CircularProgress, 
  Alert,
  Pagination
} from '@mui/material';
import MovieCard from '../../components/MovieCard/MovieCard.component';
import { usePopularMovies, useUpcomingMovies } from '../../hooks/useMovies.hook';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [popularPage, setPopularPage] = useState(1);
  const [upcomingPage, setUpcomingPage] = useState(1);
  
  const { 
    data: popularData, 
    isLoading: isLoadingPopular, 
    error: popularError 
  } = usePopularMovies(popularPage);
  
  const { 
    data: upcomingData, 
    isLoading: isLoadingUpcoming, 
    error: upcomingError 
  } = useUpcomingMovies(upcomingPage);
  
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  const handlePopularPageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setPopularPage(page);
  };
  
  const handleUpcomingPageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setUpcomingPage(page);
  };
  
  // Render content based on active tab
  const renderContent = () => {
    if (activeTab === 0) {
      // Popular Movies Tab
      if (isLoadingPopular) {
        return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
      }
      
      if (popularError) {
        return (
          <Alert severity="error" sx={{ my: 2 }}>
            Failed to load popular movies. Please try again later.
          </Alert>
        );
      }
      
      return (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {popularData?.results.map(movie => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
          
          <Box display="flex" justifyContent="center" mt={4} mb={2}>
            <Pagination 
              count={Math.min(popularData?.total_pages || 1, 500)} 
              page={popularPage} 
              onChange={handlePopularPageChange}
              color="primary"
            />
          </Box>
        </>
      );
    } else {
      // Upcoming Movies Tab
      if (isLoadingUpcoming) {
        return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
      }
      
      if (upcomingError) {
        return (
          <Alert severity="error" sx={{ my: 2 }}>
            Failed to load upcoming movies. Please try again later.
          </Alert>
        );
      }
      
      return (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {upcomingData?.results.map(movie => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
          
          <Box display="flex" justifyContent="center" mt={4} mb={2}>
            <Pagination 
              count={Math.min(upcomingData?.total_pages || 1, 500)} 
              page={upcomingPage} 
              onChange={handleUpcomingPageChange}
              color="primary"
            />
          </Box>
        </>
      );
    }
  };
  
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Discover Movies
        </Typography>
        
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          indicatorColor="primary"
          textColor="primary"
          sx={{ mb: 3 }}
        >
          <Tab label="Popular" />
          <Tab label="Upcoming" />
        </Tabs>
        
        {renderContent()}
      </Box>
    </Container>
  );
};

export default HomePage; 