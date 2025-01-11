import React, { useEffect } from 'react'
import { Box, Typography, IconButton, useTheme, } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function FlatNumberInput({ id, initialValue, onChange }) {
    const [value, setValue] = React.useState(initialValue || 1);
    useEffect(() => {
        if (onChange) {
            onChange(id, value);
        }
    }, [value]);
    const handleIncrement = () => setValue(value + 1);
    const handleDecrement = () => {
        if (value >= 1)
            setValue(value - 1);
    };
    const theme = useTheme();
    return (
        <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            border: `1px solid ${theme.palette.outline.primary}`,
            marginRight: 2
        }}>
            <IconButton disabled={value<=1} color="primary" onClick={handleDecrement}>
                <RemoveIcon />
            </IconButton>
            <Typography variant="body1" sx={{ paddingX: 1 }}>
                {value}
            </Typography>
            <IconButton color="primary" onClick={handleIncrement}>
                <AddIcon />
            </IconButton>
        </Box>
    )
}
