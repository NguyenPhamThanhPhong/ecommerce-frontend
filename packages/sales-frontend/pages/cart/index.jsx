import { Box, Grid2, Typography, Button, IconButton, TextField, Paper, useTheme, Avatar, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FlatNumberInput from '@components/inputs/FlatNumberInput';
import { DetailDivider } from '@components/product/ProductUIAssets';
import SuccessModal from '@components/modal/SuccessModal';
import { useRouter } from 'next/router';
import CartItem from '@components/cards/CartItem';
import { useEffect } from 'react';
import { getProducts } from '@shared-api/Products';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { getCoupon } from '@shared-api/Coupons';


const CartOrderItem = ({ label, value, fontWeight }) => (
  <Box sx={{
    display: 'flex', justifyContent: 'space-between',
    fontSize: 16,
    mb: 2
  }}>
    <Typography>{label}</Typography>
    <Typography sx={{ fontWeight: fontWeight }}>{value}</Typography>
  </Box>
)
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
  const pub = useSnackbarStore((state) => state.pub);
  const [open, setOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [coupon, setCoupon] = React.useState('');
  const [gross, setGross] = React.useState(0);
  const [couponApplied, setCouponApplied] = React.useState(0);
  const [totalItems, setTotalItems] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); }

  const onQuantityChange = (id, value) => {
    cartData[id].quantity = value;
  }
  useEffect(() => {
    if (localStorage) {
      const cartStr = localStorage.getItem('cart');
      if (cartStr) {
        const cart = JSON.parse(cartStr);
        if (cart?.coupon) {
          setCoupon(cart.coupon);
        }
        if (cart?.items) {
          let ids = [];
          cart.items.forEach(item => {
            ids.push(item.id);
          });
          // MAP: ID: QUANTITY -> [PRODUCTS WITH QUANTITY]
          getProducts(ids, pub).then((response) => {
            if (response) {
              let products = response.data;
              for (let i = 0; i < products.length; i++) {
                products[i].quantity = cart.items[i].quantity;
              }
              setCartItems(products);
            }
          });
        }
      }
    }
  }, [])
  useEffect(() => {
    if (cartItems?.length) {
      let totalItems = 0;
      let gross = 0;
      cartItems.forEach(item => {
        gross += item.price * item.quantity;
        totalItems += item.quantity
      });
      setGross(gross);
      setTotalItems(totalItems);
    }
  }, [cartItems])
  useEffect(() => {
    setTotal(gross - couponApplied);
  }, [couponApplied, gross])

  function handleGetPaymentLink() {
    const bankCode = 'ICICI';
    const amount = 1000;
    getPaymentUrl(bankCode, amount, pub).then((response) => {
      if (response) {
        const url = response.data.url;
        window.location.href = url;
      }
      else {
        handleClose();
      }
    })
  }
  function checkCoupon(coupon) {
    getCoupon(coupon, pub).then((response) => {
      if (response) {
        setCouponApplied(gross * (1 - response.data.value));
      }
    })
  }

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
          {cartItems.map((item, index) => (
            <CartItem key={item.id} title={item?.name} desc={item?.description}
              price={item?.price || 0} quantity={item?.quantity || 0} discount={item?.discount || 0}
              index={index} onQuantityChange={onQuantityChange} />
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
              <CartOrderItem label={'After Discount'} value={totalItems} fontWeight={'bold'} />
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
                onConfirm={handleGetPaymentLink} onCancel={handleClose}
                status='success' title='Checkout your payment'
                content={<ModalContent gross={gross} total={total} totalItems={totalItems}
                  coupon={coupon} couponApplied={couponApplied} />} />
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
}
