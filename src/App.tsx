import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import darkTheme from './styles/theme';
import { ROUTES } from './constants/routes.constants';
import MainLayout from './components/layouts/MainLayout/MainLayout.component';
import HomePage from './pages/HomePage/HomePage.page';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage.page';
import SearchPage from './pages/SearchPage/SearchPage.page';
import WatchlistPage from './pages/WatchlistPage/WatchlistPage.page';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.MOVIE_DETAILS} element={<MovieDetailsPage />} />
              <Route path={ROUTES.SEARCH} element={<SearchPage />} />
              <Route path={ROUTES.WATCHLIST} element={<WatchlistPage />} />
              <Route path={ROUTES.WATCHED} element={<div>Watched (coming soon)</div>} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
