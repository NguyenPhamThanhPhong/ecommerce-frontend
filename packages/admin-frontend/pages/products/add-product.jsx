import React from 'react';
import { Box, Paper, TextField, MenuItem, Typography, Stack,
 } from '@mui/material';
import { useProductForm } from '@components/forms/AddProductForm';
import { FormTextBox, FormMultiSelect, SelectChip, FormSelect } from '@shared-src/InputAssets'

const ProductPage = () => {
  const {
    formValues, errors, productName, description,brand,category
  } = useProductForm({ productName: 'hallo' });
  return (
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
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Media
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 100,
                  height: 100,
                  border: '1px dashed #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f0f0f0',
                }}
              >
                <Typography variant="caption">Image {index + 1}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Pricing Section */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Pricing
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Base Price" placeholder="Type base price here..." fullWidth />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Discount Type"
                select
                fullWidth
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="percentage">Percentage</MenuItem>
                <MenuItem value="fixed">Fixed Amount</MenuItem>
              </TextField>
              <TextField label="Discount Percentage (%)" placeholder="Type discount percentage..." fullWidth />
            </Box>
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

        {/* Inventory Section */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Inventory
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="SKU" placeholder="Type product SKU here..." fullWidth />
            <TextField label="Barcode" placeholder="Product barcode..." fullWidth />
            <TextField label="Quantity" placeholder="Type product quantity here..." fullWidth />
          </Box>
        </Paper>
      </Stack>
      <Stack sx={{ width: '28%', minHeight: '100vh' }}>
      <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            Category
          </Typography>
          <brand.Component {...brand} />
          <category.Component {...category} />
        </Paper>
      </Stack>
    </Box>
  );
};

export default ProductPage;
