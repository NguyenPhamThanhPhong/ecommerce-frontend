import CouponTable from '@components/table/usecases/CouponTable'
import AdminTable from '@components/table/AdminTable';
import {
    Button,
    Box, Stack,
    useTheme,
    Paper,
    InputBase,
    IconButton
} from '@mui/material'
import { v4 } from 'uuid';
import { Download } from '@mui/icons-material';
import { AdminButtonGroups } from '@components/common/AdminButtonGroups';
import OrderTable from '@components/table/usecases/OrderTable';
import { AddOrderButton } from '@shared-src/ButtonAssets';
import { useEffect, useState } from 'react';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { searchCoupons, deleteCoupons } from '@shared-api/Coupons';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import { COMPARISONS, createFilter, JOIN_CONDITIONS, TYPES } from '@shared-api/constants/Filters';


const COUPON_STATUSES = {
    ALL: 'ALL',
    ACTIVE: 'ACTIVE',
    EXPRIRED: 'EXPRIRED',
    DELETED: 'DELETED',
    NOT_RELEASE_YET: 'NOT_RELEASE_YET',
}
const variants = [
    {
        id: COUPON_STATUSES.ALL,
        display: 'None',
    },
    {
        id: COUPON_STATUSES.ACTIVE,
        display: 'ACTIVE',
    },
    {
        id: COUPON_STATUSES.NOT_RELEASE_YET,
        display: 'NOT RELEASE YET',
    },
    {
        id: COUPON_STATUSES.EXPRIRED,
        display: 'EXPIRED',
    },
    {
        id: COUPON_STATUSES.DELETED,
        display: 'DELETED',
    },

]

export default function Coupon() {
    const router = useRouter();
    const theme = useTheme();
    const [coupons, setCoupons] = useState([]);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState(COUPON_STATUSES.ALL);

    const pub = useSnackbarStore(state => state.pub);

    useEffect(() => {
        const filters = [];
        searchCoupons({ page: 0, size: 40, }, filters, pub).then((data) => {
            if (data) {
                setCoupons(data?.data);
            }
        });
    }, []);

    function calculateFilterDeletedAt(isNull) {
        return createFilter(JOIN_CONDITIONS.AND, null, 'deletedAt',
            TYPES.milisecs, isNull ? COMPARISONS.IS_NULL : COMPARISONS.IS_NOT_NULL, 0, false);
    }
    function calculateFiltersFromStatus() {
        if (status === COUPON_STATUSES.ALL) {
            return [calculateFilterDeletedAt(true)];
        }
        if (status === COUPON_STATUSES.DELETED) {
            return [calculateFilterDeletedAt(false)];
        }
        if (status === COUPON_STATUSES.ACTIVE) {
            return [calculateFilterDeletedAt(true),
            createFilter(JOIN_CONDITIONS.AND, null, 'startDate',
                TYPES.date, COMPARISONS.LESS_OR_EQUAL, new Date(), false),
            createFilter(JOIN_CONDITIONS.AND, null, 'endDate',
                TYPES.date, COMPARISONS.GREATER_OR_EQUAL, new Date(), false)];
        }
        if (status === COUPON_STATUSES.EXPRIRED) {
            return [calculateFilterDeletedAt(true),
            createFilter(JOIN_CONDITIONS.AND, null, 'endDate',
                TYPES.date, COMPARISONS.LESS_OR_EQUAL, new Date(), false)];
        }
        if (status === COUPON_STATUSES.NOT_RELEASE_YET) {
            return [calculateFilterDeletedAt(true),
            createFilter(JOIN_CONDITIONS.AND, null, 'startDate',
                TYPES.date, COMPARISONS.GREATER_OR_EQUAL, new Date(), false)];
        }
    }

    function calculateFilters() {
        let filters = [];
        if (search?.length > 0 && search !== '') {
            filters.push(createFilter(JOIN_CONDITIONS.OR, null, 'name',
                TYPES.string, COMPARISONS.LIKE, search, false));
            filters.push(createFilter(JOIN_CONDITIONS.OR, null, 'description',
                TYPES.string, COMPARISONS.LIKE, search, false));
        }
        filters = [...filters, ...calculateFiltersFromStatus()];
        return filters;
    }
    function submit() {
        const filters = calculateFilters();
        searchCoupons({ page: 0, size: 40, }, filters, pub).then((data) => {
            if (data) {
                setCoupons(data?.data);
            }
        });
    }
    function deleteRow(id) {
        deleteCoupons(id, pub).then((res) => {
            if (res) {
                const newProducts = products.data.filter((product) => product.id !== id);
                setCoupons({ data: newProducts });
            }
        });
    }
    function deleteMultiple(selected) {
        selected.forEach((id) => {
            deleteCoupons(id, pub).then((res) => {
                if (res) {
                    const newProducts = products.data.filter((product) => product.id !== id);
                    setCoupons({ data: newProducts });
                }
            });
        });
    }

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2
            }}>
                <Paper
                    component="form"
                    sx={{ display: 'flex', alignItems: 'center', width: 400 }}>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Find something..."
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton onClick={submit} type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <AdminButtonGroups variant={status} onChange={(e) => setStatus(e.target.value)} variants={variants} />
                <Stack direction='row' gap={3}>
                    <Button startIcon={<Download />} sx={{
                        backgroundColor: '#f4ecfb', height: 40,
                        fontWeight: theme.fontWeight.semiBold, px: 2,
                    }}>
                        Export
                    </Button>
                    <AddOrderButton onClick={() => router.push(`/coupons/add-coupons`)} label={'Add New Coupon'} />
                </Stack>
            </Box>
            <CouponTable coupons={coupons} onDelete={deleteRow} />
        </Box>
    )
}
