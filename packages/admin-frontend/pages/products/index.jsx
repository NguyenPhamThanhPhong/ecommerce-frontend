import ProductTable from '@components/table/usecases/ProductTable';
import {   ToggleButtonGroup, ToggleButton,
  Button,
  Box, Stack, Typography, Avatar, Divider,
  useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Download } from '@mui/icons-material';
import { AdminButtonGroups } from '@components/common/AdminButtonGroups';

export default function Product() {
  const theme = useTheme();
  const variants = [
    {
      id: 'All',
      display: 'All',
    },
    {
      id: 'Published',
      display: 'Published',
    },
    {
      id: 'LowStock',
      display: 'Low Stock',
    },
    {
      id: 'Draft',
      display: 'Draft',
    },
    {
      id: 'OutofStock',
      display: 'Out of Stock',
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
    <ProductTable />
  </Box>
  )
}
