import AdminTable from "@components/table/AdminTable";

const staticData = [
    createData(1, 'SUMMER2024', 20, 500, 100, '2024-06-15 00:00:00', '2024-09-30 23:59:59', 'ACTIVE', '2024-06-10 10:30:00'),
    createData(2, 'WELCOME10', 10, 100, 50, '2024-01-01 00:00:00', '2024-12-31 23:59:59', 'ACTIVE', '2024-01-01 00:00:00'),
    createData(3, 'BLACKFRIDAY', 30, 200, 150, '2024-11-29 00:00:00', '2024-11-30 23:59:59', 'INACTIVE', '2024-11-28 15:00:00'),
    // Add more data entries as needed
  ];
  
const statuses = {
    'Active': {
        variant: 'chip',
        status: 'success',
        label: 'Active',
    },
    'Expired': {
        variant: 'chip',
        status: 'error',
        label: 'Expired',
    },
}
function createData(id, code, discount, upperBound, minimumRequirement, availableTime, expiry, status, createdAt) {
    return {
        id: id,
        code,
        discount,
        upperBound,
        availableTime,
        expiry,
        minimumRequirement,
        status,
        createdAt
    };
}
function fromDataToRow({id, code, discount, upperBound, minimumRequirement, availableTime, expiry, status, createdAt}) {
    return {
        id: id,
        colId: {
            label: code,
            variant: 'text',
        },
        discount: {
            variant: 'text',
            label: discount,
        },
        upperBound: {
            variant: 'text',
            label: upperBound,
        },
        minimumRequirement: {
            label: minimumRequirement,
            variant: 'text',
        },
        availableTime: {
            label: availableTime,
            variant: 'text',
        },
        expiry: {
            label: expiry,
            variant: 'text',
        },
        status: {
            variant: 'chip',
            status: 'success',
        },
        none: {
            variant: 'icons',
        }
    }
}
const columns = [
    {
        id: 'code',
        numeric: false,
        disablePadding: false,
        label: 'Code',
        resizable: true,
    },
    {
        id: 'discount',
        numeric: false,
        disablePadding: false,
        label: 'Discount',
        resizable: true,
    },
    {
        id: 'upperBound',
        numeric: false,
        disablePadding: false,
        label: 'Upper Bound',
        resizable: true,
    },
    {
        id: 'minimumRequirement',
        numeric: false,
        disablePadding: false,
        label: 'Minimum Requirement',
        resizable: true,
    },
    {
        id: 'availableTime',
        numeric: false,
        disablePadding: false,
        label: 'Available Time',
        resizable: true,
    },
    {
        id: 'expiry',
        numeric: false,
        disablePadding: false,
        label: 'Expiry',
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
    }
];

export default function CouponTable() {

    return (
        <AdminTable dataMapper={fromDataToRow} data={staticData} columns={columns} />
    )
}
