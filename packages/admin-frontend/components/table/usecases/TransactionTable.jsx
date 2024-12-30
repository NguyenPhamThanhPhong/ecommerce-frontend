// import AdminTable from "@components/table/AdminTable";
// import { trimString } from "@shared-utils/ConverterUtils";

// const doomAvatar = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200';
// const anotherAvatar = 'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109?s=300';

// const staticData = [
//     createData(1, 'John Doe', doomAvatar, 'john.doe@example.com', '555-1234', 15, 'Active', new Date()),
//     createData(2, 'Jane Smith', anotherAvatar, 'jane.smith@example.com', '555-5678', 4, 'Blocked',  new Date('2023-12-05')),
//     createData(3, 'David Lee', anotherAvatar, 'david.lee@example.com', '555-9012', '1978-10-28', 'Active',new Date('2023-11-18')),
//     // Add more data entries as needed
// ];

// const statuses = {
//     'Active': {
//         variant: 'chip',
//         status: 'success',
//         label: 'Active',
//     },
//     'Blocked': {
//         variant: 'chip',
//         status: 'error',
//         label: 'Blocked',
//     },
// }
// function createData(id, name, username, avatar, email, phone, amount, type, date) {
//     return {
//         id,
//         name,
//         username,
//         avatar,
//         email,
//         phone,
//         amount,
//         type,
//         date
//     };
// }
// function fromDataToRow({ id, name, avatar, email, phone, dateOfBirth, status, availableDate }) {
//     console.log('availableDate', availableDate)
//     return {
//         id: id,
//         colId: {
//             label: id,
//             variant: 'text',
//         },
//         name: {
//             variant: 'avatar',
//             title: name,
//             src: avatar,
//         },
//         email: {
//             variant: 'text',
//             label: email,
//         },
//         phone: {
//             variant: 'text',
//             label: phone,
//         },
//         dateOfBirth: {
//             label: dateOfBirth,
//             variant: 'text',
//         },
//         status: statuses[status],
//         availableDate: {
//             label: availableDate,
//             variant: 'text',
//         },
//         none: {
//             variant: 'icons',
//         },
//     }
// }
// const columns = [
//     {
//         id: 'id',
//         numeric: false,
//         disablePadding: false,
//         label: 'Id',
//         resizable: true,
//     },
//     {
//         id: 'name',
//         numeric: false,
//         disablePadding: false,
//         label: 'Name',
//         resizable: true,

//     },
//     {
//         id: 'email',
//         numeric: false,
//         disablePadding: false,
//         label: 'Email',
//         resizable: true,

//     },
//     {
//         id: 'phone',
//         numeric: false,
//         disablePadding: false,
//         label: 'Phone',
//         resizable: true,

//     },
//     {
//         id: 'dob',
//         numeric: false,
//         disablePadding: false,
//         label: 'Date of Birth',
//         resizable: true,
//     },
//     {
//         id: 'status',
//         numeric: false,
//         disablePadding: false,
//         label: 'Status',
//         resizable: true,
//     },
//     {
//         id: 'createdAt',
//         numeric: false,
//         disablePadding: false,
//         label: 'added',
//         resizable: true,
//     },
//     {
//         id: 'none',
//         numeric: false,
//         disablePadding: false,
//         label: 'Action',
//         width: 10,
//     },
// ];

// export default function UserTable() {

//     return (
//         <AdminTable dataMapper={fromDataToRow} data={staticData} columns={columns} />
//     )
// }
