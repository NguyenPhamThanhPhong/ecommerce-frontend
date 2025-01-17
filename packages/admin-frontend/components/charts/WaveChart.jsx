import React from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button, Typography, Paper } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const data = [
  { day: 'Sunday', orders: 200 },
  { day: 'Monday', orders: 300 },
  { day: 'Tuesday', orders: 456 },
  { day: 'Wednesday', orders: 400 },
  { day: 'Thursday', orders: 320 },
  { day: 'Friday', orders: 480 },
  { day: 'Saturday', orders: 540 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#fff',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      >
        <p>{`${label}`}</p>
        <p>
          <strong>{`${payload[0].value} vnd`}</strong>
        </p>
      </div>
    );
  }
  return null;
};

const WaveChart = ({data}) => (
  <Paper style={{ padding: '20px', borderRadius: '15px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Typography variant="h6">Chart Order</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Lorem ipsum dolor sit amet, consectetur adip
        </Typography>
      </div>
      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        style={{ textTransform: 'none' }}
      >
        Save Report
      </Button>
    </div>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="totalValue"
          stroke="#8884d8"
          strokeWidth={3}
          dot={{ r: 5, fill: '#8884d8' }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </Paper>
);

export default WaveChart;
