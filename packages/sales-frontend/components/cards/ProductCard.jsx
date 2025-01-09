import { Card, RadioGroup, CardMedia, CardContent, Typography, Box, Avatar, IconButton, Badge, Stack, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ProductRating, ProductFavorite, ProductColorPickerItem, ProductTag, ProductColorPicker, ProductSelector } from '@components/product/ProductUIAssets';
import { toPercentage, trimString } from "@shared-utils/ConverterUtils"
import { useProductDetailContext } from '@shared-conntext/ProductContext';
// Define color options for selection


export default function ProductCard({ product: detail }) {
  const theme = useTheme();
  const colorOptions = ['#1E88E5', '#FF5252', '#424242', '#8BC34A'];

  const { product, fav, changeFav } = useProductDetailContext({ detail });

  return (
    <Card sx={{
      maxWidth: 190, borderRadius: 2,
      marginLeft: 'auto', marginRight: 'auto',
      boxShadow: 3,
      display: 'flex', flexDirection: 'column', position: 'relative',
    }}>
      <Box>
        <ProductTag label={toPercentage(product.discountPercent / 100, 0)} color={theme.palette.text.secondary}></ProductTag>
        <ProductFavorite checked={fav} onChange={changeFav} />
      </Box>
      {/* Product Image */}
      <CardMedia
        component="img"
        image={product.thumbnailUrl} // Replace with the actual image path
        alt="Product Image"
        sx={{ height: 150, objectFit: 'fill', flexGrow: 1 }}
      />
      <CardContent>
        {/* Color Options */}
        {product.imageUrls && product.imageUrls.length > 1 && (
          <ProductSelector />
        )}
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1}>
          <Typography fontSize={'24px'} variant="h5" fontWeight="bold">
            ₫{product.price}
          </Typography>
          <ProductRating rating={product.rating} />
        </Box>

        {/* Product Name */}
        <Typography fontSize={12} variant="subtitle1" fontWeight={theme.fontWeight.medium}>
          {trimString(product.name)}
        </Typography>
        <Typography variant="body2" color="text.disable" fontWeight={theme.fontWeight.light}>
          {trimString(product.description)}
        </Typography>
      </CardContent>
    </Card>
  );
}
