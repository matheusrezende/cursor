import { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  CircularProgress, 
  Container, 
  InputAdornment,
  Pagination,
  Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { useMovieSearch } from '../../hooks/useMovies.hook';
import MovieCard from '../../components/MovieCard/MovieCard.component';
import EmptyState from '../../components/EmptyState/EmptyState.component';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialPage = parseInt(searchParams.get('page') || '1', 10);

  const [searchInput, setSearchInput] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);

  // Reset page when search query changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  // Update URL parameters when search query or page changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set('q', searchQuery);
      params.set('page', page.toString());
    }
    setSearchParams(params);
  }, [searchQuery, page, setSearchParams]);

  // Fetch search results
  const { data, isLoading, isError } = useMovieSearch(searchQuery, page);

  // Debounce search input to prevent excessive API calls
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 500),
    []
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  // Handle pagination change
  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Search Movies
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for movies..."
          value={searchInput}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          autoFocus
          sx={{ mb: 2 }}
        />
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {isError && (
        <Typography color="error" sx={{ textAlign: 'center', my: 4 }}>
          Error loading search results. Please try again.
        </Typography>
      )}

      {!isLoading && !isError && searchQuery && data?.results?.length === 0 && (
        <EmptyState 
          title="No results found"
          message="Try adjusting your search or try a different term."
          icon="search"
        />
      )}

      {!isLoading && !isError && !searchQuery && (
        <EmptyState 
          title="Search for movies"
          message="Enter a search term to find movies"
          icon="search"
        />
      )}

      {!isLoading && !isError && data && data.results && data.results.length > 0 && (
        <>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">
              Found {data.total_results} results for "{searchQuery}"
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {data.results.map((movie) => (
              <Grid size={{xs: 12, sm: 6, md: 4, lg: 3}} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>

          {data.total_pages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={Math.min(data.total_pages, 500)} // TMDB API maximum page limit
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default SearchPage; 