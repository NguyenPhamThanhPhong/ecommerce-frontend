
import * as React from 'react';

import Box from '@mui/material/Box';

import TableCell from '@mui/material/TableCell';

import {
    IconButton,
    Checkbox,
    Typography, useTheme
} from '@mui/material';


export const HeadCheckbox = ({ numSelected, rowCount, onSelectAllClick }) => {
    return (
        <TableCell padding="checkbox">
            <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                sx={{
                    color: 'pink',
                    '&.Mui-checked': {
                        color: 'pink',
                    },
                }}
                inputProps={{
                    'aria-label': 'select all desserts',
                }}
            />
        </TableCell>
    )
}

export const RowCheckbox = ({ isItemSelected, labelId, handleClick }) => {
    return (
        <TableCell padding="normal">
            <Checkbox
                checked={isItemSelected}
                inputProps={{
                    'aria-labelledby': labelId,
                }} sx={{
                    color: '#191C1F'
                }} />
        </TableCell>
    )
}

// export const RowCheckbox = 