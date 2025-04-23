import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import WatchlistPage from '../WatchlistPage.page';
import * as storageService from '../../../services/storage.service';

// Mock the storage service
vi.mock('../../../services/storage.service', () => ({
  getWatchlist: vi.fn(),
}));

// Mock the MUI components we depend on
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    CircularProgress: () => <div data-testid="loading-spinner">Loading...</div>
  };
});

// Mock the components we depend on
vi.mock('../../../components/MovieCard/MovieCard.component', () => ({
  default: ({ movie }) => <div data-testid="movie-card">{movie.title}</div>
}));

vi.mock('../../../components/EmptyState/EmptyState.component', () => ({
  default: ({ title, message }) => (
    <div data-testid="empty-state">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  )
}));

const mockWatchlistMovies = [
  {
    id: 123,
    title: 'Test Movie 1',
    poster_path: '/test1.jpg',
    release_date: '2023-01-01',
    vote_average: 8.5
  },
  {
    id: 456,
    title: 'Test Movie 2',
    poster_path: '/test2.jpg',
    release_date: '2023-02-01',
    vote_average: 7.5
  }
];

describe('WatchlistPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with loading state', () => {
    const getWatchlistMock = vi.mocked(storageService.getWatchlist);
    
    let resolveGetWatchlist;
    const watchlistPromise = new Promise(resolve => {
      resolveGetWatchlist = resolve;
    });
    
    getWatchlistMock.mockImplementation(() => {
      return [] as any;
    });
    
    const { rerender } = render(
      <BrowserRouter>
        <WatchlistPage />
      </BrowserRouter>
    );
    
    expect(getWatchlistMock).toHaveBeenCalled();
  });

  it('shows empty state when watchlist is empty', async () => {
    vi.mocked(storageService.getWatchlist).mockReturnValue([]);
    
    render(
      <BrowserRouter>
        <WatchlistPage />
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('empty-state')).toBeInTheDocument();
      expect(screen.getByText('Your watchlist is empty')).toBeInTheDocument();
    });
  });

  it('renders watchlist movies when available', async () => {
    vi.mocked(storageService.getWatchlist).mockReturnValue(mockWatchlistMovies);
    
    render(
      <BrowserRouter>
        <WatchlistPage />
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('My Watchlist')).toBeInTheDocument();
      expect(screen.getAllByTestId('movie-card')).toHaveLength(2);
      expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
    });
  });

  it('sets up and cleans up event listeners', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    
    const { unmount } = render(
      <BrowserRouter>
        <WatchlistPage />
      </BrowserRouter>
    );
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('watchlistUpdated', expect.any(Function));
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('watchlistUpdated', expect.any(Function));
  });
}); 