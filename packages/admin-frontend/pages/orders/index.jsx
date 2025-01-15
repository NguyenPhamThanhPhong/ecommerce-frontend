import OrderTable from '@components/table/usecases/OrderTable';
import {
  Button,
  Box, Stack, Typography, Avatar, Divider,
  useTheme,
  Paper,
  InputBase,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Download } from '@mui/icons-material';
import { AdminButtonGroups } from '@components/common/AdminButtonGroups';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { COMPARISONS, createFilter, JOIN_CONDITIONS, TYPES } from '@shared-api/constants/Filters';
import { deleteOrder, searchOrders } from '@shared-api/Orders';
import { useRouter } from 'next/router';
import { isNumeric } from '@shared-utils/ValidationUtils';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';


const ORDER_STATUSES = {
  NONE: 'NONE',
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  // CANCELED: 'CANCELED',
  DELETED: 'DELETED',
}
const variants = [
  {
    id: ORDER_STATUSES.NONE,
    display: 'None',
  },
  {
    id: ORDER_STATUSES.PENDING,
    display: 'PENDING',
  },
  {
    id: ORDER_STATUSES.DELETED,
    display: 'DELETED',
  },
  {
    id: ORDER_STATUSES.PAID,
    display: 'PAID',
  },
]

export default function index() {
  const theme = useTheme();
  const [orders,setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(ORDER_STATUSES.NONE);
  const [modalFilters, setModalFilters] = useState({});
  const pub = useSnackbarStore(state => state.pub);
  function calculateFiltersFromStatus() {
    if (status === ORDER_STATUSES.NONE) {
      return [createFilter(JOIN_CONDITIONS.AND, null, 'deletedAt',
        TYPES.milisecs, COMPARISONS.IS_NULL, 0, false)];
    }
    if (status === ORDER_STATUSES.PENDING) {
      return [createFilter(JOIN_CONDITIONS.AND, 'payment', 'status',
        TYPES.string, COMPARISONS.EQUAL, ORDER_STATUSES.PENDING, false)];
    }
    if (status === ORDER_STATUSES.PAID) {
      return [createFilter(JOIN_CONDITIONS.AND, 'payment', 'status',
        TYPES.string, COMPARISONS.EQUAL, ORDER_STATUSES.PAID, false)];
    }
    if (status === ORDER_STATUSES.FAILED) {
      return [createFilter(JOIN_CONDITIONS.AND, 'payment', 'status',
        TYPES.bigDecimal, COMPARISONS.EQUAL, ORDER_STATUSES.FAILED, false)];
    }
    if (status === ORDER_STATUSES.DELETED) {
      return [createFilter(JOIN_CONDITIONS.AND, null, 'deletedAt',
        TYPES.milisecs, COMPARISONS.IS_NOT_NULL, 0, false)];
    }
  }
  function calculateFilters() {
    let filters = [];
    if (search?.length > 0 && search !== '') {
      filters.push(createFilter(JOIN_CONDITIONS.OR, 'profile', 'fullName',
        TYPES.string, COMPARISONS.LIKE, search, false));
        filters.push(createFilter(JOIN_CONDITIONS.OR, 'profile', 'phone',
          TYPES.string, COMPARISONS.LIKE, search, false));
    }
    const { date, price, } = modalFilters;
    if (date) {
      const { from, to, condition } = date;
      let realCondition = JOIN_CONDITIONS.AND;
      if (condition === JOIN_CONDITIONS.OR) {
        realCondition = JOIN_CONDITIONS.OR;
      }
      if (from) {
        filters.push(createFilter(realCondition, null, 'createdAt',
          TYPES.date, COMPARISONS.GREATER_OR_EQUAL, from, false));
      }
      if (to) {
        filters.push(createFilter(realCondition, null, 'createdAt',
          TYPES.date, COMPARISONS.LESS_OR_EQUAL, to, false));
      }
    }

    if (price) {
      const { from, to, condition } = price;
      let realCondition = JOIN_CONDITIONS.AND;
      if (condition === JOIN_CONDITIONS.OR) {
        realCondition = JOIN_CONDITIONS.OR;
      }
      if (isNumeric(from) && from > 0) {
        filters.push(createFilter(realCondition, null, 'totalValue',
          TYPES.bigDecimal, COMPARISONS.GREATER_OR_EQUAL, from, false));
      }
      if (isNumeric(to) && to < 100_000_000) {
        filters.push(createFilter(realCondition, null, 'totalValue',
          TYPES.bigDecimal, COMPARISONS.LESS_OR_EQUAL, to, false));
      }
    }
    filters = [...filters, ...calculateFiltersFromStatus()];
    return filters;
  }

  function handleApplyFilters(filters) {
    setModalFilters(filters);
  }

  function deleteRow(id) {
    deleteOrder(id, pub).then((res) => {
        if (res?.status === 200) {
            const newOrders = staffs.filter((product) => product.id !== id);
            setStaffs({ data: newOrders });
        }
    });
}

  function submit() {
    const filters = calculateFilters();
    searchOrders({ page: 0, size: 40, }, filters, pub).then((data) => {
      if (data) {
        setOrders(data.data);
      }
    });
  }

  return (
    <Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between', mb: 1
      }}>
        <Paper
          component="form"
          sx={{ display: 'flex', alignItems: 'center', width: 400 }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find something..."
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton onClick={submit} type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <AdminButtonGroups variant={status} onChange={(e) => setStatus(e.target.value)} variants={variants} />
        <Stack direction='row' gap={3} sx={{
        }}>
          <Button startIcon={<Download />} sx={{
            backgroundColor: '#f4ecfb', height: 40,
            fontWeight: theme.fontWeight.semiBold,
            px: 2,
          }}>
            Export
          </Button>
        </Stack>
      </Box>
      <OrderTable getFilters={setModalFilters} orders={orders} onDelete={deleteRow} />
    </Box>
  )
}
