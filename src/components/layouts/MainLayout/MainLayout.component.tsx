import { Box, Container, AppBar, Toolbar, Typography, Button, useMediaQuery, Theme, IconButton, Drawer, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.constants';
import SearchBar from '../../SearchBar/SearchBar.component';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const isSearchPage = location.pathname === ROUTES.SEARCH;
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on route change or window resize
  useEffect(() => {
    setDrawerOpen(false);
  }, [location, isMobile]);

  const navItems = [
    { name: 'Discover', path: ROUTES.HOME },
    { name: 'Search', path: ROUTES.SEARCH },
    { name: 'Watchlist', path: ROUTES.WATCHLIST },
    { name: 'Watched', path: ROUTES.WATCHED },
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} onClick={toggleDrawer}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton 
              component={RouterLink} 
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary" sx={{ bgcolor: 'background.paper' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Typography 
              variant="h6" 
              component={RouterLink} 
              to={ROUTES.HOME}
              sx={{ 
                textDecoration: 'none', 
                color: 'primary.main',
                fontWeight: 'bold' 
              }}
            >
              TMDB Watchlist
            </Typography>
          </Box>
          
          {!isSearchPage && (
            <Box sx={{ display: { xs: 'none', sm: 'block' }, mx: 2, flexGrow: 1, maxWidth: 400 }}>
              <SearchBar size="small" />
            </Box>
          )}
          
          {!isMobile && (
            <Box>
              {navItems.map((item) => (
                <Button 
                  key={item.name}
                  component={RouterLink} 
                  to={item.path} 
                  color="inherit"
                  sx={{ 
                    mx: 1,
                    fontWeight: location.pathname === item.path ? 'bold' : 'regular',
                    color: location.pathname === item.path ? 'primary.main' : 'text.secondary'
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        {drawer}
      </Drawer>
      
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
      
      <Box component="footer" sx={{ py: 3, bgcolor: 'background.paper', mt: 'auto' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            TMDB Watchlist App &copy; {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout; 