import AdminTable from "@components/table/AdminTable";
import { trimString } from "@shared-utils/ConverterUtils";
const staticData = [
    createData("354", 'Product 1', 12, 55, '2024-12-31'),
    createData("888", 'Product 2', 12, 195, '2025-01-15'),
    createData("444", 'Product 3', 12, 45, '2025-02-28'),
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

function createData(id, category, sold, stock, createdAt,) {
    return {
        id,
        category,
        sold,
        stock,
        createdAt,
    };
}
function fromDataToRow({ id, category, sold, stock, createdAt, }) {
    return {
        id: id,
        colId: {
            label: id,
            variant: 'text',
        },
        category: {
            variant: 'avatar',
            title: category?.name,
            subtitle: trimString(category?.description || 'none'),
            src: category?.thumbNailUrl,
        },
        sold: {
            variant: 'text',
            label: sold,
        },
        stock: {
            variant: 'text',
            label: stock,
        },
        createdAt: {
            variant: 'text',
            label: createdAt,
        },
        none: {
            variant: 'icons',
        }
    }
}
const columns = [
    {
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: 'ID',
        resizable: true,
    },
    {
        id: 'category',
        numeric: false,
        disablePadding: false,
        label: 'Name',
        resizable: true,

    },
    {
        id: 'sold',
        numeric: false,
        disablePadding: false,
        label: 'Sold',
        resizable: true,

    },
    {
        id: 'stock',
        numeric: false,
        disablePadding: false,
        label: 'Stock',
        resizable: true,

    },
    {
        id: 'createdAt',
        numeric: false,
        disablePadding: false,
        label: 'Created At',
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

export default function CategoryBrandTable() {

    return (
        <AdminTable dataMapper={fromDataToRow} data={staticData} columns={columns} />
    )
}
