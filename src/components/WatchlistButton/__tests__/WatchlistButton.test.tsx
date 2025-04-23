import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WatchlistButton from '../WatchlistButton.component';
import * as storageService from '../../../services/storage.service';

// Mock the storage service
vi.mock('../../../services/storage.service', () => ({
  isInWatchlist: vi.fn(),
  addToWatchlist: vi.fn(),
  removeFromWatchlist: vi.fn(),
}));

const mockMovie = {
  id: 123,
  title: 'Test Movie',
  poster_path: '/test.jpg',
  backdrop_path: '/backdrop.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
  overview: 'Test overview',
  genre_ids: [28, 12]
};

describe('WatchlistButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the button variant correctly', () => {
    vi.mocked(storageService.isInWatchlist).mockReturnValue(false);
    
    render(<WatchlistButton movie={mockMovie} variant="button" />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Add to Watchlist');
  });

  it('renders the icon variant correctly', () => {
    vi.mocked(storageService.isInWatchlist).mockReturnValue(false);
    
    render(<WatchlistButton movie={mockMovie} variant="icon" />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveTextContent('Add to Watchlist');
  });

  it('shows "Add to Watchlist" when movie is not in watchlist', () => {
    vi.mocked(storageService.isInWatchlist).mockReturnValue(false);
    
    render(<WatchlistButton movie={mockMovie} variant="button" />);
    
    expect(screen.getByText('Add to Watchlist')).toBeInTheDocument();
  });

  it('shows "Remove from Watchlist" when movie is in watchlist', () => {
    vi.mocked(storageService.isInWatchlist).mockReturnValue(true);
    
    render(<WatchlistButton movie={mockMovie} variant="button" />);
    
    expect(screen.getByText('Remove from Watchlist')).toBeInTheDocument();
  });

  it('adds movie to watchlist when button is clicked and movie is not in watchlist', () => {
    vi.mocked(storageService.isInWatchlist).mockReturnValue(false);
    
    render(<WatchlistButton movie={mockMovie} variant="button" />);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(storageService.addToWatchlist).toHaveBeenCalledWith(mockMovie);
    expect(storageService.removeFromWatchlist).not.toHaveBeenCalled();
  });

  it('removes movie from watchlist when button is clicked and movie is in watchlist', () => {
    vi.mocked(storageService.isInWatchlist).mockReturnValue(true);
    
    render(<WatchlistButton movie={mockMovie} variant="button" />);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(storageService.removeFromWatchlist).toHaveBeenCalledWith(mockMovie.id);
    expect(storageService.addToWatchlist).not.toHaveBeenCalled();
  });

  it('should accept and use custom props', () => {
    vi.mocked(storageService.isInWatchlist).mockReturnValue(false);
    
    render(
      <WatchlistButton 
        movie={mockMovie} 
        variant="button" 
        buttonProps={{ 
          size: 'small',
          'data-testid': 'custom-button'
        }} 
      />
    );
    
    const button = screen.getByTestId('custom-button');
    expect(button).toBeInTheDocument();
  });
}); 