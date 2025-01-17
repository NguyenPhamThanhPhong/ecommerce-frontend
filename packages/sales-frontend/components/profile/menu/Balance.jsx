import { Avatar, Box, ListItem, Pagination, Paper, Stack, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ProfileAssets } from '@components/profile/assets/ProfileAssets';
import { useOrderSelfContext } from '@shared-conntext/OrderContext';
import CollapsibleTable from '@components/profile/assets/table/ProfileTransactionTable';
import { getSelfOrders } from '@shared-api/Orders';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';

export default function Balance() {
    const theme = useTheme();
    const [orders, setOrders] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const pub = useSnackbarStore(state => state.pub);
    useEffect(() => {
        getSelfOrders({ page: 0, size: 3, sort: 'createdAt,desc' }, pub).then((res) => {
            if (res) {
                setOrders(res.data);
                setTotalPages(res.totalPages);
            }
        });
    }, []);

    return (
        <Stack width={'80%'} flexGrow={1}>
            <Paper elevation={1}>
                <Box display={'flex'} justifyContent={'space-between'}
                    alignItems={'center'} p={2}>
                    <ProfileAssets.InfoAvatarGroup
                        alignItems={'center'}
                        avatarProp={{
                            src: '/profile-balance-1.png',
                            sx: { width: 90, height: 90 }
                        }}
                        boxSx={{ ml: 2 }}
                        titleSx={{
                            fontSize: 36, fontWeight: 'bold', lineHeight: 1.2
                        }}
                        subtitleSx={{
                            fontSize: 18, fontWeight: 'medium', lineHeight: 1.2
                        }}
                        title={'₫15000'} subtitle={'Your Wallet Balance'} />
                    <ProfileAssets.Button variant="contained" wrapperSx={{
                        mt: 0,
                    }} buttonSx={{
                        borderRadius: '8px',
                        fontSize: 16,
                    }}>Withdraw</ProfileAssets.Button>
                </Box>
            </Paper>
            <Paper elevation={1} sx={{ mt: 2 }}>
                <CollapsibleTable orders={orders}
                />
            </Paper>
            <Paper>
                <Pagination count={totalPages} variant="outlined" shape="rounded"
                    size='medium' siblingCount={1} boundaryCount={1}
                    page={page}
                    onChange={(event, page) => {
                        setPage(page);
                        getSelfOrders({ page: page-1, size: 3, sort: 'createdAt,desc' }, pub).then((res) => {
                            if (res) {
                                setOrders(res.data);
                            }
                        });
                    }}
                    sx={{
                        mt: 2,
                        mb:1,
                        justifyContent: 'flex-end',
                        '& .MuiPagination-ul': {
                            justifyContent: 'flex-end',
                        },
                        // minWidth:'300px',
                        '& .MuiPaginationItem-root': {
                            backgroundColor: '#E9E9E9',
                            borderRadius: '8px',
                            fontSize: 15,
                            '&:hover': {
                                backgroundColor: '#000000',
                                color: '#FFFFFF',
                            },
                        },
                        '& .Mui-selected': {
                            fontWeight: theme.fontWeight.semiBold,
                            backgroundColor: '#000000',
                            color: '#FFFFFF',
                        }
                    }}
                />
            </Paper>

        </Stack>
    )
}
