import CategoryBrandTable from '@components/table/usecases/CategoryBrandTable'
import {
  Button,
  Box, Stack,
  useTheme,
  Paper,
  InputBase,
  IconButton
} from '@mui/material'
import { v4 } from 'uuid';
import { Download } from '@mui/icons-material';
import { AdminButtonGroups } from '@components/common/AdminButtonGroups';
import OrderTable from '@components/table/usecases/OrderTable';
import { AddOrderButton } from '@shared-src/ButtonAssets';
import UserTable from '@components/table/usecases/UserTable';
import { useState } from 'react';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { COMPARISONS, createFilter, JOIN_CONDITIONS, TYPES } from '@shared-api/constants/Filters';
import { deleteAccount, searchAccounts } from '@shared-api/Accounts';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import { deleteCategory } from '@shared-api/Categories';




const CATEGORY_STATUSES = {
  NONE: 'NONE',
  UNACTIVE: 'UNACTIVE',
  ACTIVE: 'ACTIVE',
  DELETED: 'DELETED',
}

const variants = [
  {
    id: CATEGORY_STATUSES.NONE,
    display: 'None',
  },
  {
    id: CATEGORY_STATUSES.DELETED,
    display: 'DELETED',
  },

]

export default function Category() {
  const router = useRouter();
  const theme = useTheme();
  const [categories, setCategories] = useState({ data: [] });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(CATEGORY_STATUSES.NONE);

  const pub = useSnackbarStore(state => state.pub);

  function calculateFilterDeletedAt(isNull) {
    return createFilter(JOIN_CONDITIONS.AND, null, 'deletedAt',
      TYPES.date, isNull ? COMPARISONS.IS_NULL : COMPARISONS.IS_NOT_NULL, 0, false);
  }
  function calculateFiltersFromStatus() {
    if (status === CATEGORY_STATUSES.NONE) {
      return [calculateFilterDeletedAt(true)];
    }
    if (status === CATEGORY_STATUSES.DELETED) {
      return [calculateFilterDeletedAt(false)];
    }
  }

  function calculateFilters() {
    let filters = [];
    if (search?.length > 0 && search !== '') {
      filters.push(createFilter(JOIN_CONDITIONS.AND, null, 'name',
        TYPES.string, COMPARISONS.LIKE, search, false));
      filters.push(createFilter(JOIN_CONDITIONS.OR, null, 'description',
        TYPES.string, COMPARISONS.LIKE, search, false));
    }
    filters = [...filters, ...calculateFiltersFromStatus()];
    return filters;
  }
  function submit() {
    const filters = calculateFilters();
    searchAccounts({ page: 0, size: 40, }, filters, pub).then((data) => {
      if (data) {
        setCategories(data);
      }
    });
  }
  function deleteRow(id) {
    deleteCategory(id, pub).then((res) => {
      if (res) {
        const newProducts = products.data.filter((product) => product.id !== id);
        setCategories({ data: newProducts });
      }
    });
  }
  function deleteMultiple(selected) {
    selected.forEach((id) => {
      deleteCategory(id, pub).then((res) => {
        if (res) {
          const newProducts = products.data.filter((product) => product.id !== id);
          setCategories({ data: newProducts });
        }
      });
    });
  }
  return (
    <Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
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
          <AddOrderButton label={'Add New Customer'} />
        </Stack>
      </Box>
      <CategoryBrandTable onView={(code) => router.push(`/categories/${code}`)}
        onEdit={(code) => router.push(`/categories/${code}`)}
        onDelete={(id)=>deleteRow(id)} label={'Categories'} />
    </Box>
  )
}
