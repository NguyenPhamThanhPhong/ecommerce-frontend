import * as React from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
    IconButton,
    Checkbox,
    Typography, useTheme
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


function SortableHeader({ headCell: column, orderBy, order, createSortHandler, handleResizeStart, }) {
    const isActive = orderBy === column.id;
    return (
        <Box
            display="flex"
            // alignItems={'flex-end'}
            // justifyContent={'flex-end'}
            onClick={createSortHandler(column.id)}
            sx={{
                position: 'relative',
                cursor: 'pointer', userSelect: 'none',
                // backgroundColor: getRandomHexColor(),
                // bgcolor: 'pink'
            }}
        >
            <Typography variant="body1" component="span" mr={1} sx={{
            }}>
                {column.label}
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
            {
                column.resizable && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '15px',
                            height: '100%',
                            cursor: 'col-resize',
                        }}
                        onMouseDown={handleResizeStart(column.id)}
                    >
                        ||
                    </Box>
                )
            }

        </Box>
    );
}

export default function EnhancedTableHead(props) {
    const { columns, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, handleResizeStart, columnWidths } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const theme = useTheme();

    return (
        <TableHead
            sx={{
                backgroundColor: '#F2F4F5',
                color: '#475156', fontSize: 16, fontWeight: theme.fontWeight.semiBold,
                width: '100%',
                resize: 'horizontal',
            }}>

            <TableRow >
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {columns.map((column) => {
                    return (
                        (
                            <TableCell
                                key={column.id}
                                align={column.numeric ? 'right' : 'left'}
                                padding={column.disablePadding ? 'none' : 'normal'}
                                sortDirection={orderBy === column.id ? order : false}
                                sx={{
                                    // backgroundColor: getRandomHexColor(),
                                    minWidth: '10px',
                                    width: (column.id === 'none' ? '10px' : columnWidths[column.id]) || 'auto',
                                    position: 'relative',
                                }}>
                                <Box>
                                    <SortableHeader handleResizeStart={handleResizeStart}
                                        headCell={column} order={order} orderBy={orderBy} createSortHandler={createSortHandler}
                                    />
                                </Box>
                            </TableCell>
                        )
                    )
                }
                )}
            </TableRow>
        </TableHead>
    );
}
