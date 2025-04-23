import { useState, useCallback } from 'react';
import { 
  Box, 
  TextField, 
  InputAdornment, 
  IconButton,
  Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.constants';
import debounce from 'lodash.debounce';

interface SearchBarProps {
  placeholder?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  width?: string | number;
}

/**
 * Reusable search bar component that navigates to search page with query
 */
const SearchBar = ({ 
  placeholder = 'Search movies...', 
  size = 'medium',
  fullWidth = false,
  width = 240
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  // Clear search input
  const clearSearch = () => {
    setSearchValue('');
  };

  // Process search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Debounced submit function for auto-submit after typing stops
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(
    debounce(() => {
      if (searchValue.trim()) {
        navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(searchValue.trim())}`);
      }
    }, 1000),
    [searchValue, navigate]
  );

  // Call debounced submit when search value changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e);
    debouncedSubmit();
  }, [debouncedSubmit]);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: fullWidth ? '100%' : width }}>
      <TextField
        fullWidth
        size={size}
        value={searchValue}
        onChange={onChange}
        placeholder={placeholder}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment position="end">
              <Tooltip title="Clear search">
                <IconButton
                  aria-label="clear search"
                  onClick={clearSearch}
                  edge="end"
                  size="small"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          )
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          }
        }}
      />
    </Box>
  );
};

export default SearchBar; 