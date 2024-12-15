import * as React from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
    IconButton,

    Typography, useTheme
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { HeadCheckbox } from '@components/profile/assets/table/TableCheckboxes';
import { getRandomHexColor } from '@utils/TestUtils';

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'OrderId',
    },
    {
        id: 'calories',
        numeric: false,
        disablePadding: false,
        label: 'Product',
    },
    {
        id: 'fat',
        numeric: false,
        disablePadding: false,
        label: 'Total',
    },
    {
        id: 'carbs',
        numeric: false,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'protein',
        numeric: false,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'none',
        numeric: false,
        disablePadding: false,
        label: '',
    },
];

function SortableHeader({ headCell, orderBy, order, createSortHandler }) {
    const isActive = orderBy === headCell.id;
    return (
        <Box
            display="flex"
            // alignItems={'flex-end'}
            // justifyContent={'flex-end'}
            onClick={createSortHandler(headCell.id)}
            sx={{
                cursor: 'pointer', userSelect: 'none',
                // backgroundColor: getRandomHexColor(),
                // bgcolor: 'pink'
            }}
        >
            <Typography variant="body1" component="span" mr={1} sx={{
            }}>
                {headCell.label}
            </Typography>
            {isActive && (
                <IconButton size="small" sx={{
                    p: 0,
                    fontWeight: 'bold',
                    color: '#475156'
                }}>
                    {order === 'asc' ? (
                        <ArrowUpwardIcon fontSize="small" />
                    ) : (
                        <ArrowDownwardIcon fontSize="small" />
                    )}
                </IconButton>

            )}

        </Box>
    );
}

export default function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const theme = useTheme();

    return (
        <TableHead sx={{
            backgroundColor: '#F2F4F5',
            color: '#475156', fontSize: 16, fontWeight: theme.fontWeight.semiBold,
            width: '100%',
        }}>
            <TableRow >

                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{
                            // backgroundColor: getRandomHexColor(),
                        }}
                    >
                        <SortableHeader
                            headCell={headCell} order={order} orderBy={orderBy} createSortHandler={createSortHandler}
                        />
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
