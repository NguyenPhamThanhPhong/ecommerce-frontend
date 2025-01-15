import {
    Box, Paper, TextField, MenuItem, Typography, Stack,
    FormControlLabel,
} from '@mui/material';
import { useProductForm } from '@components/forms/AddProductForm';
import { FormTextBox, FormMultiSelect, SelectChip, FormSelect } from '@shared-src/InputAssets'
import { DatePicker } from '@mui/x-date-pickers';
import ProductImageGroupInput from '@components/inputs/ImageGroupInput';
import { ResetButton, SubmitButton } from '@shared-src/ButtonAssets';
import AdminBreadcrumbs from '@components/sidebar/AdminBreadCrumbs';
import { FormRichText } from '@shared-src/InputAssets';
import { useEffect } from 'react';
import { useRouter } from 'next/router';


export default function ProductFormUI({ isUpdate }) {
    const router = useRouter();
    const {productCode} = router.query;
    const {
        productName, description,
        highlights, policies,
        brand, category,
        price, discountPercent,
        imageGroup, thumbnail,
        quantity, stock,
        publishDate,
        loadProduct, submitUpdate,
        submitCreate, reset,
    } = useProductForm(isUpdate);
    useEffect(() => {
        if (isUpdate && productCode) {
            loadProduct(productCode);
        }
    }, [])

    return (
        <>
            <Stack direction={'row'} sx={{ pb: 2, gap: 2 }}>
                <ResetButton label="Reset" onClick={reset} />
                <SubmitButton label="Save Product" onClick={
                    isUpdate ? submitUpdate : submitCreate
                } />
                {/* <MyRichTextEditor /> */}

            </Stack>
            <Box sx={{
                display: 'flex', justifyContent: 'space-between', gap: 2,
            }}>
                <Stack sx={{ width: '70%', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
                    {/* Media Section */}
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Media
                        </Typography>
                        <productName.Component {...productName} />
                        <description.Component {...description} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box width={'47%'} >
                                <highlights.Component {...highlights} />
                            </Box>
                            <Box width={'47%'} >
                                <policies.Component {...policies} />
                            </Box>
                        </Box>
                        {/* <policies.Component /> */}
                    </Paper>
                    <Paper sx={{ p: 3, mb: 3, display: 'flex', gap: 4 }}>
                        {/* <ProductImageGroupInput /> */}
                        <Box >
                            <thumbnail.Component {...thumbnail} />
                        </Box>
                        <Box flexGrow={1} flex={1}>
                            <imageGroup.Component {...imageGroup} />
                        </Box>

                    </Paper>

                    {/* Pricing Section */}
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Pricing
                        </Typography>
                        <Box sx={{
                            display: 'flex', gap: 1,
                            alignItems: 'center', justifyContent: 'space-between'
                        }}>
                            {/* <TextField label="Base Price" placeholder="Type base price here..." fullWidth /> */}
                            <price.Component {...price} />
                            <discountPercent.Component {...discountPercent} />
                            {/* Discount type */}

                        </Box>
                    </Paper>
                </Stack>
                <Stack sx={{ width: '28%', minHeight: '100vh' }}>
                    {/* Category & Price */}
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Category
                        </Typography>
                        <brand.Component {...brand} />
                        <category.Component {...category} />
                    </Paper>
                    {/* Inventory Section */}
                    <Paper sx={{ p: 3, }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Inventory</Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <publishDate.Component {...publishDate} />
                            <stock.Component {...stock} />
                            <quantity.Component {...quantity} />
                        </Box>
                    </Paper>
                </Stack>
            </Box>
        </>
    );
}