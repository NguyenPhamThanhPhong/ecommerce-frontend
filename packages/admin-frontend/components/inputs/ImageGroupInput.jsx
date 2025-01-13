import { TextField, Button, Box, Typography, Avatar, Stack, useTheme } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { useState } from 'react';
import { FormImageGroup, FormThumbnailPicker } from '@shared-src/InputAssets';

export default function ProductImageGroupInput() {
    const [images, setImages] = useState([]); // Tracks the list of images
    const theme = useTheme();
    // Handle image list input
    return (
        <Box p={3} display={'flex'} sx={{
            gap: 3,
            justifyContent: 'space-between',
            border: '1px solid #e0e0e0',
            borderRadius: 2
        }}>
            {/* <Box width={'20%'}>
                <FormThumbnailPicker images={images} setImages={setImages} />
            </Box>
            <Box width={'80%'}>
                <FormImageGroup images={images} setImages={setImages} />
            </Box> */}
        </Box>
    );
}

