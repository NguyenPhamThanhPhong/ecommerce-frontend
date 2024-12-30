import AdminTable from '@components/table/AdminTable';
import {
  ToggleButtonGroup, ToggleButton,
  Button,
  Box, Stack, Typography, Avatar, Divider,
  useTheme
} from '@mui/material'
import { v4 } from 'uuid';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import { Download } from '@mui/icons-material';
import { AdminButtonGroups } from '@components/common/AdminButtonGroups';
import OrderTable from '@components/table/usecases/OrderTable';

export function ExportButton({ onClick }) {
    const theme = useTheme();
    return (
        <Button startIcon={<Download />} sx={{
            backgroundColor: '#f4ecfb', height: 40,
            fontWeight: theme.fontWeight.semiBold,
            px: 2,
        }}>
            Export
        </Button>

    )
}

export function AddOrderButton({label,onClick}) {
    const theme = useTheme();
    return (
        <Button variant='contained' startIcon={<AddIcon />} sx={{
            height: 40,
            backgroundColor: 'success',
            color: 'white',
            fontWeight: theme.fontWeight.semiBold,
        }}>
            {label}
        </Button>
    )
}