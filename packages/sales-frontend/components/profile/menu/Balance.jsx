import { Avatar, Box, ListItem, Pagination, Paper, Stack, useTheme } from '@mui/material'
import React from 'react'
import { ProfileAssets } from '@components/profile/assets/ProfileAssets';
import EnhancedTable from '@components/profile/assets/table/ProfileTransactionTable';
import { useOrderSelfContext } from '@shared-conntext/OrderContext';

export default function Balance() {
    const theme = useTheme();
    const {
        orders, totalPage, currentPage, totalInstances, hasPrev, hasNext,
        loadFirstPage,
        loadPage,
        loadNextPage,
        loadPrevPage
    } = useOrderSelfContext();
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
                <EnhancedTable />
            </Paper>
            <Pagination count={100} variant="outlined" shape="rounded"
                size='medium' siblingCount={2} boundaryCount={2}
                sx={{
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
        </Stack>
    )
}
