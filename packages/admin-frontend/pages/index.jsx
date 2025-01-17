import React, { useEffect } from 'react';
import { Avatar, Box, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import WaveChart from '@components/charts/WaveChart';
import { getDashboardStatistics } from '@shared-api/Statistics';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';


const lineData = [
  { name: 'Jan', 2020: 4000, 2021: 2400 },
  { name: 'Feb', 2020: 3000, 2021: 1398 },
  { name: 'Mar', 2020: 2000, 2021: 9800 },
];

const LineChartComponent = (lineData) => (
  <LineChart width={500} height={300} data={lineData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="2020" stroke="#8884d8" />
    <Line type="monotone" dataKey="2021" stroke="#82ca9d" />
  </LineChart>
);

const data = [
  { name: 'Total Order', value: 81 },
  { name: 'Customer Growth', value: 22 },
  { name: 'Total Revenue', value: 62 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

function InfoPaper({ avatar, title, subtitle }) {
  return (<Paper style={{
    padding: '20px', textAlign: 'center', width: '24%',
    maxWidth: '300px',
    minWidth: '250px'
  }}>
    <Box sx={{

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(0, 176, 116,0.3)',
        borderRadius: '50%',
        width: 85, height: 85
      }}>
        <Avatar src={avatar} sx={{
          width: 50, height: 50
        }} />
      </Box>
      <Stack spacing={1}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="h6">{subtitle}</Typography>
      </Stack>
    </Box>
  </Paper>)
}

const RootPage = () => {
  const [statistics, setStatistics] = React.useState(null);
  const pub = useSnackbarStore(state => state.pub);

  useEffect(() => {
    getDashboardStatistics(pub).then((res) => {
      if (res) {
        setStatistics(res);
      }
    });
  }, []);
  if (statistics === null) {
    return (
      <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}><CircularProgress /> Loading...</Box>
    )
  }

  return (
    <Box>
      <Box display={'flex'} sx={{
        gap: 6
      }}>
        <InfoPaper avatar={'/total-orders.png'} title={statistics?.totalOrders}
          subtitle={'Total orders'} />
        <InfoPaper avatar={'/total-orders.png'} title={statistics?.totalProducts}
          subtitle={'Total products'} />
        <InfoPaper avatar={'/total-orders.png'} title={statistics?.totalPurchases}
          subtitle={'Total purchases'} />
        <InfoPaper avatar={'/total-orders.png'} title={statistics?.totalRevenue}
          subtitle={'Total revenue'} />
      </Box>
      {
        statistics?.weeklyStatistics?.length > 0 ?
          <WaveChart data={statistics?.weeklyStatistics.reverse()} />
          : null
      }
    </Box>
  )
};

export default RootPage;
