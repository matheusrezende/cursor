import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
      light: '#dbb5ff',
      dark: '#9a67ea',
      contrastText: '#000000',
    },
    secondary: {
      main: '#03dac6',
      light: '#84ffff',
      dark: '#00a896',
      contrastText: '#000000',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    error: {
      main: '#cf6679',
    },
    warning: {
      main: '#ffb74d',
    },
    success: {
      main: '#4caf50',
    },
    info: {
      main: '#2196f3',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
      disabled: '#666666',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.3,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8, // Base unit of 8px for spacing
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          borderRadius: 8,
        },
      },
    },
  },
});

export default darkTheme; 