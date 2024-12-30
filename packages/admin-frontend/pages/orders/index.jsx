import {
  Button,
  Box, Stack, 
  useTheme
} from '@mui/material'
import { v4 } from 'uuid';
import { Download } from '@mui/icons-material';
import { AdminButtonGroups } from '@components/common/AdminButtonGroups';
import OrderTable from '@components/table/usecases/OrderTable';
import { AddOrderButton } from '@shared-src/ButtonAssets';

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
          <AddOrderButton />
        </Stack>
      </Box>
      <OrderTable />
    </Box>
  )
}
