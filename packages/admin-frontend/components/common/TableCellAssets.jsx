import { useTheme } from "@mui/material"
import { SuccessChip } from "@shared-src/StatusChips";
import {ProfileAssets} from '@components/table/UIAssets';

export const CellText = ({ text }) => {
    const theme = useTheme();
    return (
        <TableCell padding="normal" sx={{
            fontWeight: theme.fontWeight.semiBold,
        }}>
            {text}
        </TableCell>
    )
}

export const CellCheckbox = ({ isItemSelected, labelId }) => {
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

export const CellAvatar = ({ avatar, title, subtitle }) => {
    return (
        <TableCell
            component="th"
            id={labelId}
            scope="row">
            <ProfileAssets.InfoAvatarGroup
                avatarProp={{
                    variant: 'square',
                    src: avatar,
                    sx: {
                        borderRadius: '10px',
                        objectFit: 'contain',
                        width: '50px', height: '50px',
                    }
                }}
                boxSx={{
                    marginLeft: '10px'
                }}
                title={title} subtitle={'askdjl'} />
        </TableCell>
    )
}


export const CellStatus = ({ status, label }) => {
    let child;
    switch (status) {
        case 'success':
            child = <SuccessChip label={label} />
            break;
        case 'process':
            child = <ProcessChip label={label} />
            break;
        case 'shipped':
            child = <ShippedChip label={label} />
            break;
        default:
            child = <ProcessChip label={label} />
            break;
    }
    return (
        <TableCell align="left">
            {child}
        </TableCell>
    )
}

export const CellButtons = ({ date }) => {
    return (
        <TableCell align="left">
            <Stack direction={'row'} sx={{
                bgcolor: 'pink',
            }} >
                <IconButton><EditIcon /></IconButton>
                <IconButton><VisibilityIcon /></IconButton>
                <IconButton><DeleteIcon /></IconButton>
            </Stack>
        </TableCell>
    )
}