import React from 'react';
import { Box, Avatar, Typography, Button, Paper } from '@mui/material';
function AccountInfo() {
    return (
      <Box display="flex" alignItems="center">
        <Avatar src="/avatar.png" alt="Muhammed Nabeel" style={{ width: 60, height: 60, marginRight: 16 }} />
        <Box>
          <Typography variant="h6">Muhammed Nabeel</Typography>
          <Typography variant="body2" color="textSecondary">Calicut, Kerala</Typography>
          <Typography variant="body2">Email: nabeel@gmail.com</Typography>
          <Typography variant="body2">Phone: +917034985827</Typography>
        </Box>
        <Button variant="outlined" style={{ marginTop: 16 }}>Edit Account</Button>
      </Box>
    );
  }
  
  function AddressInfo() {
    return (
      <Box>
        <Typography variant="body2">Muhammed Nabeel</Typography>
        <Typography variant="body2">Mikro Grafio, 4th Gate, Calicut</Typography>
        <Typography variant="body2">Pin: 67372</Typography>
        <Typography variant="body2">Phone Number: +917034985827</Typography>
        <Typography variant="body2">Email: nabeel@gmail.com</Typography>
        <Button variant="outlined" style={{ marginTop: 16 }}>Change Address</Button>
      </Box>
    );
  }
  
  function InfoCard({ title, children }) {
    return (
      <Paper elevation={3} style={{ padding: 16 }}>
        <Typography variant="subtitle1" gutterBottom>{title}</Typography>
        {children}
      </Paper>
    );
  }
  