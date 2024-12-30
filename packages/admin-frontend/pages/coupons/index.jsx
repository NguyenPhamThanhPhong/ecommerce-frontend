import CouponTable from '@components/table/usecases/CouponTable'
import AdminTable from '@components/table/AdminTable';
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

export default function Coupon() {
    const theme = useTheme();
    const variants = [
        {
          id: 'All',
          display: 'All',
        },
        {
          id: 'Active',
          display: 'Active',
        },
        {
          id: 'Blocked',
          display: 'Blocked',
        },]
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
                    <AddOrderButton label={'Add New Customer'} />
                </Stack>
            </Box>
            <CouponTable />
        </Box>
    )
}
