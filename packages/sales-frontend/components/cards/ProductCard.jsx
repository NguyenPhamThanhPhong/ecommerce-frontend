import { Card, RadioGroup, CardMedia, CardContent, Typography, Box, Avatar, IconButton, Badge, Stack, Button, CardActionArea } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ProductRating, ProductFavorite, ProductColorPickerItem, ProductTag, ProductColorPicker, ProductSelector } from '@components/product/ProductUIAssets';
import { toPercentage, trimString } from "@shared-utils/ConverterUtils"
import { useProductDetailContext } from '@shared-conntext/ProductContext';
// Define color options for selection
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useEffect } from 'react';
import { useGlobalCartContext } from '@shared-conntext/CartContext';
import { useRouter } from 'next/router';

export default function ProductCard({ product: detail }) {
  const theme = useTheme();
  const router = useRouter();

  const { product, fav, changeFav } = useProductDetailContext({ detail });
  const [count, setCount] = React.useState(0);

  const { cart, addToCart, removeFromCart } = useGlobalCartContext();

  useEffect(() => {
    if (!localStorage) return;
    if (count <= 0) {
      removeFromCart(product.id);
    }
    else if (count > 0) {
      addToCart(product.id, count);
    }
  }, [count]);
  useEffect(() => {
    if (cart.length > 0) {
      const item = cart.find((item) => item.id === product.id);
      if (item?.quantity && count > 0) {
        setCount(item.quantity);
      }
    }
  }, [cart]);


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
      <CardActionArea onDoubleClick={()=>router.push(`/products/${product?.code}`)}>
        <CardMedia
          component="img"
          image={product.thumbnailUrl} // Replace with the actual image path
          alt="Product Image"
          sx={{ height: 150, objectFit: 'fill', flexGrow: 1 }}
        />
      </CardActionArea>
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
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1} mt={1}>
          <Stack direction="row" spacing={1} display={'flex'} alignItems={'center'}>
            <IconButton size="small" onClick={() => {
              if (count === 0) return;
              setCount(count - 1)
            }}
            ><RemoveCircleIcon /></IconButton>
            <Typography variant="body1">{count}</Typography>
          </Stack>
          <Button onClick={() => { setCount(count + 1) }} variant="contained" color="primary" sx={{
            borderRadius: 2, fontSize: '12px',
            px: '6px', py: '5px'
          }}>
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
