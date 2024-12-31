import { useBrandCategoryForm } from '@components/forms/AddBrandCategoryForm';
import { Box, Paper, Stack, Typography, useTheme } from '@mui/material'
import { FormThumbnailPicker } from '@shared-src/InputAssets'
import React from 'react'

export default function AddBrand() {
    const theme = useTheme();
    const { name, description, image } = useBrandCategoryForm({});
    return (
        <Box sx={{ width: '100%', gap: 5, display: 'flex', flexWrap: 'wrap' }}>
            <Paper sx={{ width: '30%', minWidth: 264, mb: 2, fontWeight: 'bold' }}>
                <Stack direction="column" spacing={2} sx={{
                    fontFamily: theme.fontFamily.publicSans,
                    mx: '26px', my: '37px'
                }}>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                        Thumbnail
                    </Typography>
                    <Typography variant='body1' sx={{ color: '#777980' }}>
                        Upload a thumbnail for the brand
                    </Typography>
                    <FormThumbnailPicker value={null} onChange={(e) => console.log(e)} />
                </Stack>
            </Paper>
            <Paper sx={{ width: '65%', minWidth: 400, }}>
                <Stack direction="column" spacing={2} sx={{
                    fontFamily: theme.fontFamily.publicSans,
                    mx: '26px', my: '37px'
                }}>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                        Thumbnail
                    </Typography>
                    <name.Component {...name} />
                    <description.Component {...description} />
                </Stack>
            </Paper>
        </Box>
    )
}
