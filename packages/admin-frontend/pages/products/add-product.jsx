'use client'
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

const ProductPage = () => {
  const {
    formValues, errors, productName, description,
    brand, category,
    price, discountPercent,
    imageGroup, thumbnail,
    quantity, stock,
    publishDate, availableTo,
    submitCreate,reset,
  } = useProductForm({ productName: 'hallo' });

  return (
    <>
      <Stack direction={'row'} sx={{ pb: 2, gap: 2 }}>
        <ResetButton label="Reset" />
        <SubmitButton label="Save Product" onClick={submitCreate} />
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* <TextField label="Base Price" placeholder="Type base price here..." fullWidth /> */}
              <price.Component {...price} />
              {/* Discount type */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Discount Type"
                  select
                  fullWidth>
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="percentage">Percentage</MenuItem>
                  <MenuItem value="fixed">Fixed Amount</MenuItem>
                </TextField>
                <TextField label="Discount Percentage (%)" placeholder="Type discount percentage..." fullWidth />
              </Box>
              {/* Tax */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Tax Class"
                  select
                  fullWidth
                >
                  <MenuItem value="standard">Standard</MenuItem>
                  <MenuItem value="reduced">Reduced</MenuItem>
                  <MenuItem value="zero">Zero</MenuItem>
                </TextField>
                <TextField label="VAT Amount (%)" placeholder="Type VAT amount..." fullWidth />
              </Box>
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
};

export default ProductPage;
