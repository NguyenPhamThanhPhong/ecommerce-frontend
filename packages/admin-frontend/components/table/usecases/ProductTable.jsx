import ProductFilterModal from "@components/filters/FilterAssets";
import AdminTable from "@components/table/AdminTable";
import { trimString } from "@shared-utils/ConverterUtils";
const staticData = [
    createData("354", 'Product 1', 'Brand A', 'zczvxc', 100, 10, '2024-12-31', 'Published'),
    createData("888", 'Product 2', 'Brand B', 'zczvxc', 200, 20, '2025-01-15', 'Published'),
    createData("444", 'Product 3', 'Brand C', 'zczvxc', 300, 30, '2025-02-28', 'Published'),
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
    'low-stock': {
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

function createData(id,code, product, brand, category, price, quantity, availableDate, status) {
    return {
        id,
        code,
        product,
        brand,
        category,
        price,
        quantity,
        availableDate,
        status,
    };
}
function fromDataToRow({ id,code, product, brand, category, price, quantity, availableDate, status }) {
    return {
        id: id,
        code: code,
        colId: {
            label: code,
            variant: 'text',

        },
        product: {
            variant: 'avatar',
            title: product?.name,
            subtitle: trimString(product?.description || 'none'),
            src: product?.thumbNailUrl,
        },
        brand: {
            variant: 'text',
            label: brand,
        },
        category: {
            variant: 'text',
            label: category,
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
        id: 'ID',
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
        id: 'Category',
        numeric: false,
        disablePadding: false,
        label: 'Category',
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

export default function ProductTable({ getFilters, products }) {
    let mydata = products?.data.map((product) =>
        createData(product.id,product.code, product, product.brand?.name,
            product.category?.name, product?.price || 0,
            product.quantity, product.availableDate, product.status));
    return (
        <AdminTable
            FilterModal={ProductFilterModal}
            handleApplyFilters={getFilters}
            dataMapper={fromDataToRow} data={mydata} columns={columns} />
    )
}
