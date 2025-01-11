import { Box, Grid2, Typography, Button, IconButton, TextField, Paper, useTheme, Avatar, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FlatNumberInput from '@components/inputs/FlatNumberInput';
import { DetailDivider } from '@components/product/ProductUIAssets';
import SuccessModal from '@components/modal/SuccessModal';
import { useRouter } from 'next/router';
import CartItem from '@components/cards/CartItem';
import { useEffect, useMemo } from 'react';
import { getProducts } from '@shared-api/Products';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { getCoupon } from '@shared-api/Coupons';
import { useGlobalCartContext } from '@shared-conntext/CartContext';
import { useCartForm } from '@components/forms/CartForm';
import { CartOrderItem } from '@components/common/CartOrderItem';
function ModalContent({ gross, totalItems, couponApplied, coupon, total }) {
  return (
    <Stack sx={{ fontFamily: 'lato', px: '15px' }}>
      <CartOrderItem label={'Gross price'} value={gross} fontWeight={'bold'} />
      <CartOrderItem label={'After Discount'} value={totalItems} fontWeight={'bold'} />
      <CartOrderItem label={'Coupon Applied'} value={couponApplied} fontWeight={'bold'} />
      <DetailDivider />
      <Typography variant="h6" gutterBottom fontWeight={'bold'}>
        Coupon: {coupon}
      </Typography>
      <CartOrderItem label={'Total'} value={total} fontWeight={'bold'} />
    </Stack>
  )
}

export default function Cart() {
  const router = useRouter();
  const { query } = router;
  const theme = useTheme();

  const {
    gross, total, couponApplied, quantitiesSum,
    coupon, setCoupon,
    orderDetails,
    onRemoveItem,
    handleOpen, handleClose, open,
    onQuantityChange, checkCoupon, submit
  } = useCartForm();

  // console.log('orderDetails', orderDetails);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={'bold'}>
        Cart <Typography component="span" variant="h6" color={theme.palette.text.cartSubTiltle} fontWeight={theme.fontWeight.thin}>2 ITEMS</Typography>
      </Typography>
      <Grid2 container spacing={4}>
        {/* Left Side: Cart Items */}
        <Grid2 sx={{
          width: '60%',
        }}>
          {orderDetails.map((item, index) => (
            <CartItem key={item.id} id={item?.id} title={item?.name} desc={item?.description}
              image={item?.thumbnailUrl} onRemove={() => onRemoveItem(item.id)}
              price={item?.price || 0} quantity={item?.quantity || 0} discount={item?.discountPercent || 0}
              onQuantityChange={onQuantityChange} />
          ))}
        </Grid2>

        {/* Right Side: Order Summary */}
        <Grid2 sx={{ width: '30%', }}>
          <Paper sx={{ padding: 3 }}>
            <Stack sx={{ fontFamily: 'lato', px: '15px' }}>
              <Typography variant="h6" gutterBottom sx={{
                fontWeight: 'bold',
              }}>
                Order Summary
              </Typography>
              <CartOrderItem label={'Gross price'} value={gross} fontWeight={'bold'} />
              <CartOrderItem label={'Total purchases'} value={quantitiesSum} fontWeight={'bold'} />
              <CartOrderItem label={'Coupon Applied'} value={couponApplied} fontWeight={'bold'} />
              <DetailDivider />
              <CartOrderItem label={'Total'} value={total} fontWeight={'bold'} />
              <Stack direction={'row'} mb={1.5}>
                <TextField
                  fullWidth
                  size="small" onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Coupon Code" />
                <Button variant="contained" onClick={() => checkCoupon(coupon)} >✓</Button>
              </Stack>
              <Button variant="contained" color="primary" onClick={handleOpen} fullWidth sx={{
                height: '52px',
              }}>
                Proceed to Checkout
              </Button>
              <SuccessModal open={open} onClose={handleClose} isConfirm={true} isCancel={true}
                onConfirm={submit} onCancel={handleClose}
                status='success' title='Checkout your payment'
                content={<ModalContent gross={gross} total={total} totalItems={quantitiesSum}
                  coupon={coupon} couponApplied={couponApplied} />} />
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
}
