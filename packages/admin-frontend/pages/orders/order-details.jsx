import {
  Box, Stack,
  Paper, Typography, Divider,
  IconButton,
  useTheme,
  Avatar
} from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { ProcessChip, SuccessChip } from '@shared-src/StatusChips';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ReadOnlyTable from '@components/table/usecases/ReadOnlyTable';

export function PaperLine({ label, value, icon }) {
  const theme = useTheme();
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontWeight: theme.fontWeight.medium,
    }}>
      <Stack direction={'row'} gap={1} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ height: 40, width: 40, backgroundColor: '#F0F1F3' }}>
          {icon}
        </Avatar>
        <Typography variant="body1" fontSize={16}>{label}</Typography>
      </Stack>
      <Typography variant="body1" fontSize={16}>{value}</Typography>
    </Box>
  )
}

export function InfoPaper({ width }) {
  return (
    <Paper elevation={3} sx={{ p: 2, width: width || '48%' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <Stack direction='row' gap={2}>
          <Typography variant="h6">Order #302011</Typography>
          <ProcessChip label="Processing" />
        </Stack>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Box>
      <Divider sx={{ my: 1, }} />
      <Stack gap={2} >
        <PaperLine label="Order Date" value="2021-09-01" icon={<ScheduleIcon sx={{ color: "#667085" }} />} />
        <PaperLine label="Order Date" value="2021-09-01" icon={<ScheduleIcon sx={{ color: "#667085" }} />} />
        <PaperLine label="Order Date" value="2021-09-01" icon={<ScheduleIcon sx={{ color: "#667085" }} />} />
      </Stack>
    </Paper>
  )
}

export default function index() {
  const theme = useTheme();
  return (
    <Box sx={{
      display: 'flex',
      fontFamily: theme.fontFamily.publicSans,
      justifyContent: 'space-between',
    }}>
      <Stack sx={{
        width: '62%',
        gap: 4,
      }}>
        <Box sx={{
          width: '100%',
          flexWrap: 'wrap',
          display: 'flex', justifyContent: 'space-between',
        }}>
          <InfoPaper />
          <InfoPaper />
        </Box>
        <Paper elevation={2} width={'100%'} >
          <Stack direction={'row'} sx={{display:'flex', alignItems:'center'}}>
            <Typography variant="h6" sx={{ p: 2 }}>Order Items</Typography>
            <SuccessChip label={'+2 Orders'} />
          </Stack>
          <ReadOnlyTable />
        </Paper>
      </Stack>
      <Stack width={'35%'} >
        <InfoPaper width={'90%'} />
      </Stack>
    </Box>
  )
}
