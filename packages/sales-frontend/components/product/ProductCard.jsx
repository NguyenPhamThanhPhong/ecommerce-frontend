import { Card, RadioGroup, FormControlLabel, CardMedia, CardContent, Typography, Box, Avatar, IconButton, Badge, Stack, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ProductRating, ProductFavorite, ProductColorPickerItem, ProductTag, ProductColorPicker } from '@components/product/ProductUIAssets';

// Define color options for selection


export default function ProductCard() {
  const theme = useTheme();
  const colorOptions = ['#1E88E5', '#FF5252', '#424242', '#8BC34A'];
  
  return (
    <Card sx={{
      maxWidth: 190, borderRadius: 2,
      marginLeft: 'auto', marginRight: 'auto',
      boxShadow: 3,
      display: 'flex', flexDirection: 'column', position: 'relative',
    }}>
      <Box>
        <ProductTag color={theme.palette.text.secondary}></ProductTag>
        <ProductFavorite />

      </Box>
      {/* Product Image */}
      <CardMedia
        component="img"
        image="iphone-black.jpg" // Replace with the actual image path
        alt="Product Image"
        sx={{ height: 150, objectFit: 'fill', flexGrow: 1 }}
      />

      <CardContent>
        {/* Color Options */}
        <ProductColorPicker
          colorOptions={colorOptions}
          selectedColor={colorOptions[0]}
        />
        
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1}>
          <Typography fontSize={'24px'} variant="h5" fontWeight="bold">
            ₹1000
          </Typography>
          <ProductRating />
        </Box>

        {/* Product Name */}
        <Typography fontSize={12} variant="subtitle1" fontWeight={theme.fontWeight.medium}>
          iPhone 15 Pro Max
        </Typography>
        <Typography variant="body2" color="text.disable" fontWeight={theme.fontWeight.light}>
          Lorem Ipsum Dolor Sit Amet, Foelered Fipel...
        </Typography>
      </CardContent>
    </Card>
  );
}
