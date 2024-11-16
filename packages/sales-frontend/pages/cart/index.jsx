import { Box, Grid2, Typography, Button, IconButton, TextField, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Cart() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cart <Typography component="span" variant="h6">2 ITEMS</Typography>
      </Typography>

      <Grid2 container spacing={4}>
        {/* Left Side: Cart Items */}
        <Grid2 item xs={12} md={8}>
          {[1, 2].map((item, index) => (
            <Paper key={index} sx={{ padding: 2, marginBottom: 2, display: 'flex', alignItems: 'center' }}>
              {/* Image */}
              <Box sx={{ width: 100, height: 100, marginRight: 2 }}>
                <img
                  src="/iphone-15pro.jpg"
                  alt="IPhone 15Pro"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </Box>
              {/* Details */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">I Phone 15Pro</Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
                <Typography variant="body1" color="success.main">
                  In Stock
                </Typography>
              </Box>
              {/* Quantity and Actions */}
              <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
                <IconButton color="primary">
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1" sx={{ paddingX: 1 }}>
                  1
                </Typography>
                <IconButton color="primary">
                  <AddIcon />
                </IconButton>
              </Box>
              {/* Delete and Price */}
              <Box sx={{ textAlign: 'center' }}>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
                <Typography variant="body1">$149.99</Typography>
              </Box>
            </Paper>
          ))}
        </Grid2>

        {/* Right Side: Order Summary */}
        <Grid2 item xs={12} md={4}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
              <Typography>Price</Typography>
              <Typography>$319.98</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
              <Typography>Discount</Typography>
              <Typography>$31.9</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
              <Typography>Shipping</Typography>
              <Typography>Free</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <Typography>Coupon Applied</Typography>
              <Typography>$0.00</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <Typography variant="h6">TOTAL</Typography>
              <Typography variant="h6">$288.08</Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Estimated Delivery by <strong>01 Feb, 2023</strong>
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Coupon Code"
              sx={{ marginBottom: 2 }}
              InputProps={{ endAdornment: <Button variant="contained">✓</Button> }}
            />
            <Button variant="contained" color="primary" fullWidth>
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
}
