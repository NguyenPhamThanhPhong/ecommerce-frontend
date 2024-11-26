import React from 'react';
import { Box, Grid2, TextField, Typography } from '@mui/material';
import { marginUtil } from '@styles/styleUtils';

import Button from '@mui/material/Button';
import { ResponsiveAppBar } from '@components/AppBar';


const BottomAppBar = () => {
  const quickLinks = ['Quick Links', 'Home', 'About us', 'Contact us', 'FAQ'];
  const importantPolicies = ['Important Policies', 'Privacy Policy', 'Terms of Service', 'Refund Policy'];
  const letusHelp = ['Let us help you', 'FAQ', 'Contact Support', 'Shipping Info'];
  const connectWithUs = ['Connect With Us', 'Facebook', 'Twitter', 'Instagram', 'LinkedIn'];

  const footerColumns = [quickLinks, importantPolicies, letusHelp, connectWithUs];

  const titleFontSize = 20;
  const titleFontWeight = 700;
  const columnDistributionProps = {
    container: true,
    spacing: 3,
    display: 'flex',
    columnSpacing: 6,
    flexGrow: 6,
    justifyContent: 'space-between',
  }
  const columnProps = {
    xs: 12, sm: 6, md: 3,
    container: true,
    display: 'flex', rowSpacing: '8px',
    flexDirection: 'column',
  }

  return (
    <Box
      component="footer"
      sx={{
        zIndex: 1000,
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: 'secondary.main',
        color: 'text.primary',
      }}
    >
      <Grid2 container display={'flex'}
        sx={{
          ...marginUtil({ mvt: '5' }),
        }}>
        <Grid2 {...columnDistributionProps}
          sx={{
            ...marginUtil({ mvt: '5' }),
          }}>
          {footerColumns.map((column, index) => (
            <Grid2 key={index} {...columnProps}>
              <Typography variant="h6" key={0}
                sx={{ fontSize: titleFontSize, fontWeight: titleFontWeight }}>{column[0]}</Typography>
              {column.slice(1).map((item, index) => (
                <Typography key={index} variant="body2">{item}</Typography>
              ))}
            </Grid2>
          ))}
        </Grid2>


        <Grid2 xs={12} sm={6} md={3} flexGrow={9}>
          <Typography variant="h6">Contact Us</Typography>
          <Typography variant="body2">Subscribe:</Typography>
          <Box
            component="form"
            sx={{
              display: 'flex',
              gap: 1,
              mt: 1,
            }}
          >
            <TextField
              variant="filled"
              placeholder="Enter your email"
              sx={{ bgcolor: 'white', borderRadius: 1 }}
              fullWidth
            />
            <Button variant="contained" color="secondary">
              Submit
            </Button>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

const CommonLayout = ({ children }) => {
  return (
    <div>
      <ResponsiveAppBar />
      <Box sx={{ paddingTop: '36px',display:'flex',justifyContent:'center',marginBottom:'150px' }}>
        {children}
      </Box>
      {/* <BottomAppBar /> */}
    </div>
  );
};

export default CommonLayout;
