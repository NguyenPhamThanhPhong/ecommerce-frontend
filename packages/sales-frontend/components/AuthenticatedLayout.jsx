import React from 'react';
import { styled } from '@mui/system';
import { AppBar, Box, Toolbar, Typography, Container, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';

import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const StyledAppBar = styled(AppBar)( {
    marginBottom: '2rem',
} );

const StyledContainer = styled( Container )( {
    flexGrow: 1,
    padding: '3rem',
} );

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    const theme = useTheme();
  
    return (
      <AppBar position="static"
        sx={{
          backgroundColor: theme.palette.appbar.background,
          height: '56px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters="false" sx={{

          }}>
            <AdbIcon color='logo' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                // color: 'red',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="text.primary"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

const Footer = () => {
    return (
        <footer>
            <Typography variant="body2" align="center">
                Quick links: <Link href="/">Home</Link>, <Link href="/about">About Us</Link>, <Link href="/contact">Contact Us</Link>, <Link href="/faq">FAQ</Link>
            </Typography>
            <Typography variant="body2" align="center">
                Important policies: <Link href="/privacy">Privacy</Link>, <Link href="/terms">Terms of Service</Link>, <Link href="/returns">Returns & Refunds</Link>, <Link href="/shipping">Shipping</Link>
            </Typography>
            <Typography variant="body2" align="center">
                Let us help you: Customer support, live chat, help center
            </Typography>
            <Typography variant="body2" align="center">
                Connect with us: <a href="https://www.facebook.com">Facebook</a>, <a href="https://www.twitter.com">Twitter</a>, <a href="https://www.instagram.com">Instagram</a>
            </Typography>
            <Typography variant="body2" align="center">
                Subscribe:...
            </Typography>
            <Typography variant="body2" align="center">
                &copy; {new Date().getFullYear()} Ecommerce App. All rights reserved.
            </Typography>
        </footer>
    );
};

const AuthenticatedLayout = ({ children }) => {
    return (
        <div>
            <ResponsiveAppBar />
            <StyledContainer maxWidth="lg">{children}</StyledContainer>
            <Footer />
        </div>
    );
};

export default AuthenticatedLayout;
