import { Box, Typography, Paper, Grid2, Avatar, Stack, useTheme, Divider } from '@mui/material';
import SummaryCard from '@shared-src/SummaryCard';
import totalOrder from '@shared-public/profile-dashboard-total-orders.png';
import pendingOrder from '@shared-public/profile-dashboard-pending-orders.png';
import completedOrder from '@shared-public/profile-dashboard-completed-orders.png';
import { UIAssets } from '@shared-src/UIAssets';
import ReadOnlyTable from '@components/table/usecases/ReadOnlyTable';
export default function Customer() {
    const theme = useTheme();
    return (
        <>
            <UIAssets.InfoCard title={'Customer Information'} sx={{ mt: 2 }}>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', gap: 8 }}>
                    <Stack>
                        <UIAssets.InfoAvatarGroup title={'Phong'} subtitle={'none'} />
                        <UIAssets.InfoLine label={'Name'} value={'Muhammed Nabeel'} />
                        <UIAssets.InfoLine label={'Email'} value={'phong@gmail.com'} />
                        <UIAssets.InfoLine label={'Phone'} value={'+923000000000'} />
                        <UIAssets.InfoLine label={'Date of Birth'} value={'12-12-1999'} />

                    </Stack>
                    <Stack >
                        <Typography variant="h6" fontFamily={'Public Sans'} fontWeight={theme.fontWeight.semiBold}>
                            Addresses</Typography>
                        <UIAssets.InfoLine label={'Name'} value={'221B Baker Street, London, Britain,Earth'} />
                        <UIAssets.InfoLine label={'Name'} value={'221B Baker Street, London, Britain,Earth'} />
                        <UIAssets.InfoLine label={'Name'} value={'221B Baker Street, London, Britain,Earth'} />
                        <UIAssets.InfoLine label={'Name'} value={'221B Baker Street, London, Britain,Earth'} />
                    </Stack>
                </Box>
            </UIAssets.InfoCard>
            <Box my={1}/>
            <ReadOnlyTable/>

        </>
    )
}
