import React from 'react';
import { Container, Grid, TextField, Typography, Button, Box, Avatar, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function AccountSettings() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h6">ACCOUNT SETTING</Typography>
      </Box>

      <Grid container spacing={2}>
        {/* Avatar Section */}
        <Grid item xs={12} md={3} style={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar
            alt="Profile Picture"
            src="/path/to/avatar.png" // Replace with actual path or URL
            sx={{ width: 100, height: 100 }}
          />
        </Grid>

        {/* Form Section */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {/* First and Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="First Name" defaultValue="muhammed" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Second Name" defaultValue="nabeel" />
            </Grid>

            {/* Email and Change Password */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" defaultValue="nabeel@gmail.com" />
            </Grid>
            <Grid item xs={12} sm={6} display="flex" alignItems="center">
              <Button variant="outlined" endIcon={<EditIcon />}>
                Change Password
              </Button>
            </Grid>

            {/* Secondary Email and Phone Number */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Secondary Email" defaultValue="-" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Phone Number" defaultValue="+91 70349 85827" />
            </Grid>

            {/* Country/Region, State, and Pin Code */}
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Country/Region" defaultValue="India" select>
                {/* Add options here */}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="States" defaultValue="Kerala" select>
                {/* Add options here */}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Pin Code" defaultValue="673570" />
            </Grid>
          </Grid>
        </Grid>

        {/* Save Changes Button */}
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button variant="contained" color="primary" style={{ padding: '10px 20px', fontSize: '16px' }}>
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AccountSettings;
