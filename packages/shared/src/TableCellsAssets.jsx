import * as React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import {
    Button,
    Chip,
    Checkbox,
    Table, TableBody, TableCell, TableContainer,
    TablePagination,
    TableRow,
    Stack,
    IconButton

} from '@mui/material';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { UIAssets } from './UIAssets';
import { ChipVariants, ProcessChip, ShippedChip, SuccessChip } from './StatusChips';

export const cellVariants = {
    "text": TextCell,
    "avatar": AvatarCell,
    "chip": ChipCell,
    "button": ButtonCell,
    "icons": CellIcons,
}

export function CellIcons({ onEdit, onView, onDelete }) {
    return (
        <TableCell padding='none' align="left">
            <Stack direction={'row'} sx={{
                bgcolor:'pink',
                ml:0
            }} >
                <IconButton><EditIcon /></IconButton>
                <IconButton><VisibilityIcon /></IconButton>
                <IconButton><DeleteIcon /></IconButton>
            </Stack>
        </TableCell>
    )
}

export function CellCheckbox({ isItemSelected, labelId }) {
    return (
        <TableCell padding="checkbox">
            <Checkbox
                color="primary"
                checked={isItemSelected}
                inputProps={{
                    'aria-labelledby': labelId,
                }} />
        </TableCell>
    )
}

export function TextCell({ label }) {
    const theme = useTheme();
    return (
        <TableCell  sx={{
            fontWeight: theme.fontWeight.semiBold,
        }}>
            {label}
        </TableCell>
    )
}

export function NumberCell({ label }) {
    return (
        <TableCell align="left">
            <Typography variant="body1" color='#667085' fontWeight="bold" >
                {label}
            </Typography>
        </TableCell>
    )
}

export function AvatarCell({ src, title, subtitle }) {
    return (
        <TableCell
            component="th"
            // id={labelId}
            scope="row">
            <UIAssets.InfoAvatarGroup
                avatarProp={{
                    variant: 'square',
                    src: src || "/banner1.png",
                    sx: {
                        borderRadius: '10px',
                        objectFit: 'contain',
                        width: '50px', height: '50px',
                    }
                }}
                boxSx={{
                    marginLeft: '10px'
                }}
                title={title || 'john'} subtitle={subtitle} />
        </TableCell>
    )
}

export function ChipCell({ status, label }) {
    return (
        <TableCell align="left">
            {/* <SuccessChip label={'Delivered'}/> */}
            {ChipVariants[status]({ label })}
            {/* <ShippedChip label="Shipped" /> */}
        </TableCell>
    )
}

export function ButtonCell({ label, onClick }) {
    return (
        <TableCell align="left">
            <Button sx={{
                backgroundColor: 'black',
                width: '70px',
                fontWeight: theme.fontWeight.medium,
                color: 'white',
            }} onClick={onClick}>{label}</Button>
        </TableCell>
    )
}

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