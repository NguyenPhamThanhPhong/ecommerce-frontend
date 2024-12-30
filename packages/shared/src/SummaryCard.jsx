import { Box, Typography, Paper,Avatar, Stack, useTheme } from '@mui/material';

export default function SummaryCard({ color, title, count, img }) {
    const theme = useTheme();
    return (
      <Paper elevation={1} sx={{
        backgroundColor: color,
        display: 'inline-flex', alignItems: 'center',
        width: '30%',
        // justifyContent: 'space-between',
        padding: '16px'
      }}>
        <Avatar variant='square' src={img} style={{
          backgroundColor: 'white',
          color: 'black', width: 50, height: 50
        }}></Avatar>
        <Stack ml={3}>
          <Typography variant="h4" component="div" fontSize={26}>{count}</Typography>
          <Typography variant="body1" color="textPrimary" fontSize={18}>{title}</Typography>
        </Stack>
      </Paper>
    );
  }