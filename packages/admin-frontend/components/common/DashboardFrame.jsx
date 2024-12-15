'use client';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Button, IconButton, TextField,

    Tooltip
 } from '@mui/material';

// import ShoppingCartIcon from '@mui/icons-material/Search';

import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';
import { Search } from '@mui/icons-material';

".css-mk1z4a-MuiButtonBase-root-MuiListItemButton-root.Mui-selected"

const temp = ""
{
    `
    .card-wrapper {
      padding-left: 50px;
      margin-right: 50px;
    }

    .swiper-button-next,
    .swiper-button-prev {
    margin-left: -20px;
      color: red;
      font-weight: 800;
    }

    .swiper-button-next:hover,
    .swiper-button-prev:hover {
      color: #808080; /* Change on hover */
    }
  `}
""


const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'orders',
        title: 'Orders',
        icon: <ShoppingCartIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon />,
    },
];

const itemHover = 'rgba(0, 176, 116,0.15)';

const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    // palette: {
    //     primary: {
    //         main: '#1976d2',
    //     },
    //     secondary: {
    //         main: '#ff4081',
    //     },
    //     text: {
    //         // primary: '#00b074', // Default text color
    //     },
    // },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2rem',
        },
    },
    components: {
        // MuiDrawer: {
        //     styleOverrides: {
        //         paper: {
        //             backgroundColor: '#f4f4f4',
        //         },
        //     },
        // },
        MuiTouchRipple: {
            styleOverrides: {
                child: {
                    backgroundColor: 'green', // Ripple color when mouse-down
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: ({ theme }) => {
                    const themeMode = theme.palette.mode;
                    let lightTheme = {};
                    if (themeMode === 'light')
                        lightTheme = {

                            '& .MuiTypography-root': {
                                fontWeight: 500,
                            },
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(0, 176, 116, 0.15)', // Background for selected item
                                color: 'rgba(0, 176, 116, 1)', // Text color for selected item
                                '& .MuiTypography-root': {
                                    color: 'rgba(0, 176, 116, 1) !important', // Typography for selected
                                    fontWeight: 'bold',
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'rgba(0, 176, 116, 1) !important', // Icon color for selected
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 176, 116, 0.25)', // Hover background for selected item
                                },
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(0, 176, 116, 0.1)', // Hover background for non-selected item
                            },
                        }
                    return ({
                        borderRadius: 4,
                        ...lightTheme,
                    });
                }
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: 'inherit', // Ensures icon color inherits from parent
                },
            },
        },
    },
});



function useDemoRouter(initialPath) {
    const [pathname, setPathname] = React.useState(initialPath);

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

export default function DashboardLayoutBasic(props) {
    const { window } = props;

    const router = useDemoRouter('/dashboard');

    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;
    const [session, setSession] = React.useState({
        user: {
            name: 'Bharat Kashyap',
            email: 'bharatkashyap@outlook.com',
            image: 'https://avatars.githubusercontent.com/u/19550456',
        },
    });
    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: 'Bharat Kashyap',
                        email: 'bharatkashyap@outlook.com',
                        image: 'https://avatars.githubusercontent.com/u/19550456',
                    },
                });
            },
            signOut: () => {
                setSession(null);
            },
        };
    }, []);

    const ToolbarActionsSearch = () => (
        <Box  sx={{
            bgcolor:'pink',
            width: '80%',
            flexGrow: 1,
        }}>
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                slotProps={{
                    input: {
                        endAdornment: (
                            <IconButton type="button" aria-label="search" size="small">
                                <Search />

                            </IconButton>
                        )
                    }
                }}
            />

        </Box>
    );
    const temp = () => {
        return (
            <Stack direction="row">
                asdjfklasjdklj
            </Stack>
        )
    }

    return (
        <>
            <AppProvider
                session={session}
                authentication={authentication}
                navigation={NAVIGATION}
                router={router}
                theme={demoTheme}
                window={demoWindow}
            >
                <DashboardLayout slots={{
                    toolbarActions: ToolbarActionsSearch, // Pass as a React element
                }} sx={{
                    display: 'flex',
                    
                }}>
                    <PageContainer>
                        <Grid container spacing={1}>
                            <Box>
                                {router.pathname}
                            </Box>

                        </Grid>
                    </PageContainer>
                </DashboardLayout>
            </AppProvider>
        </>
    );
}