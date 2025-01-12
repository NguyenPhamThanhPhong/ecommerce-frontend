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
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

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
  {
    id: PRODUCT_STATUSES.SOLD_OUT,
    display: 'Sold out',
  },

]
export default function Product() {
  const theme = useTheme();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(PRODUCT_STATUSES.NONE);
  function submit() {

  }
  const handleApplyFilters = (filters) => {
    console.log("Applied Filters:", filters);
  };
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
            placeholder="Search Google Maps"
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
      <ProductTable getFilters={handleApplyFilters} />
    </Box>
  )
}
