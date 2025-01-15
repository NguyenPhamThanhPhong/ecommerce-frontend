import {
  Box, Stack,
  Paper, Typography, Divider,
  IconButton,
  useTheme,
  Avatar,
  CircularProgress
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { ProcessChip, SuccessChip } from '@shared-src/StatusChips';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ReadOnlyTable from '@components/table/usecases/ReadOnlyTable';
import { UIAssets } from '@shared-src/UIAssets';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import DiscountIcon from '@mui/icons-material/Discount';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { fromIsoToSimpleDate, toLocaleString, toLocaleFixedString, toPercentage } from '@shared-utils/ConverterUtils';
import { calculateCouponApplied } from '@shared-utils/CalculationUtils';
import { useRouter } from 'next/router';
import { getOrder } from '@shared-api/Orders';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';


export function PaperLine({ label, value, icon, title }) {
  const theme = useTheme();
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontWeight: theme.fontWeight.medium,
    }}>
      <Stack direction={'row'} gap={1} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ height: 40, width: 40, backgroundColor: '#F0F1F3' }}>
          {icon}
        </Avatar>
        <Typography variant="body1" fontSize={16}>{label}</Typography>
      </Stack>
      <Typography variant="body1" fontSize={16}>{value}</Typography>
    </Box>
  )
}

export function InfoPaper({ title, children }) {
  return (
    <Paper elevation={3} sx={{
      p: 2,
      width: '31%',
      minWidth: '280px'
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        {title}
      </Box>
      <Divider sx={{ my: 1, }} />
      <Stack gap={2} >
        {children}
      </Stack>
    </Paper>
  )
}
export function AddressPaper({ title, addresses, width, children }) {
  const avatarProp = {
    children: <LocationOnIcon sx={{ color: "#667085" }} />,
    sx: {
      width: 40, height: 40,
      backgroundColor: '#F0F1F3'
    }
  }

  return (
    <Paper elevation={3} sx={{
      p: 2,
      width: width || '31%',
      minWidth: '280px'
    }}>
      <Stack gap={2} >
        {children}
      </Stack>
    </Paper>
  )
}

const columns = [
  { id: 'id', label: 'ID', minWidth: 80 },
  { id: 'product', label: 'Product', minWidth: 100 },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 60,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'price',
    label: 'Gross Price',
    minWidth: 100,
    align: 'right',
    format: (value) => toLocaleString(value),
  },
  {
    id: 'discount',
    label: 'Discount',
    minWidth: 60,
    align: 'right',
    format: (value) => value + '%',
  },
  {
    id: 'total',
    label: 'Total',
    minWidth: 100,
    align: 'right',
    format: (value) => toLocaleFixedString(value),
  },
];

// const order = {
//   "id": "12345",
//   "code": 302011,
//   "createdAt": "2021-09-01T12:00:00Z",
//   "deletedAt": null,
//   "address": "123 Main St, Anytown, USA",
//   "notes": "Leave at the front door",
//   "totalValue": 150.75,
//   "coupon": {
//     "id": "550e8400-e29b-41d4-a716-446655440000",
//     "code": "DISCOUNT10",
//     "usageLimit": 100,
//     "description": "10% off your order",
//     "currentUsage": 10,
//     "couponType": "Percentage",
//     "value": 10.00,
//     "startDate": "2021-01-01T00:00:00Z",
//     "endDate": "2021-12-31T23:59:59Z"
//   },
//   "payment": {
//     "accountId": "550e8400-e29b-41d4-a716-446655440000",
//     "status": "COMPLETED",
//     "paymentMethod": "Credit Card",
//     "amount": 150.75
//   },
//   "profile": {
//     "fullName": "John Doe",
//     "avatarUrl": "http://example.com/avatar.jpg",
//     "phone": "555-1234",
//     "dateOfBirth": "1980-01-01T00:00:00Z",
//     "primaryAddress": "123 Main St, Anytown, USA",
//     "addresses": {
//       "home": "123 Main St, Anytown, USA",
//       "work": "456 Work St, Anytown, USA"
//     }
//   },
//   "orderDetails": [
//     {
//       "product": {
//         "id": "98765",
//         "code": 1001,
//         "createdAt": "2021-08-01T12:00:00Z",
//         "name": "Product 1",
//         "brand": {
//           "id": "1",
//           "name": "Brand A"
//         },
//         "category": {
//           "id": "10",
//           "name": "Category X"
//         },
//         "status": "AVAILABLE",
//         "availableDate": "2021-08-01T12:00:00Z",
//         "thumbnailUrl": "http://example.com/product1.jpg",
//         "discountPercent": 5.00,
//         "quantity": 2,
//         "price": 50.00,
//         "stock": 100,
//         "description": "Description of Product 1"
//       },
//       "quantity": 2
//     }
//   ]
// }

const rows = [
  createData('India', 'IN', 12, 1956475, 0.215),
  createData('China', 'CN', 12, 1956475, 0.215),
  createData('Italy', 'IT', 12, 1956475, 0.2),
  createData('United States', 'US', 1, 1956475, 0.2),
  createData('Canada', 'CA', 5, 1956475, 0.2),

];

function createData(id, product, quantity, price, discount) {
  const total = quantity * price;
  return { id, product, quantity, price, discount, total };
}


// const calculationRows = [
//   {
//     price: 'Gross Price',
//     total: 15,
//   },
//   {
//     price: 'Coupon Applied',
//     total: 0.00,
//   },
//   {
//     price: 'Net Total',
//     total: 731.25,
//   },
// ]

export default function Detail() {
  const theme = useTheme();
  const router = useRouter();
  const { orderCode } = router.query;
  const [order, setOrder] = useState(null);
  const pub = useSnackbarStore(state => state.pub);
  useEffect(() => {
    if (orderCode) {
      getOrder(orderCode, pub).then((res) => {
        setOrder(res);
      })
    }
  }, [])
  if (order === null) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    )
  }
  const totalPurchases = order?.orderDetails?.reduce((acc, item) => acc + item.quantity, 0);
  const totalValue = order?.orderDetails?.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
  const profile = order?.profile;
  const orderDetails = order?.orderDetails;
  const payment = order?.payment;





  return (
    <Box sx={{
      display: 'flex',
      fontFamily: theme.fontFamily.publicSans,
      justifyContent: 'space-between',
    }}>
      <Stack width={'100%'} sx={{
        gap: 4,
      }}>
        <Box sx={{
          width: '100%',
          flexWrap: 'wrap',
          display: 'flex', justifyContent: 'space-between',
        }}>
          <InfoPaper title={
            <Stack direction='row' gap={2}>
              <Typography variant="h6">Order #302011</Typography>
              <ProcessChip label="Processing" />
            </Stack>} >
            <PaperLine label="Total value" value={order?.totalValue} icon={<LocalAtmIcon sx={{ color: "#667085" }} />} />
            <PaperLine label="Discount" value={order?.coupon?.code} icon={<DiscountIcon sx={{ color: "#667085" }} />} />
            <PaperLine label="Date" value={order?.createdAt} icon={<ScheduleIcon sx={{ color: "#667085" }} />} />
          </InfoPaper>
          <InfoPaper title={
            <Stack direction='row' gap={2}>
              <Typography variant="h6">Payment</Typography>
            </Stack>} >
            <PaperLine label="Total purchases" value={totalPurchases} icon={<ShoppingCartIcon sx={{ color: "#667085" }} />} />
            <PaperLine label="Payment method" value={payment?.paymentMethod} icon={<AccountBalanceIcon sx={{ color: "#667085" }} />} />
            <PaperLine label="Payment status" value={payment?.status} icon={<LocalAtmIcon sx={{ color: "#667085" }} />} />
          </InfoPaper>
          <InfoPaper title={
            <Stack direction='row' gap={2}>
              <Typography variant="h6">Customer</Typography>
            </Stack>} >
            <PaperLine label="Name" value={profile?.fullName} icon={<AssignmentIndIcon sx={{ color: "#667085" }} />} />
            <PaperLine label="Phone" value={profile?.phone} icon={<LocalPhoneIcon sx={{ color: "#667085" }} />} />
            <PaperLine label="Date of Birth" value={fromIsoToSimpleDate(profile?.dateOfBirth)} icon={<CalendarMonthIcon sx={{ color: "#667085" }} />} />
          </InfoPaper>
        </Box>
        <Box sx={{
          width: '100%',
          flexWrap: 'wrap',

          display: 'flex', justifyContent: 'space-between',
        }}>
          <Paper elevation={2} sx={{
            width: '66%'
          }}>
            <Stack direction={'row'} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ p: 2 }}>Order Items</Typography>
              <SuccessChip label={'+2 Orders'} />
            </Stack>
            <ReadOnlyTable columns={columns} rows={
              order?.orderDetails?.map((item,index) => {
                const product = item.product;
                return {
                  id: index+1,
                  product: product.name,
                  quantity: item.quantity,
                  price: product.price,
                  discount: product.discountPercent,
                  total: item.quantity * product.price
                }
              })
            } calculationRows={[
              {
                price: 'Gross Price',
                total: totalValue,
              },
              {
                price: 'Coupon Applied',
                total: calculateCouponApplied(order),
              },
              {
                price: 'Net Total',
                total: order?.totalValue,
              },
            ]} />
          </Paper>
          <AddressPaper >
            <Typography variant="h6">Addresses</Typography>
            <Divider sx={{ mt: 1, }} />
            <Stack gap={1} sx={{
            }}>
              <UIAssets.InfoAvatarGroup
                subtitle={order?.address}
                boxSx={{ ml: 2 }}
                avatarProp={{
                  children: <LocationOnIcon sx={{ color: "#667085" }} />,
                  sx: {
                    width: 40, height: 40,
                    backgroundColor: '#F0F1F3'
                  }
                }}
                title="Shipping Address" addresses={'aaa'} />
              <UIAssets.InfoAvatarGroup
                avatarProp={{
                  children: <TextSnippetIcon sx={{ color: "#667085" }} />,
                  sx: {
                    width: 40, height: 40,
                    backgroundColor: '#F0F1F3'
                  }
                }}
                subtitle={order?.notes}
                boxSx={{ ml: 2 }}
                title="Notes" addresses={'aaa'} />
            </Stack>
          </AddressPaper>

        </Box>
      </Stack>

    </Box>
  )
}
