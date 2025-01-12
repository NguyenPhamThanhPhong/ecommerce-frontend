import {
    Box, Typography,
    Stack,
} from "@mui/material";
import { DetailDivider } from '@components/product/ProductUIAssets';


export const CartOrderItem = ({ label, value, fontWeight }) => (
    <Box sx={{
        display: 'flex', justifyContent: 'space-between',
        fontSize: 16,
        mb: 2
    }}>
        <Typography>{label}</Typography>
        <Typography sx={{ fontWeight: fontWeight }}>{value}</Typography>
    </Box>
)

export default function OrderModalContent({ gross, totalItems, couponApplied, coupon, total }) {
    return (
        <Stack sx={{ fontFamily: 'lato', px: '15px' }}>
            <CartOrderItem label={'Gross price'} value={gross} fontWeight={'bold'} />
            <CartOrderItem label={'After Discount'} value={totalItems} fontWeight={'bold'} />
            <CartOrderItem label={'Coupon Applied'} value={couponApplied} fontWeight={'bold'} />
            <DetailDivider />
            <Typography variant="h6" gutterBottom fontWeight={'bold'}>
                Coupon: {coupon}
            </Typography>
            <CartOrderItem label={'Total'} value={total} fontWeight={'bold'} />
        </Stack>
    )
}



export function PaymentModal({ address, notes, totalValue, coupon, }) {
    return (
        <Stack sx={{ fontFamily: 'lato', px: '15px' }}>
            <CartOrderItem label={'Address'} value={address} fontWeight={'bold'} />
            <CartOrderItem label={'Notes'} value={notes} fontWeight={'bold'} />
            <Typography variant="h6" gutterBottom fontWeight={'bold'}>
                Coupon: {coupon}
            </Typography>
            <DetailDivider />
            <CartOrderItem label={'Total payment'} value={totalValue} fontWeight={'bold'} />
        </Stack>
    )
}