import { Box, Typography, Paper, Grid2, Avatar, Stack, useTheme, Divider } from '@mui/material';
import SummaryCard from '@shared-src/SummaryCard';
import totalOrder from '@shared-public/profile-dashboard-total-orders.png';
import pendingOrder from '@shared-public/profile-dashboard-pending-orders.png';
import completedOrder from '@shared-public/profile-dashboard-completed-orders.png';
import { UIAssets } from '@shared-src/UIAssets';
import ReadOnlyTable from '@components/table/usecases/ReadOnlyTable';
const orderSumaries = [
    {
        color: "#e0f7fa",
        title: "Total Orders",
        value: "154",
        img: totalOrder.src,
    },
    {
        color: "#fff3e0",
        title: "Pending Orders",
        value: "05",
        img: pendingOrder.src,
    },
    {
        color: "#e8f5e9",
        title: "Completed Orders",
        value: "149",
        img: completedOrder.src,
    }
]
export default function Customer() {
    const theme = useTheme();
    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                width: '100%',
                mt: 1,
                gap: '16px'
            }}>
                {
                    orderSumaries.map((order, index) => (
                        <SummaryCard img={order.img} key={index} color={order.color} title={order.title} count={order.value} />
                    ))
                }

            </Box>
            <UIAssets.InfoCard title={'Customer Information'} sx={{ mt: 4 }}>
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
            <Typography variant="h6" mt={3} fontFamily={'Public Sans'} fontWeight={theme.fontWeight.semiBold}>
                Recent Orders
            </Typography>
            <ReadOnlyTable/>

        </>
    )
}
