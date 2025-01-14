
// import { DetailDivider } from '@components/product/ProductUIAssets';
import {
    Box, Typography, Paper, Avatar, Button,

    useTheme,
    Stack
} from '@mui/material';



export const UIAssets = {
    InfoCard: ({ title, children, padding, divider, sx }) => {
        const { mt, mb } = divider || { mt: '10px', mb: '20px' };
        padding = padding || '16px';
        const theme = useTheme();
        return (
            <Paper elevation={3} sx={{ padding: padding, width: '100%', ...sx }}>
                <Typography variant="subtitle1" fontWeight={theme.fontWeight.medium} fontSize={18} sx={{
                    // backgroundColor: '#f5f5f5',
                }}>{title}</Typography>
                {/* <DetailDivider mt={mt} mb={mb} /> */}
                {children}
            </Paper>
        );
    },
    variants: {
        outlined: 'outlined',
        contained: 'contained',
        text: 'text'
    },
    Button: ({ children, variant, startIcon, buttonSx, wrapperSx, onClick }) => {
        const theme = useTheme();
        buttonSx = buttonSx || {};
        wrapperSx = wrapperSx || {};
        onClick = onClick || (() => { });
        startIcon = startIcon || null;
        const buttonDefaultSx = {
            py: '10px',
            px: '30px',
            mb: 0,

            fontSize: 14,
            borderRadius: '10px', border: '2px solid #000000',
            fontFamily: theme.fontFamily.publicSans
        }
        const finalButtonSx = { ...buttonDefaultSx, ...buttonSx };
        const defaultWrapperSx = { display: 'flex', alignItems: 'center', mt: '15px', justifyContent: 'flex-end' };
        const finalWrapperSx = { ...defaultWrapperSx, ...wrapperSx };

        return (
            <Box sx={finalWrapperSx}>
                <Button variant={variant} startIcon={startIcon} sx={finalButtonSx} onClick={onClick} >
                    {children || 'Edit'}
                </Button>
            </Box>
        );
    },
    InfoLine: ({ label, value, labelProps, valueProps }) => {
        const theme = useTheme();
        labelProps = labelProps || {};
        valueProps = valueProps || {
            fontWeight: theme.fontWeight.medium,
            fontSize: 16,
            lineHeight: 2.0,
            display: 'inline',
            fontFamily: theme.fontFamily.publicSans,
            color: 'textThirdary'
        };
        return (
            <Stack direction='row' gap={1} display={'flex'} sx={{
                alignItems: 'center',
            }}>
                <Typography variant="body1" component={'span'} {...labelProps} >{label || ''}: </Typography>
                <Typography component={'span'} {...valueProps}>
                    {value || ''}
                </Typography>
            </Stack>
        );
    },
    InfoAvatarGroup: ({ title, subtitle, alignItems, avatarProp, titleSx, subtitleSx, boxSx }) => {
        const theme = useTheme();
        const avatarSx = avatarProp?.sx || { width: 60, height: 60, marginRight: 16 };
        titleSx = titleSx || { variant: 'h6' };
        subtitleSx = subtitleSx || { variant: 'body1', color: 'textThirdary' };
        boxSx = boxSx || {};
        return (
            <Box display="flex" alignItems={alignItems} fontFamily={theme.fontFamily.publicSans} mb={2}>
                <Avatar {...avatarProp} alt="Muhammed Nabeel" style={avatarSx} />
                <Box sx={boxSx}>
                    {title && <Typography variant="h6" sx={titleSx}>{title}</Typography>}
                    {subtitle && <Typography variant="body1" sx={subtitleSx}>{subtitle}</Typography>}
                </Box>
            </Box>
        );
    }
}
