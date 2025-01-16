import { Box, Typography, Paper, Grid2, Avatar, Stack, useTheme, Divider, CircularProgress } from '@mui/material';
import SummaryCard from '@shared-src/SummaryCard';
import totalOrder from '@shared-public/profile-dashboard-total-orders.png';
import pendingOrder from '@shared-public/profile-dashboard-pending-orders.png';
import completedOrder from '@shared-public/profile-dashboard-completed-orders.png';
import { UIAssets } from '@shared-src/UIAssets';
import ReadOnlyTable from '@components/table/usecases/ReadOnlyTable';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAccount } from '@shared-api/Accounts';

const orderPage = {
    data: [
        {
            "id": "12345",
            "code": 302011,
            "createdAt": "2021-09-01T12:00:00Z",
            "deletedAt": null,
            "address": "123 Main St, Anytown, USA",
            "status": "PAID",
            "notes": "Leave at the front door",
            "totalValue": 150.75,
            "payment": {
                "accountId": "550e8400-e29b-41d4-a716-446655440000",
                "status": "PAID",
                "paymentMethod": "Credit Card",
                "amount": 150.75
            }
        },
    ]
}

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
// const customer = {
//     "id": "550e8400-e29b-41d4-a716-446655440000",
//     "code": 1001,
//     "email": "user@example.com",
//     "enableDate": "2021-01-01T00:00:00Z",
//     "disableDate": null,
//     "isVerified": true,
//     "role": "USER",
//     "profile": {
//         "fullName": "John Doe",
//         "avatarUrl": "http://example.com/avatar.jpg",
//         "phone": "555-1234",
//         "dateOfBirth": "1980-01-01T00:00:00Z",
//         "primaryAddress": "home",
//         "addresses": {
//             "home": "123 Main St, Anytown, USA",
//             "work": "456 Work St, Anytown, USA"
//         }
//     },
//     "favoriteProducts": [
//         "550e8400-e29b-41d4-a716-446655440001",
//         "550e8400-e29b-41d4-a716-446655440002"
//     ]
// }
const columns = [
    { id: 'id', label: 'ID', minWidth: 80 },
    {
        id: 'createdAt',
        label: 'Created At',
        minWidth: 100,
        align: 'right',
        format: (value) => value,
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 60,
        align: 'right',
        format: (value) => value,
    },
    {
        id: 'method',
        label: 'Payment method',
        minWidth: 60,
        align: 'right',
        format: (value) => value === 'Payment' ? 'Vnpay' : 'Cash',
    },
    {
        id: 'totalValue',
        label: 'Gross Price',
        minWidth: 100,
        align: 'right',
        format: (value) => toLocaleString(value),
    },
    {
        id: 'discount',
        label: 'Discount',
        minWidth: 60,
        align: 'right',
        format: (value) => value + '%',
    },
    {
        id: 'total',
        label: 'Net Total',
        minWidth: 100,
        align: 'right',
        format: (value) => toLocaleFixedString(value),
    },

];

export default function Customer() {
    const theme = useTheme();
    const [customer, setCustomer] = useState(null);
    const [orders, setOrders] = useState(null);
    const [rows, setRows] = useState([])
    const router = useRouter();
    const { customerCode } = router.query;
    useEffect(() => {
        if (customerCode) {
            getAccount(customerCode).then((res) => {
                if (res) {
                    setCustomer(res);
                }
            });
        }
    }, [])
    useEffect(() => {
        if (customer?.order) {
            const newRows = customer.order.map((order) => {
                return {
                    id: order.code,
                    createdAt: order.createdAt,
                    status: order.status,
                    method: order.payment.paymentMethod,
                    totalValue: order.totalValue,
                    discount: order.discount,
                    total: order.total,
                }
            }) 
            setRows(newRows);
        }
    }, [customer])

    if (customer === null || customer === undefined) {
        return <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <CircularProgress />
            <Typography variant="h6">Loading...</Typography>
        </Box>
    }

    const profile = customer.profile;

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
                        <UIAssets.InfoLine label={'Name'} value={profile?.fullName} />
                        <UIAssets.InfoLine label={'Email'} value={customer?.email} />
                        <UIAssets.InfoLine label={'Phone'} value={profile?.phone} />
                        <UIAssets.InfoLine label={'Date of Birth'} value={profile?.dateOfBirth} />
                    </Stack>
                    <Stack >
                        <Typography variant="h6" fontFamily={'Public Sans'} fontWeight={theme.fontWeight.semiBold}>
                            Addresses</Typography>
                        {
                            profile?.primaryAddress && profile?.addresses && (
                                <UIAssets.InfoLine label={'Primary Address'} value={
                                    profile?.addresses[''] || 'Ha noi'} />
                            )
                        }
                        {
                            profile?.addresses && Object.keys(profile.addresses).map((key, index) => (
                                <UIAssets.InfoLine key={index} label={key} value={profile.addresses[key]} />
                            ))
                        }
                    </Stack>
                </Box>
            </UIAssets.InfoCard>
            <Typography variant="h6 " mt={3} fontFamily={'Public Sans'} fontWeight={theme.fontWeight.semiBold}>
                Recent Orders
            </Typography>
            <ReadOnlyTable columns={columns} rows={rows} />
        </>
    )
}
