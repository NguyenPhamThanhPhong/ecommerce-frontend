import { Box, Grid2, Typography, Button, IconButton, TextField, Paper, useTheme, Avatar, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FlatNumberInput from '@components/inputs/FlatNumberInput';
import { DetailDivider } from '@components/product/ProductUIAssets';
import SuccessModal from '@components/SuccessModal';

const TrashButton = ({ theme }) => (
  <Box sx={{
    textAlign: 'center',
    display: 'inline-flex',
    border: `1px solid ${theme.palette.outline.primary}`,
    padding: '4px',
    cursor: 'pointer'
  }}>
    <Avatar src="/trash.svg"
      variant='square'
      sx={{
        width: '28px', height: '28px',

        objectFit: 'contain'
      }}
    />
  </Box>
)
const CartOrderItem = ({  item, fontWeight }) => (
  <Box sx={{
    display: 'flex', justifyContent: 'space-between',
    fontSize: 16,
    mb: 2
  }}>
    <Typography>{item.label}</Typography>
    <Typography sx={{ fontWeight: fontWeight }}>{item.value}</Typography>
  </Box>
)

const cartData = [
  {
    title: 'I Phone 15Pro',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. sit amet, consectetur adipiscing elit. sit amet, consectetur adipiscing elit. sit amet, consectetur adipiscing elit. sit amet, consectetur adipiscing elit.',
    price: 159.99,
    quantity: 2,
  },
  {
    title: 'I Phone 15Pro',
    desc: 'This is IPHONE 15 16 17, sit amet, consectetur adipiscing elit. sit amet, consectetur adipiscing elit. sit amet, consectetur adipiscing elit. sit amet, consectetur adipiscing elit.',
    price: 159.99,
    quantity: 2,
  }
]

const cartOrderData = [
  {
    label: 'Price',
    value: '$319.98'
  },
  {
    label: 'Discount',
    value: '$31.9'
  },
  {
    label: 'Shipping',
    value: 'Free'
  },
  {
    label: 'Coupon Applied',
    value: '$0.00'
  },
]
const summaries = [

  {
    label: 'TOTAL',
    value: '$288.08'
  },
  {
    label: 'Estimated Delivery by',
    value: '01 Feb, 2023'
  }
]

const successModalSumaries = [
  {
    label: 'Payment Type',
    value: 'Net Banking'
  },
  {
    label: 'Phone number',
    value: '099999999'
  },
  {
    label: 'Email',
    value: 'abc123@gmail.com'
  },
  {
    label: 'Transaction id',
    value: '9999999999'
  },
  {
    label: "Amount Paid",
    value: '$288.08'
  }
]


export default function Cart() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); }

  const modalContent = (
    <Stack sx={{ fontFamily: 'lato', px: '15px' }}>
      {
        successModalSumaries.map((item, index) => (
          <CartOrderItem key={index} item={item} />
        ))
      }
    </Stack>
  )
  const onQuantityChange = (id,value) => {
    cartData[id].quantity = value;
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
          {cartData.map((item, index) => (
            <Box key={index} sx={{ padding: 2, marginBottom: 2, display: 'flex', }}>
              {/* Image */}
              <Box sx={{ width: 100, height: 100, marginRight: 2 }}>
                <Avatar
                  variant='square'
                  src="/iphone-green.jpg"
                  alt="IPhone 15Pro"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </Box>
              {/* Details */}
              <Box flexGrow={1} sx={{ flex: 1 }} fontFamily={'lato'}>
                <Typography variant="h6" fontFamily={'lato'}>{item.title}</Typography>
                <Typography variant="body2" color="textThirdary" mb={1} fontFamily={'lato'} fontSize={16}>
                  {item.desc}
                </Typography>
                <Typography variant="body1" color="success.main">
                  In Stock
                </Typography>
                {/* Quantity and Actions */}
                <Box display={'flex'} sx={{
                  justifyContent: 'space-between',
                }}>
                  <Stack direction={'row'}>
                    <FlatNumberInput key={index} initialValue={item.quantity} id={index} onChange={onQuantityChange}  />
                    {/* Delete and Price */}
                    <TrashButton theme={theme} />
                  </Stack>
                  <Box>
                    <Typography variant="body1" fontWeight={theme.fontWeight.thin} fontSize={10} fontFamily={'lato'} >Total of 2 items</Typography>
                    <Typography variant="h6" fontWeight={theme.fontWeight.bold} fontSize={19} fontFamily={'lato'}>$159.99</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
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
              {
                cartOrderData.map((item, index) => (
                  <CartOrderItem key={index} item={item} />
                ))
              }
              <DetailDivider />
              {
                summaries.map((item, index) => (
                  <CartOrderItem key={index} item={item} fontWeight={'bold'} />))
              }
              <Stack direction={'row'} mb={1.5}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Coupon Code"
                // slotProps={{
                //   input: {
                //     endAdornment: 
                //   }
                // }}
                />
                <Button variant="contained" >✓</Button>
              </Stack>
              <Button variant="contained" color="primary" onClick={handleOpen} fullWidth sx={{
                height: '52px',
              }}>
                Proceed to Checkout
              </Button>
              <SuccessModal open={open} onClose={handleClose} 
              status='success' title='Successful Payment'
              content={modalContent} />
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
}
