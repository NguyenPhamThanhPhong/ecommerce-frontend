import { Box, Typography } from "@mui/material";


export const CartOrderItem = ({ label, value, fontWeight }) => (
    <Box sx={{
        display: 'flex', justifyContent: 'space-between',
        fontSize: 16,
        mb: 2
    }}>
        <Typography>{label}</Typography>
        <Typography sx={{ fontWeight: fontWeight }}>{value}</Typography>
    </Box>
)