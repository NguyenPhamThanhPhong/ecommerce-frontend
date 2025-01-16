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
import UserTable from '@components/table/usecases/UserTable';
import { useEffect, useState } from 'react';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { COMPARISONS, createFilter, JOIN_CONDITIONS, TYPES } from '@shared-api/constants/Filters';
import { deleteAccount, searchAccounts } from '@shared-api/Accounts';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';

const CUSTOMER_STATUSES = {
    NONE: 'NONE',
    UNACTIVE: 'UNACTIVE',
    ACTIVE: 'ACTIVE',
    DELETED: 'DELETED',
}
const variants = [
    {
        id: CUSTOMER_STATUSES.NONE,
        display: 'None',
    },
    {
        id: CUSTOMER_STATUSES.UNACTIVE,
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
    const router = useRouter();
    const [customers, setCustomers] = useState({ data: [] });
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState(CUSTOMER_STATUSES.NONE);
    const [modalFilters, setModalFilters] = useState({});
    const pub = useSnackbarStore(state => state.pub);

    useEffect(() => {
        const filters = calculateFilters();
        searchAccounts({ page: 0, size: 40, }, filters, pub).then((data) => {
            if (data?.data?.length > 0) {
                setCustomers(data);
            }
        }
        );
    }, [customers]);

    function calculateFilterDeletedAt(isNull) {
        return createFilter(JOIN_CONDITIONS.AND, null, 'deletedAt',
            TYPES.milisecs, isNull ? COMPARISONS.IS_NULL : COMPARISONS.IS_NOT_NULL, 0, false);
    }

    function calculateFiltersFromStatus() {
        if (status === CUSTOMER_STATUSES.NONE) {
            return [calculateFilterDeletedAt(true)];
        }
        if (status === CUSTOMER_STATUSES.UNACTIVE) {
            return [createFilter(JOIN_CONDITIONS.AND, null, 'enableDate',
                TYPES.date, COMPARISONS.LESS_OR_EQUAL, new Date(), false),
            createFilter(JOIN_CONDITIONS.AND, null, 'disableDate',
                TYPES.date, COMPARISONS.GREATER_OR_EQUAL, new Date(), false),];
        }
        if (status === CUSTOMER_STATUSES.ACTIVE) {
            return [createFilter(JOIN_CONDITIONS.AND, null, 'enableDate',
                TYPES.date, COMPARISONS.GREATER_OR_EQUAL, new Date(), false),
            createFilter(JOIN_CONDITIONS.AND, null, 'disableDate',
                TYPES.date, COMPARISONS.LESS_OR_EQUAL, new Date(), false),
            calculateFilterDeletedAt(true)];
        }
        if (status === CUSTOMER_STATUSES.DELETED) {
            return [calculateFilterDeletedAt(false)];
        }
    }
    function calculateFilters() {
        let filters = [
            createFilter(JOIN_CONDITIONS.AND, null, 'role',
                TYPES.role, COMPARISONS.EQUAL, 'ROLE_CUSTOMER', false),
        ];
        if (search?.length > 0 && search !== '') {
            filters.push(createFilter(JOIN_CONDITIONS.AND, 'profile', 'name',
                TYPES.string, COMPARISONS.LIKE, search, false));
            filters.push(createFilter(JOIN_CONDITIONS.OR, null, 'email',
                TYPES.string, COMPARISONS.LIKE, search, false));
            filters.push(createFilter(JOIN_CONDITIONS.OR, 'profile', 'phone',
                TYPES.string, COMPARISONS.LIKE, search, false));
            filters.push(createFilter(JOIN_CONDITIONS.OR, 'profile', 'address',
                TYPES.string, COMPARISONS.LIKE, search, false));
        }
        filters = [...filters, ...calculateFiltersFromStatus()];
        return filters;
    }
    function submit() {
        const filters = calculateFilters();
        searchAccounts({ page: 0, size: 40, }, filters, pub).then((data) => {
            if (data) {
                setCustomers(data);
            }
        });
    }
    function deleteRow(id) {
        deleteAccount(id, pub).then((res) => {
            if (res) {
                const newProducts = products.data.filter((product) => product.id !== id);
                setCustomers({ data: newProducts });
            }
        });
    }
    function deleteMultiple(selected) {
        selected.forEach((id) => {
            deleteAccount(id, pub).then((res) => {
                if (res) {
                    const newProducts = products.data.filter((product) => product.id !== id);
                    setCustomers({ data: newProducts });
                }
            });
        });
    }


    return (
        <Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
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
                <Stack direction='row' gap={3} sx={{
                }}>
                    <Button startIcon={<Download />} sx={{
                        backgroundColor: '#f4ecfb', height: 40,
                        fontWeight: theme.fontWeight.semiBold,
                        px: 2,
                    }}>
                        Export
                    </Button>
                    <AddOrderButton label={'Add New Customer'} onClick={() => {
                        router.push('/customers/add-customer');
                        console.log('Add new customer');
                    }} />
                </Stack>
            </Box>
            <UserTable onView={(code) => router.push(`customers/${code}`)}
                onEdit={(code) => router.push(`customers/${code}`)}
                users={customers} label={"Customers"} onDelete={deleteRow} />
        </Box>
    )
}
