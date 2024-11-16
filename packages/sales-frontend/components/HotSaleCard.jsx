import { Card, CardMedia, CardContent, Typography, Box, Avatar, IconButton, Badge, Stack, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function HotSaleCard() {
  return (
    <Card sx={{ maxWidth: 400, borderRadius: 2, boxShadow: 3, p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* Product Image */}
        <CardMedia
          component="img"
          image="/path/to/iphone-image.jpg" // Replace with the actual image path
          alt="Product Image"
          sx={{ height: 180, width: '50%', objectFit: 'contain' }}
        />
        
        {/* Product Details */}
        <Box sx={{ flex: 1, pl: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            iPhone 15 Pro Max
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
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
            <Typography variant="h5" fontWeight="bold" color="green">
              ₹15000
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
              ₹25000
            </Typography>
          </Box>

          {/* Countdown Timer and Stock Status */}
          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Typography variant="body2" color="text.primary">12 Days</Typography>
            <Box display="flex" gap={0.5}>
              <Button variant="contained" color="warning" size="small">00:02</Button>
              <Button variant="contained" color="warning" size="small">48</Button>
              <Button variant="contained" color="warning" size="small">24</Button>
            </Box>
          </Box>
          <Typography variant="body2" color="green" mt={1}>In Stock</Typography>
        </Box>
      </Box>

      {/* Action Icons */}
      <Stack direction="row" spacing={1} justifyContent="center" sx={{ my: 2 }}>
        <IconButton><FavoriteBorderIcon /></IconButton>
        <IconButton><ShuffleIcon /></IconButton>
        <IconButton><VisibilityIcon /></IconButton>
        <IconButton><ShoppingCartIcon /></IconButton>
      </Stack>

      {/* Product Image Carousel */}
      <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
        <IconButton><ChevronLeftIcon /></IconButton>
        <Stack direction="row" spacing={1}>
          <Avatar variant="rounded" src="/path/to/image1.jpg" sx={{ width: 48, height: 48 }} />
          <Avatar variant="rounded" src="/path/to/image2.jpg" sx={{ width: 48, height: 48 }} />
          <Avatar variant="rounded" src="/path/to/image3.jpg" sx={{ width: 48, height: 48 }} />
          <Avatar variant="rounded" src="/path/to/image4.jpg" sx={{ width: 48, height: 48 }} />
        </Stack>
        <IconButton><ChevronRightIcon /></IconButton>
      </Box>
    </Card>
  );
}
