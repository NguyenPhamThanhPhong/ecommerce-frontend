import AdminTable from "@components/table/AdminTable";
import { isDateBetween } from "@shared-utils/ValidationUtils";
import { useRouter } from "next/router";

const statuses = {
    'ACTIVE': {
        variant: 'chip',
        status: 'success',
        label: 'Active',
    },
    'INACTIVE': {
        variant: 'chip',
        status: 'error',
        label: 'Expired',
    },
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
        label: 'Usage Limit',
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

export default function CouponTable({ coupons, onDelete, }) {
    let router = useRouter();

    function fromDataToRow({ id, code, discount, upperBound, availableTime,  status, }) {
        return {
            id: id,
            code: code,
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
            availableTime: {
                label: availableTime,
                variant: 'text',
            },

            status: statuses[status],
            none: {
                variant: 'icons',
                onDelete: () => onDelete(id),
                onEdit: () => router.push(`/coupons/${code}`),
                onView: () => router.push(`/coupons/${code}`),
            }
        }
    }
    let myData = [];
    if (coupons?.length > 0) {
        myData = coupons.map((coupon) => {
            const status = isDateBetween(new Date(), coupon.startDate, coupon.endDate) ? 'ACTIVE' : 'INACTIVE';
            return {
                id: coupon.id,
                code: coupon.code,
                discount: coupon.value,
                upperBound: coupon.usageLimit,
                availableTime: coupon.startDate + ' - ' + coupon.endDate,
                status: status,
            }
        })
    }

    return (
        <AdminTable label={'Coupons'} dataMapper={fromDataToRow} data={myData}

            columns={columns} />
    )
}
