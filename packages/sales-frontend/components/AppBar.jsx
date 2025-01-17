'use client';
import { AppBar, Box, Grid2, TextField, Toolbar, Typography, Container, IconButton, ListItemIcon, Badge } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { roundedStyle } from '@styles/styleUtils';

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
import Link from 'next/link';
import { useGlobalCartContext } from '@shared-conntext/CartContext';
import { useRouter } from 'next/router';
import { logout } from '@shared-api/Accounts';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';

// TODO: Add Meta data to App bar
// TODO: make profile drop down better
// TODO: blog page
const pages = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Store',
    href: '/store',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];
const settings = [{
  icon: <PersonIcon />,
  label: 'Account',
  href: '/profile/details',
},
{
  icon: <DashboardIcon />,
  label: 'Dashboard',
  href: '/profile/dashboard',
},
{
  icon: <SettingsIcon />,
  label: 'Settings',
  href: '/profile/shipping',
},
];

export const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const router = useRouter();
  const pub = useSnackbarStore(state => state.pub);
  const cart = useGlobalCartContext(state => state.cart);
  let itemCount = cart?.length || 0;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(anchorElUser ? null : event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const theme = useTheme();
  const palette = theme.palette;
  function handleLogout() {
    logout(pub).then((response) => {
      if (response) {
        pub('Logout success, ', 'info');
        setTimeout(() => {
          router.push('/');
        }, 1000);
      }
    });
  }


  return (
    <AppBar position="absolute"
      sx={{
        backgroundColor: palette.background.paper,
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
            }}>
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 2, display: { xs: 'flex', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page} href={page.href} passHref>
                <Button
                  sx={{ borderRadius: '5px', height: '55px', fontSize: '16px', my: 2, color: 'black', display: 'inline' }}>
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>
          <Box>
            <IconButton
              sx={{

                backgroundColor: palette.background, // Background color
                color: palette.text.primary, // Icon color
                '&:hover': {
                  backgroundColor: palette.hover.primary, // Darker background on hover
                },
                // boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Optional shadow for depth
              }}
              aria-label="shopping cart"
            >
              <Link href="/cart" passHref>
                <Badge badgeContent={itemCount} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </Link>
            </IconButton>

          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ...roundedStyle({ size: 55 }) }}>
                <Avatar sx={{ ...roundedStyle({ size: 45 }) }} alt="Remy Sharp" src="/image.jpg" />
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
                <MenuItem key={setting} onClick={()=>{
                  router.push(setting.href);
                  handleCloseUserMenu();
                }}>
                  <ListItemIcon>{setting.icon}</ListItemIcon>
                  <Typography sx={{ textAlign: 'center' }}>{setting.label}</Typography>
                </MenuItem>
              ))}
              <MenuItem key={'logout..'} onClick={handleLogout}>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
              </MenuItem>
            </Menu>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
