
import { DetailDivider } from '@components/product/ProductUIAssets';
import {
    Box, Typography, Paper, Avatar, Button,

    useTheme
} from '@mui/material';



export const ProfileAssets = {
    InfoCard: ({ title, children, }) => {
        const theme = useTheme();
        return (
            <Paper elevation={3} style={{ padding: 16, width: '100%' }}>
                <Typography variant="subtitle1" fontWeight={theme.fontWeight.medium} fontSize={18}>{title}</Typography>
                <DetailDivider mt={'10px'} mb={'20px'} />
                {children}
            </Paper>
        );
    },
    variants: {
        outlined: 'outlined',
        contained: 'contained',
        text: 'text'
    },
    Button: ({ children, variant }) => {
        const theme = useTheme();
        return (
            <Box display="flex" alignItems="center" mt={'15px'}>
                <Button variant={variant} sx={{ py: '10px', px: '30px', borderRadius: '10px', border: '2px solid #000000', fontFamily: theme.fontFamily.publicSans }} >
                    {children || 'Edit'}
                </Button>
            </Box>
        );
    },
    InfoLine: ({ label, value }) => {
        const theme = useTheme();
        return (
            <Typography variant="body1">{label}: <Typography color='textThirdary' display={'inline'}
                lineHeight={2.0} fontFamily={theme.fontFamily.publicSans}
                fontSize={16} >
                {value}
            </Typography></Typography>
        );
    },
    InfoAvatarGroup: ({ avatar, title, subtitle }) => {
        const theme = useTheme();
        return (
            <Box display="flex" alignItems="flex-start" fontFamily={theme.fontFamily.publicSans} mb={2}>
                <Avatar src={avatar} alt="Muhammed Nabeel" style={{ width: 60, height: 60, marginRight: 16 }} />
                <Box>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="body1" color="textThirdary">{subtitle}</Typography>
                </Box>
            </Box>
        );
    }
}
