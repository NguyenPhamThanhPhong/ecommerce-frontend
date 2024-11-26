

import { Card, CardMedia, CardContent, Typography, Box, Avatar, IconButton, Badge, Stack, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import ShuffleIcon from '@mui/icons-material/Shuffle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';

import { useTheme } from '@mui/material/styles';

export default function HotSaleCard() {
  const theme = useTheme();

  const countDowns = ['02', '02', '02'];
  const [index, setIndex] = useState(0);
  const items = [
    "/path/to/image1.jpg",
    "/path/to/image2.jpg",
    "/path/to/image3.jpg",
    "/path/to/image4.jpg",
    "/path/to/image4.jpg",
    "/path/to/image4.jpg"

  ];

  const handleNext = () => {
    if (index < items.length - 3) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };



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
            iPhone 15 Pro
          </Typography>
          <Typography variant="body2" color={theme.palette.text.thirdary} gutterBottom>
            Lorem Ipsum Dolor Sit Consriet...
          </Typography>

          {/* Rating */}
          <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
            {Array(4).fill().map((_, index) => (
              <StarIcon key={index} sx={{ color: '#FFD700', fontSize: 18 }} />
            ))}
            <StarIcon sx={{ color: '#E0E0E0', fontSize: 18 }} />
          </Box>

          {/* Price and Discount */}
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h5" fontWeight="bold" color="green" sx={{
              display: 'inline'
            }}>
              ₹15000
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{
              color: theme.palette.text.disabled,
              textDecoration: 'line-through'
            }}>
              ₹25000
            </Typography>
          </Box>

          {/* Countdown Timer and Stock Status */}
          <Box display="flex" alignItems="center" sx={{
            padding: '0',
            flexWrap: 'wrap', 
          }}>
            <Typography variant="body2" color="text.primary" sx={{
              display: 'inline',
              mr: 1, fontWeight: 'bold',
              width: '40px',
              textAlign: 'left',
              fontSize: '10px',
            }}>12 days</Typography>
            <Box display="inline-flex" gap={0.5}>
              {
                countDowns.map((countDown, index) => (
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
            </Box>

          </Box>
          <Typography variant="body2" color="green" sx={{
            fontSize: '12px',
            mt: '0.5em',
          }}>In Stock</Typography>
        </Box>
      </Box>

      {/* Action Icons */}
      <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mt:0, mb: 2, mx: '70px', width: '100%' }}>
        <IconButton size="medium" sx={{ background: '#EEEEEE', borderRadius: '50%' }}>
          <FavoriteBorderIcon sx={{ color: theme.palette.text.primary, fontSize: '18px' }} />
        </IconButton>
        <IconButton size="medium" sx={{ background: '#EEEEEE', borderRadius: '50%' }}>
          <ShuffleIcon sx={{ color: theme.palette.text.primary, fontSize: '18px' }} />
        </IconButton>
        <IconButton size="medium" sx={{ background: '#EEEEEE', borderRadius: '50%' }}>
          <VisibilityIcon sx={{ color: theme.palette.text.primary, fontSize: '18px' }} />
        </IconButton>
        <IconButton size="medium" sx={{ background: '#EEEEEE', borderRadius: '50%' }}>
          <ShoppingCartIcon sx={{ color: theme.palette.text.primary, fontSize: '18px' }} />
        </IconButton>
      </Stack>


      {/* Product Image Carousel */}
      <Box display="flex" justifyContent="center" alignItems="center" gap={2} sx={{
        marginLeft: '26px',
        marginRight: '26px',
        marginBottom: '16px',
      }}>
        <IconButton onClick={handlePrev} disabled={index === 0}><ChevronLeftIcon /></IconButton>
        <Box sx={{ overflow: 'hidden', width: 'calc(48px * 3 + 2 * 8px)', position: 'relative' }}>
          <Box
            sx={{
              display: 'flex',
              transition: 'transform 0.5s ease',
              transform: `translateX(-${index * (48 + 8)}px)`, // 48px width + 8px gap
              width: `${items.length * (48 + 8)}px`
            }}
          >
            {items.map((src, i) => (
              <Avatar key={i} variant="rounded" src={src} sx={{ width: 48, height: 48, flexShrink: 0, marginRight: i < items.length - 1 ? '8px' : '0' }} />
            ))}
          </Box>
        </Box>
        <IconButton onClick={handleNext} disabled={index >= items.length - 3}><ChevronRightIcon /></IconButton>
      </Box>
    </Card>
  );
}
