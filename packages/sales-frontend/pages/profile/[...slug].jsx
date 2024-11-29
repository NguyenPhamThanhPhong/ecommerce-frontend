import * as React from 'react';
import Box from '@mui/material/Box';
import { ToggleButton, ToggleButtonGroup, useTheme, Stack } from "@mui/material";
import { useRouter } from "next/router";
import Link from 'next/link'; // Import from next/link
import Dashboard from '@components/profile/ProfileDashboard';
import AccountSettings from '@components/profile/AccountSettings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function ProfileDashboardSidebar({ buttons, value, onChange }) {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '30%',
                '& > *': {
                    m: 1,
                },
            }}>
            <ToggleButtonGroup
                orientation="vertical"
                aria-label="Vertical button group"
                variant="contained"
                exclusive
                fullWidth
                value={value}
            >
                {buttons}
            </ToggleButtonGroup>
        </Box>
    );
}

const children = {
    'dashboard': (<Dashboard />),
    'details': (<AccountSettings />),
}

const menu = [
    { label: 'dashboard', path: 'dashboard', icon: <DashboardIcon /> },
    { label: 'Account Details', path: 'details', icon: <AccountCircleIcon /> },
    { label: 'Shipping', path: 'shipping', icon: <LocalShippingIcon /> },
    { label: 'balance', path: 'balance', icon: <AccountBalanceIcon /> },
    { label: 'logout', path: 'logout', icon: <ExitToAppIcon /> }
];

export default function Profile() {
    const theme = useTheme();
    const router = useRouter();
    const { asPath: path } = router;
    const subPath = path.replace('/profile/', '');
    const [selected, setSelected] = React.useState(subPath);

    React.useEffect(() => {
        setSelected(subPath);
    }, [subPath]);

    const buttons = menu.map((item) => (
        <Link key={item.label} href={`/profile/${item.path}`} passHref>
            <ToggleButton
                value={item.path}
                sx={{
                    bgcolor: theme.palette.secondary.main,
                    alignItems: 'flex-start',
                    display: 'flex',
                    color: theme.palette.text.primary,
                    '&.Mui-selected': {
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.main,
                        },
                    },
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.light,
                    },
                }}
            >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%' }}>
                    {item.icon}
                    <span>{item.label}</span>
                </Stack>
            </ToggleButton>
        </Link>
    ));

    return (
        <Box sx={{ display: 'flex' }}>
            <ProfileDashboardSidebar buttons={buttons} value={selected} />
            {children[selected]}
        </Box>
    );
}
