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
import UserTable from '@components/table/usecases/UserTable';

const CUSTOMER_STATUSES = {
    NONE: 'NONE',
    BLOCKED: 'BLOCKED',
    ACTIVE: 'ACTIVE',
    DELETED: 'DELETED',
}
const variants = [
    {
        id: CUSTOMER_STATUSES.NONE,
        display: 'None',
    },
    {
        id: CUSTOMER_STATUSES.BLOCKED,
        display: 'BLOCKED',
    },
    {
        id: CUSTOMER_STATUSES.DELETED,
        display: 'DELETED',
    },
    {
        id: CUSTOMER_STATUSES.ACTIVE,
        display: 'ACTIVE',
    },
]

export default function Customer() {
    const theme = useTheme();
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
            <UserTable />
        </Box>
    )
}
