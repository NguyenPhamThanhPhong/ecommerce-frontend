import ProductTable from '@components/table/usecases/ProductTable';
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
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { COMPARISONS, createFilter, JOIN_CONDITIONS, TYPES } from '@shared-api/constants/Filters';
import { deleteProduct, searchProducts } from '@shared-api/Products';
import { useRouter } from 'next/router';
import { isNumeric } from '@shared-utils/ValidationUtils';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { AddOrderButton } from '@shared-src/ButtonAssets';

const PRODUCT_STATUSES = {
  NONE: 'NONE',
  PUBLISHED: 'PUBLISHED',
  DRAFT: 'DRAFT',
  ON_SALE: 'ON_SALE',
  SOLD_OUT: 'SOLD_OUT',
}
const variants = [
  {
    id: PRODUCT_STATUSES.NONE,
    display: 'None',
  },
  {
    id: PRODUCT_STATUSES.PUBLISHED,
    display: 'Published',
  },
  {
    id: PRODUCT_STATUSES.DRAFT,
    display: 'Draft',
  },
  {
    id: PRODUCT_STATUSES.ON_SALE,
    display: 'On sale',
  },

]
export default function Product() {
  const theme = useTheme();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(PRODUCT_STATUSES.NONE);
  const [modalFilters, setModalFilters] = useState({});
  const pub = useSnackbarStore(state => state.pub);
  function submit() {
    const filters = calculateFilters();
    searchProducts({ page: 0, size: 40, }, filters, pub).then((data) => {
      if (data?.data?.length > 0) {
        setProducts(data.data);
      }
    });
  }

  useEffect(() => {
    const filters = []
    searchProducts({ page: 0, size: 40, }, filters, pub).then((data) => {
      if (data?.data?.length > 0) {
        setProducts(data.data);
      }
    })}, []);

  function calculateFiltersFromStatus() {
    if (status === PRODUCT_STATUSES.NONE) {
      return [];
    }
    if (status === PRODUCT_STATUSES.PUBLISHED) {
      return [createFilter(JOIN_CONDITIONS.AND, null, 'availableDate',
        TYPES.date, COMPARISONS.LESS_OR_EQUAL, new Date(), false)];
    }
    if (status === PRODUCT_STATUSES.DRAFT) {
      return [createFilter(JOIN_CONDITIONS.AND, null, 'availableDate',
        TYPES.date, COMPARISONS.GREATER, new Date(), false)];
    }
    if (status === PRODUCT_STATUSES.ON_SALE) {
      return [createFilter(JOIN_CONDITIONS.AND, null, 'discountPercent',
        TYPES.bigDecimal, COMPARISONS.GREATER, 0, false)];
    }
    if (status === PRODUCT_STATUSES.SOLD_OUT) {
      return [createFilter(JOIN_CONDITIONS.AND, null, 'quantity',
        TYPES.int, COMPARISONS.LESS_OR_EQUAL, 0, false)];
    }

  }

  function calculateFilters() {
    let filters = [];


    if (search?.length > 0 && search !== '') {
      filters.push(createFilter(JOIN_CONDITIONS.AND, null, 'name',
        TYPES.string, COMPARISONS.LIKE, search, false));
    }
    const { date, brand, category, price, quantity } = modalFilters;
    if (date) {
      const { from, to, condition } = date;
      let realCondition = JOIN_CONDITIONS.AND;
      if (condition === JOIN_CONDITIONS.OR) {
        realCondition = JOIN_CONDITIONS.OR;
      }
      if (from) {
        filters.push(createFilter(realCondition, null, 'availableDate',
          TYPES.date, COMPARISONS.GREATER_OR_EQUAL, from, false));
      }
      if (to) {
        filters.push(createFilter(realCondition, null, 'availableDate',
          TYPES.date, COMPARISONS.LESS_OR_EQUAL, to, false));
      }
    }
    if (brand) {
      const { value, condition } = brand;
      if (value?.length > 0 && value !== '') {
        filters.push(createFilter(condition || 'AND', null, 'brandId',
          TYPES.uuid, COMPARISONS.EQUAL, value, false));
      }
    }
    if (category) {
      const { value, condition } = category;
      if (value?.length > 0 && value !== '') {
        filters.push(createFilter(condition || 'AND', null, 'categoryId',
          TYPES.uuid, COMPARISONS.EQUAL, value, false));
      }
    }
    if (price) {
      const { from, to, condition } = price;
      let realCondition = JOIN_CONDITIONS.AND;
      if (condition === JOIN_CONDITIONS.OR) {
        realCondition = JOIN_CONDITIONS.OR;
      }
      if (isNumeric(from) && from > 0) {
        filters.push(createFilter(realCondition, null, 'price',
          TYPES.bigDecimal, COMPARISONS.GREATER_OR_EQUAL, from, false));
      }
      if (isNumeric(to) && to < 100_000_000) {
        filters.push(createFilter(realCondition, null, 'price',
          TYPES.bigDecimal, COMPARISONS.LESS_OR_EQUAL, to, false));
      }
    }
    if (quantity) {
      const { from, to, condition } = quantity;
      let realCondition = JOIN_CONDITIONS.AND;
      if (condition === JOIN_CONDITIONS.OR) {
        realCondition = JOIN_CONDITIONS.OR;
      }
      if (isNumeric(from) && from > 0) {
        console.log('from', from);
        filters.push(createFilter(realCondition, null, 'quantity',
          TYPES.int, COMPARISONS.GREATER_OR_EQUAL, from, false));
      }
      if (isNumeric(to) && to < 100_000_000) {
        filters.push(createFilter(realCondition, null, 'quantity',
          TYPES.int, COMPARISONS.LESS_OR_EQUAL, to, false));
      }
    }
    filters = [...filters, ...calculateFiltersFromStatus()];
    return filters;
  }
  function deleteRow(id) {
    deleteProduct(id, pub).then((res) => {
      if (res) {
        const newProducts = products.data.filter((product) => product.id !== id);
        setProducts({ data: newProducts });
      }
    });
  }
  function deleteMultiple(selected) {
    selected.forEach((id) => {
      deleteProduct(id, pub).then((res) => {
        if (res) {
          const newProducts = products.data.filter((product) => product.id !== id);
          setProducts({ data: newProducts });
        }
      });
    });
  }  
  const handleApplyFilters = (filters) => {
    setModalFilters(filters);
  };
  // console.log('products', products);
  return (
    <Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        mb: 2
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
          <AddOrderButton onClick={()=>router.push(`/products/add-product`)} label={'Add New Product'} />

        </Stack>
      </Box>
      <ProductTable onDelete={deleteRow} products={products} getFilters={handleApplyFilters} />
    </Box>
  )
}
