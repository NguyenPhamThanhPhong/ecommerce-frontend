import AdminTable from '@components/table/AdminTable';
import {
  ToggleButtonGroup, ToggleButton,
  Button,
  Box, Stack, Typography, Avatar, Divider,
  useTheme
} from '@mui/material'
import { v4 } from 'uuid';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import { Download } from '@mui/icons-material';
import { AdminButtonGroups } from '@components/common/AdminButtonGroups';
import OrderTable from '@components/table/usecases/TableUsecase';

// Function to create data
function createData(id, product, date, customer, total, status) {
  return {
    id: id,
    product,
    date,
    customer,
    total,
    status,
  };
}
function fromDataToRow({ id, product, date, customer, total, status }) {
  return {
    id: id,
    colId: {
      label: id,
      variant: 'text',
    },
    product: {
      variant: 'avatar',
      title: product?.title,
      subtitle: product?.subtitle,
      src: product?.avatar,
    },
    date: {
      variant: 'text',
      label: date,
    },
    customer: {
      variant: 'text',
      label: customer,
    },
    total: {
      label: total,
      variant: 'text',
    },
    status: {
      variant: 'chip',
      status: 'success',
    },
    none: {
      variant: 'icons',
    }
  }
}


const columns = [
  {
    id: 'ORDER ID',
    numeric: false,
    disablePadding: false,
    label: 'Order Id',
    resizable: true,
  },
  {
    id: 'product',
    numeric: false,
    disablePadding: false,
    label: 'Product',
    resizable: true,

  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date',
    resizable: true,

  },
  {
    id: 'customer',
    numeric: false,
    disablePadding: false,
    label: 'Customer',
    resizable: true,

  },
  {
    id: 'total',
    numeric: false,
    disablePadding: false,
    label: 'Total',
    resizable: true,
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
    resizable: true,
  },
  {
    id: 'none',
    numeric: false,
    disablePadding: false,
    label: '',
    width: 10,
  },
];

export default function index() {

  const theme = useTheme();
  const variants = [
    {
      id: 'All',
      display: 'All Status',
    },
    {
      id: 'Processing',
      display: 'Processing',
    },
    {
      id: 'Shipped',
      display: 'Shipped',
    },
    {
      id: 'Delivered',
      display: 'Delivered',
    },
    {
      id: 'Cancelled',
      display: 'Cancelled',
    },

  ]

  return (
    <Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <AdminButtonGroups variants={variants} />
        <Stack direction='row' gap={3} sx={{
        }}>
          <Button startIcon={<Download />} sx={{
            backgroundColor: '#f4ecfb', height: 40,
            fontWeight: theme.fontWeight.semiBold,
            px: 2,
          }}>
            Export
          </Button>
          <Button variant='contained' startIcon={<AddIcon />} sx={{
            height: 40,
            backgroundColor: 'success',
            color: 'white',
            fontWeight: theme.fontWeight.semiBold,
          }}>
            Add Order
          </Button>
        </Stack>
      </Box>
      <OrderTable />
    </Box>
  )
}
