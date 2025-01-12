import { Card, CardMedia, CardContent, Typography, Box, Avatar, IconButton, Badge, Stack, Button, Rating, Checkbox } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import ShuffleIcon from '@mui/icons-material/Shuffle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ProductSelector } from '@components/product/ProductUIAssets';
import { useTheme } from '@mui/material/styles';
import { trimString } from '@shared-utils/ConverterUtils';
import { useRouter } from 'next/router';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { useEffect, useRef, useState } from 'react';
import { useProductDetailContext } from '@shared-conntext/ProductContext';
import { useGlobalCartContext } from '@shared-conntext/CartContext';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


function CountDownDisplay({ targetTime }) {
  // Set target time in UTC (ISO 8601 format)
  const theme = useTheme();
  targetTime = new Date(targetTime).getTime(); // Target time in milliseconds
  const [countDowns, setCountDowns] = useState(["00", "00", "00", "00"]);

  const calculateTimeLeft = (targetTime) => {
    const nowUtc = new Date().getTime();
    const timeLeft = new Date(Math.abs(targetTime - nowUtc)); // Time difference in milliseconds
    const days = String(Math.floor(timeLeft / (1000 * 60 * 60 * 24))).padStart(2, "0");
    const hours = String(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "00");
    const minutes = String(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "00");
    const seconds = String(Math.floor((timeLeft % (1000 * 60)) / 1000)).padStart(2, "00");
    // console.log('days', days, 'hours', hours, 'minutes', minutes, 'seconds', seconds);
    return [days, hours, minutes, seconds];
  };
  useEffect(() => {
    const nowUtc = new Date().getTime();
    if (targetTime < nowUtc)
      return;
    const interval = setInterval(() => {
      setCountDowns(calculateTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Typography variant="body2" color="text.primary" sx={{
        display: 'inline',
        mr: 1, fontWeight: 'bold',
        width: '40px',
        textAlign: 'left',
        fontSize: '10px',
      }}>{countDowns[0]} days</Typography>
      <Box display="inline-flex" gap={0.5}>
        {
          countDowns.slice(1,).map((countDown, index) => (
            <Button key={index} sx={{
              backgroundColor: '#FFBD13',
              color: theme.palette.text.primary,
              height: '16px',
              width: '26px',
              fontSize: '10px',
              minWidth: '26px',
            }}>{countDown}</Button>
          ))
        }
      </Box></>
  )
}

export default function HotSaleCard({ product: detail }) {
  const theme = useTheme();
  const targetTime = new Date(detail.availableDate);
  const { product, fav, handleLikeProduct,
    handleUnlikeProduct, } = useProductDetailContext({ detail });
  const images = product?.images;
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


  const pub = useSnackbarStore((state) => state.pub);
  const onFavChange = (e) => {
    if (e.target.checked) {
      handleLikeProduct(product.id);
    } else {
      handleUnlikeProduct(product.id);
    }
  }
  const router = useRouter();
  async function share() {
    const appUrl = window.location.origin;
    try {
      await navigator.clipboard.writeText(`${appUrl}/products/${product.code}`);
      pub('Product link copied', 'success');
    }
    catch (err) {
      console.error('Failed to copy: ', err);
      pub('Failed to copy product link', 'warning');
    }
  }


  return (
    <Card sx={{
      maxWidth: 400,
      width: '320px',
      borderRadius: 2, boxShadow: 3, display: 'flex', flexWrap: 'wrap'
    }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" width={'100%'} sx={{
        marginTop: '20px',
        mx: '26px',
      }}>
        {/* Product Image */}
        <CardMedia
          component="img"
          image="/iphone-blue.png" // Replace with the actual image path
          alt="Product Image"
          sx={{ height: 180, width: '40%', objectFit: 'contain' }}
        />
        {/* Product Details */}
        <Box sx={{ width: '59%', pl: 2, pr: 1 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              fontSize: '16px',
              wordWrap: 'break-word',
            }}>
            {detail.name}
          </Typography>
          <Typography variant="body2" color={theme.palette.text.thirdary} gutterBottom>
            {trimString(detail.description, 40)}
          </Typography>
          {/* Rating */}
          <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
            <Rating name="size-medium" defaultValue={4} value={detail?.rating} />
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h5" fontWeight="bold" color="green" >
              ₫{detail.price * detail.discountPercent}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{
              color: theme.palette.text.disabled,
              textDecoration: 'line-through'
            }}>
              ₫{detail.price}
            </Typography>
          </Box>

          {/* Countdown Timer and Stock Status */}
          <Box display="flex" alignItems="center" sx={{
            padding: '0',
            flexWrap: 'wrap',
          }}>
            <CountDownDisplay targetTime={targetTime} />
          </Box>
        </Box>
      </Box>
      {/* Action Icons */}
      <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mt: 0, mx: '70px', width: '100%' }}>
        <Checkbox checked={fav} onChange={onFavChange} size="medium" sx={{ background: '#EEEEEE', borderRadius: '50%' }}>
          <FavoriteBorderIcon sx={{ color: theme.palette.text.primary, fontSize: '18px' }} />
        </Checkbox>
        <IconButton onClick={share} size="medium" sx={{ background: '#EEEEEE', borderRadius: '50%' }}>
          <ShuffleIcon sx={{ color: theme.palette.text.primary, fontSize: '18px' }} />
        </IconButton>
        <IconButton onClick={() => { router.push(`/products/${product.code}`) }} size="medium" sx={{ background: '#EEEEEE', borderRadius: '50%' }}>
          <VisibilityIcon sx={{ color: theme.palette.text.primary, fontSize: '18px' }} />
        </IconButton>
        <IconButton size="medium" sx={{ background: '#EEEEEE', borderRadius: '50%' }}>
          <ShoppingCartIcon sx={{ color: theme.palette.text.primary, fontSize: '18px' }} />
        </IconButton>
      </Stack>
      {images?.length > 0 && <ProductSelector images={images} />}
      <Box sx={{
        my:1,
        width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <Box sx={{width:'60%'}} display="flex" alignItems="center" justifyContent="space-between" gap={1} mt={1}>
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
      </Box>

    </Card>
  );
}
