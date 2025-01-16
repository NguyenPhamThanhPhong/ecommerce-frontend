import AdminTable from "@components/table/AdminTable";
import { trimString } from "@shared-utils/ConverterUtils";
import { isDateBetween } from "@shared-utils/ValidationUtils";
import { useRouter } from "next/router";

const doomAvatar = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200';
const anotherAvatar = 'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109?s=300';

const staticData = [
    createData('1111-1111-11', 1, 'John Doe', doomAvatar, 'john.doe@example.com', '555-1234', '1990-01-15', 'Active', '2023-11-20', new Date()),
    createData('1111-1111-12', 2, 'Jane Smith', anotherAvatar, 'jane.smith@example.com', '555-5678', '1985-07-04', 'Unactive', '2023-12-05', new Date('2023-12-05')),
    createData('1111-1111-13', 3, 'David Lee', anotherAvatar, 'david.lee@example.com', '555-9012', '1978-10-28', 'Active', '2023-11-18', new Date('2023-11-18')),
    // Add more data entries as needed
];

const statuses = {
    'Active': {
        variant: 'chip',
        status: 'success',
        label: 'Active',
    },
    'Unactive': {
        variant: 'chip',
        status: 'error',
        label: 'Unactive',
    },
}
function createData(id, code, name, avatar, email, phone, dateOfBirth, status, availableDate) {
    return {
        id,
        code,
        name,
        avatar,
        email,
        phone,
        dateOfBirth,
        status,
        availableDate
    };
}

const columns = [
    {
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: 'Id',
        resizable: true,
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
        resizable: true,

    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
        resizable: true,

    },
    {
        id: 'phone',
        numeric: false,
        disablePadding: false,
        label: 'Phone',
        resizable: true,

    },
    {
        id: 'dob',
        numeric: false,
        disablePadding: false,
        label: 'Date of Birth',
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
        id: 'createdAt',
        numeric: false,
        disablePadding: false,
        label: 'added',
        resizable: true,
    },
    {
        id: 'none',
        numeric: false,
        disablePadding: false,
        label: 'Action',
        width: 10,
    },
];

export default function UserTable({ label, users, onDelete,onView, onEdit }) {
    const router = useRouter();
    function fromDataToRow({ id, code, name, avatar, email, phone, dateOfBirth, status, availableDate }) {
        return {
            id: id,
            code: code,
            colId: {
                label: code,
                variant: 'text',
            },
            name: {
                variant: 'avatar',
                title: name,
                src: avatar,
            },
            email: {
                variant: 'text',
                label: email,
            },
            phone: {
                variant: 'text',
                label: phone,
            },
            dateOfBirth: {
                label: dateOfBirth,
                variant: 'text',
            },
            status: statuses[status],
            availableDate: {
                label: availableDate,
                variant: 'text',
            },
            none: {
                variant: 'icons',
                onEdit: () => { onEdit(code) },
                onView: () => { onView(code) },
                onDelete: () => { onDelete(id) },
            },
        }
    }
    let myData = []
    if (users?.data) {
        myData = users.data.map((customer) => {
            const profile = customer.profile;
            return createData(customer.id,customer?.code, profile?.fullName,
                profile?.avatarUrl, customer?.email,
                profile?.phone, profile?.dateOfBirth,
                isDateBetween(new Date(), new Date('2023-11-18'), new Date('2023-12-05')) ? 'Active' : 'Unactive',
                `${customer?.enableDate} - ${customer?.disableDate}`);
        }
        );
    }

    return (
        <AdminTable label={label}  
            dataMapper={fromDataToRow} data={myData} columns={columns} />
    )
}
