import AdminTable from "@components/table/AdminTable";
const staticData = [
    createData("8bdaae98-849b-4710-b8f3-1e4b2964ad92", 'Product 1', 100, 10, 20, 'In Progress'),
    createData("5476e382-8e90-4ed4-bdc9-73abb73d4fef", 'Product 2', 200, 20, 30, 'Completed'),
    createData("1d84afe3-0fb4-4513-943f-9edaf06992b3", 'Product 3', 300, 30, 40, 'Pending'),
  ];
function createData(id, product, date, customer, total, status) {
    return {
        id: id,
        product,
        date,
        customer,
        total,
        status,
    };
}
function fromDataToRow({ id, product, date, customer, total, status }) {
    return {
        id: id,
        colId: {
            label: id,
            variant: 'text',
        },
        product: {
            variant: 'avatar',
            title: product?.title,
            subtitle: product?.subtitle,
            src: product?.avatar,
        },
        date: {
            variant: 'text',
            label: date,
        },
        customer: {
            variant: 'text',
            label: customer,
        },
        total: {
            label: total,
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
        id: 'ORDER ID',
        numeric: false,
        disablePadding: false,
        label: 'Order Id',
        resizable: true,
    },
    {
        id: 'product',
        numeric: false,
        disablePadding: false,
        label: 'Product',
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
        id: 'customer',
        numeric: false,
        disablePadding: false,
        label: 'Customer',
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

export default function OrderTable() {

    return (
        <AdminTable dataMapper={fromDataToRow} data={staticData} columns={columns} />
    )
}
