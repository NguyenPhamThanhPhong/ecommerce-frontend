import { Box, Typography, Paper, Grid2, Avatar, Stack, useTheme, Divider } from '@mui/material';
import SummaryCard from '@shared-src/SummaryCard';
import totalOrder from '@shared-public/profile-dashboard-total-orders.png';
import pendingOrder from '@shared-public/profile-dashboard-pending-orders.png';
import completedOrder from '@shared-public/profile-dashboard-completed-orders.png';
import { UIAssets } from '@shared-src/UIAssets';
import ReadOnlyTable from '@components/table/usecases/ReadOnlyTable';
import StaffFormUI from '@components/forms/ui/StaffFormUI';
export default function Staff() {
    const theme = useTheme();
    return (
        <StaffFormUI isUpdate={true} />
    )
}
