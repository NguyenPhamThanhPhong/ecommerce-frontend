import { useBrandCategoryForm } from '@components/forms/AddBrandCategoryForm';
import { Box, Paper, Stack, Typography, useTheme } from '@mui/material'
import { ResetButton, SubmitButton } from '@shared-src/ButtonAssets';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'


export default function BrandFormUI({isUpdate}) {
    const theme = useTheme();
    const router = useRouter();
    const { brandCode } = router.query;
    const { name, description, image,
        load, submitCreate, submitUpdate, reset,
    } = useBrandCategoryForm({ isUpdate, brand: true });
    useEffect(() => {
        if (isUpdate && brandCode) {
            load(brandCode);
        }
    }, [])

    return (
        <>
            <Stack direction={'row'} sx={{ pb: 2, gap: 2 }}>
            </Stack>
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
                            Upload a thumbnail for the Brand
                        </Typography>
                        <image.Component {...image} />
                        {/* <FormSimpleThumbnailPicker /> */}
                    </Stack>
                </Paper>
                <Paper sx={{ width: '65%', minWidth: 400, }}>
                    <Stack direction="column" spacing={2} sx={{
                        fontFamily: theme.fontFamily.publicSans,
                        mx: '26px', my: '37px'
                    }}>
                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                            Brand
                        </Typography>
                        <name.Component {...name} />
                        <description.Component {...description} />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                            <Stack direction={'row'} gap={4}>
                                <ResetButton label={'Reset'} onClick={reset} />
                                <SubmitButton label={'Save Customer'} onClick={
                                    isUpdate ? submitUpdate : submitCreate
                                } />
                            </Stack>
                        </Box>
                    </Stack>
                </Paper>
            </Box>
        </>
    )
}
