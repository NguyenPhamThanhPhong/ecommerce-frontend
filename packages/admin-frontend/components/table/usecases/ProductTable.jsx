import AdminTable from "@components/table/AdminTable";
import { trimString } from "@shared-utils/ConverterUtils";
const staticData = [
    createData("354", 'Product 1', 'Brand A', ['Category 1', 'Category 2'], 100, 10, '2024-12-31', 'Published'),
    createData("888", 'Product 2', 'Brand B', ['Category 3'], 200, 20, '2025-01-15', 'Published'),
    createData("444", 'Product 3', 'Brand C', ['Category 1', 'Category 3'], 300, 30, '2025-02-28', 'Published'),
];

const statuses = {
    'Published': {
        variant: 'chip',
        status: 'success',
        label: 'Published',
    },
    'Draft': {
        variant: 'chip',
        status: 'draft',
        label: 'Draft',
    },
    'low-stock':{
        variant: 'chip',
        status: 'proccess',
        label: 'Low Stock',
    },
    'Out of Stock': {
        variant: 'chip',
        status: 'error',
        label: 'Out of Stock',
    },
    'Deleted': {
        variant: 'chip',
        status: 'error',
        label: 'Deleted',
    },
}

function createData(id, product, brand, categories, price, quantity, availableDate, status) {
    return {
        id,
        product,
        brand,
        categories,
        price,
        quantity,
        availableDate,
        status,
    };
}
function fromDataToRow({id, product, brand, categories, price, quantity, availableDate, status}) {
    return {
        id: id,
        colId: {
            label: id,
            variant: 'text',
        },
        product: {
            variant: 'avatar',
            title: product?.name,
            subtitle: trimString(product?.description|| 'none'),
            src: product?.thumbNailUrl,
        },
        brand: {
            variant: 'text',
            label: brand,
        },
        categories: {
            variant: 'text',
            label: categories,
        },
        price: {
            label: price,
            variant: 'text',
        },
        quantity: {
            label: quantity,
            variant: 'text',
        },
        availableDate: {
            variant: 'text',
            label: availableDate,
        },
        status: statuses[status],
        none: {
            variant: 'icons',
        }
    }
}
const columns = [
    {
        id: 'PRODUCT ID',
        numeric: false,
        disablePadding: false,
        label: 'Product Id',
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
        id: 'brand',
        numeric: false,
        disablePadding: false,
        label: 'Brand',
        resizable: true,

    },
    {
        id: 'categories',
        numeric: false,
        disablePadding: false,
        label: 'Categories',
        resizable: true,

    },
    {
        id: 'price',
        numeric: false,
        disablePadding: false,
        label: 'Price',
        resizable: true,
    },
    {
        id: 'quantity',
        numeric: false,
        disablePadding: false,
        label: 'Quantity',
        resizable: true,
    },
    {
        id: 'availableDate',
        numeric: false,
        disablePadding: false,
        label: 'AvailableDate',
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

export default function ProductTable() {

    return (
        <AdminTable dataMapper={fromDataToRow} data={staticData} columns={columns} />
    )
}
