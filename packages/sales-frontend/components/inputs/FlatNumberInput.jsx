import React from 'react'
import { Box,Typography,IconButton, useTheme,} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function FlatNumberInput() {
    const theme = useTheme();
    return (
        <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            border: `1px solid ${theme.palette.outline.primary}`,
            marginRight: 2
        }}>
            <IconButton color="primary">
                <RemoveIcon />
            </IconButton>
            <Typography variant="body1" sx={{ paddingX: 1 }}>
                1
            </Typography>
            <IconButton color="primary">
                <AddIcon />
            </IconButton>
        </Box>
    )
}
