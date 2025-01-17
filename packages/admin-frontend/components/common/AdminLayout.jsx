import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import {
  Box,
  CssBaseline, Stack,
  InputBase,
  MuiAppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Avatar,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Search, SearchIconWrapper,
  SearchAutocomplete,
  StyledInputBase
} from '@components/inputs/SearchBox';
import MuiDrawer from '@mui/material/Drawer';

import MailIcon from '@mui/icons-material/Mail';
import {
  Dashboard,
} from '@mui/icons-material';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CategoryIcon from '@mui/icons-material/Category';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuButton from '@components/sidebar/MenuButton';
import AdminBreadcrumbs from '../sidebar/AdminBreadCrumbs';
import Link from 'next/link';
import { checkPath } from '@shared-utils/PathUtils';
import { useRouter } from 'next/router';
import SettingsIcon from '@mui/icons-material/Settings';
import { useGlobalAccountContext } from '@shared-conntext/AccountContext';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useState } from 'react';
import { logout } from '@shared-api/Accounts';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);
const menu = [
  {
    label: 'Dashboard',
    icon: <Dashboard />,
    href: '/',
  },
  {
    label: 'Order List',
    icon: <FormatAlignLeftIcon />,
    href: '/orders',
  },
  {
    label: 'Product List',
    icon: <InsertDriveFileIcon />,
    href: '/products',
  },
  {
    label: 'Customer List',
    icon: <PersonIcon />,
    href: '/customers',
  },
  {
    label: 'Staffs',
    icon: <AdminPanelSettingsIcon />,
    href: '/staffs',
  },
  {
    label: 'Category',
    icon: <CategoryIcon />,
    href: '/categories',
  },
  {
    label: 'Brand',
    icon: <BrandingWatermarkIcon />,
    href: '/brands',
  },
  {
    label: 'Coupon',
    icon: <LocalOfferIcon />,
    href: '/coupons',
  },
  {
    label: 'Blogs',
    icon: <NewspaperIcon />,
    href: '/blogs',
  },
  {
    label: 'Settings',
    icon: <SettingsIcon />,
    href: '/settings',
  }
]

const settings = [{
  icon: <PersonIcon />,
  label: 'Account',
  href: '/settings',
},
{
  icon: <DashboardIcon />,
  label: 'Dashboard',
  href: '/',
},
];

export const AppIconButton = ({ icon, onClick }) => {
  return (
    <Badge badgeContent={4} color="error">
      <IconButton sx={{
        borderRadius: '10px',
        onClick: { onClick },
        width: '40px',
        height: '40px',
        color: '#2D9CDB',
        bgcolor: 'rgba(45, 156, 219,0.15)',
      }}>
        {/* <NotificationsNoneIcon sx={{
          color: '#464255',
        }} /> */}
        {icon}
      </IconButton>
    </Badge>
  )
}


export default function AdminLayout({ children }) {
  const { account } = useGlobalAccountContext();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleDrawer = () => {
    setOpen(!open);
  }

  const pathName = checkPath();

  function isPathSelected(item, path) {
    const isDashboard = item.label === 'Dashboard'
    if (pathName === "/" && isDashboard) {
      return true;
    }
    else {
      return path.startsWith(item.href) && !isDashboard
    }

    // return (pathName==="/" && item.label === 'Dashboard') || pathName.startsWith(item.href)
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const avatarOpen = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleCloseUserMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    logout().then(() => {
      router.push('/login');
    })
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawer}>
            {theme.direction === 'rtl' || !open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List >
          {menu.map((item, index) => (
            <ListItem key={item} disablePadding sx={{ display: 'block', my: 1 }}>
              <MenuButton onClick={() => { router.push(item?.href) }} {...item} open={open} selected={isPathSelected(item, pathName)} />
            </ListItem>
          ))}
        </List>

      </Drawer>
      <Stack component="main" sx={{ flexGrow: 1, pt: '40px', pl: '30px', pr: '34px' }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          pb: 2,
          justifyContent: 'space-between',
        }}>
          <SearchAutocomplete />
          <Stack direction={'row-reverse'}
            gap={4} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Avatar
              onClick={handleClick}
              sx={{ cursor: 'pointer' }}
            />
            <Menu
              anchorEl={anchorEl}
              open={avatarOpen}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => {
                  router.push(setting.href)
                }}>
                  <ListItemIcon>{setting.icon}</ListItemIcon>
                  <Typography sx={{ textAlign: 'center' }}>{setting.label}</Typography>
                </MenuItem>
              ))}
              <MenuItem key={'Logout'} onClick={handleLogout}>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <Typography sx={{ textAlign: 'center' }}>{'Logout'}</Typography>
              </MenuItem>
            </Menu>
            <Typography variant="body1" component={'span'}>Hello
              <Typography variant="body1" component={'span'} sx={{ fontWeight: 'bold' }}>{account?.profile?.fullName}</Typography>
            </Typography>
            <AppIconButton icon={<NotificationsNoneIcon sx={{
              color: '#464255',
            }} />} />
          </Stack>
        </Box>
        <AdminBreadcrumbs />
        {children}
      </Stack>
    </Box>
  );
}