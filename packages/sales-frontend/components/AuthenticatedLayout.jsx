import React from 'react';
import { styled } from '@mui/system';
import { AppBar, Box, Toolbar, Typography, Container, IconButton, ListItemIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';

import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationIcon from '@mui/icons-material/Notifications';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = [{
  icon: <PersonIcon />,
  label: 'Account',
},
{
  icon: <DashboardIcon />,
  label: 'Dashboard',
},
{
  icon: <SettingsIcon />,
  label: 'Settings',
},
{
  icon: <LogoutIcon />,
  label: 'Logout',
}
];


const StyledAppBar = styled(AppBar)({
  marginBottom: '2rem',
});

const StyledContainer = styled(Container)({
  flexGrow: 1,
  padding: '3rem',
});

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(anchorElUser ? null : event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const theme = useTheme();
  const palette = theme.palette;

  return (
    <AppBar position="static"
      sx={{
        backgroundColor: palette.appbar.background,
        height: '70px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters={false}>
          <AdbIcon color='logo' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              // color: 'red',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 2, display: { xs: 'flex', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ borderRadius:'5px', height:'55px',fontSize:'16px', my: 2, color: 'black', display: 'inline' }}>
                {page}
              </Button>
            ))}
          </Box>
          <Box>

            <IconButton
              sx={{
                height: '55px', // Set the height of the icon
                width: '55px', // Set the width of the icon
                margin: '0 10px', // Add some space between the icon and the next element
                borderRadius: '50%', // Make it round
                backgroundColor: palette.background, // Background color
                color: palette.text.primary, // Icon color
                '&:hover': {
                  backgroundColor: palette.hover.primary, // Darker background on hover
                },
                // boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Optional shadow for depth
              }}
              aria-label="shopping cart"
            >
              <ShoppingCartIcon />
            </IconButton>

          </Box>
          <Box sx={{ flexGrow: 0 }}>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, height:'55px', width:'55px' }}>
                <Avatar sx={{height:'46px', width:'46px'}} alt="Remy Sharp" src="/image.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: '45px',
                transform: "translateX(-15px)",
                borderRadius: '15px',
                transformOrigin: 'top right', // Anchor point for the "growing" effect
                animation: 'grow 0.25s ease-out', // Animation for smooth scaling
                '& .MuiMenuItem-root': {
                  padding: '8px 20px',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: palette.primary.main,
                    '& .MuiListItemIcon-root': { color: 'white' },
                    '& .MuiTypography-root': { color: 'white' },
                  },
                },
                '@keyframes grow': {
                  '0%': {
                    transform: 'scale(0)',
                  },
                  '100%': {
                    transform: 'scale(1)',
                  },
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <ListItemIcon>{setting.icon}</ListItemIcon>
                  <Typography sx={{ textAlign: 'center' }}>{setting.label}</Typography>
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
