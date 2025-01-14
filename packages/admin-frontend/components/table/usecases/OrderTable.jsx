import { OrderFilterModal } from "@components/filters/OrderFilterModal";
import AdminTable from "@components/table/AdminTable";
import { trimString } from "@shared-utils/ConverterUtils";
const staticData = [
    createData("8bdaae98-849b-4710-b8f3-1e4b2964ad92",7, 'Product 1', '2025-01-14T15:41:35.016Z', 20, 'In Progress'),
    createData("5476e382-8e90-4ed4-bdc9-73abb73d4fef",7, 'Product 2', '2025-01-14T15:41:35.016Z', 30, 'Completed'),
    createData("1d84afe3-0fb4-4513-943f-9edaf06992b3",7, 'Product 3', '2025-01-14T15:41:35.016Z', 40, 'Pending'),
];
function createData(id,code, profile, date,  total, status) {
    return {
        id: id,
        code,
        profile,
        date,
        total,
        status,
    };
}
function fromDataToRow({ id,code, profile, date,total, status }) {
    return {
        id: id,
        code: code,
        colId: {
            label: code,
            variant: 'text',
        },
        profile: {
            variant: 'avatar',
            title: profile?.fullName,
            subtitle: trimString(profile?.phone, 20),
            src: profile?.avatarUrl,
        },
        date: {
            variant: 'text',
            label: date,
        },
        total: {
            label: total,
            variant: 'text',
        },
        status: {
            variant: 'chip',
            status: 'success',
            label: status,
        },
        none: {
            variant: 'icons',
        }
    }
}
const columns = [
    {
        id: 'ORDER ID',
        numeric: false,
        disablePadding: false,
        label: 'Order Id',
        resizable: true,
    },
    {
        id: 'customer',
        numeric: false,
        disablePadding: false,
        label: 'Customer',
        resizable: true,

    },
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'Date',
        resizable: true,

    },
    {
        id: 'total',
        numeric: false,
        disablePadding: false,
        label: 'Total',
        resizable: true,
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
        resizable: true,
    },
    {
        id: 'none',
        numeric: false,
        disablePadding: false,
        label: '',
        width: 10,
    },
];

export default function OrderTable({ getFilters, orders }) {

    return (
        <AdminTable label={'Orders'}
            FilterModal={OrderFilterModal}
            handleApplyFilters={getFilters}
            dataMapper={fromDataToRow} data={staticData} columns={columns} />
    )
}
