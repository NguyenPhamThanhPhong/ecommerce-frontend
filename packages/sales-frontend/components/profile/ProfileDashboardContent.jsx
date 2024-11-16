
import { Box, Typography, Paper, Grid} from '@mui/material';


function DashboardContent() {
    return (
      <Box>
        {/* Orders Overview */}
        <Grid container spacing={2}>
          <OrderCard color="#e0f7fa" title="Total Orders" count="154" />
          <OrderCard color="#fff3e0" title="Pending Orders" count="05" />
          <OrderCard color="#e8f5e9" title="Completed Orders" count="149" />
        </Grid>
  
        {/* Welcome Text */}
        <Typography variant="h6" mt={3}>
          Hello, Muhammed Nabeel
        </Typography>
        <Typography variant="body2" color="textSecondary">
          From your account dashboard, you can easily check & view your <a href="#">Recent Orders</a>,
          manage your <a href="#">Shipping and Billing Addresses</a> and edit your <a href="#">Password</a> and <a href="#">Account Details</a>.
        </Typography>
  
        {/* Account and Address Info */}
        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} md={6}>
            <InfoCard title="ACCOUNT INFO">
              <AccountInfo />
            </InfoCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoCard title="DEFAULT ADDRESS">
              <AddressInfo />
            </InfoCard>
          </Grid>
        </Grid>
      </Box>
    );
  }
  
  function OrderCard({ color, title, count }) {
    return (
      <Grid item xs={4}>
        <Paper style={{ backgroundColor: color, padding: '16px' }} elevation={3}>
          <Typography variant="h4" component="div">{count}</Typography>
          <Typography variant="body2" color="textSecondary">{title}</Typography>
        </Paper>
      </Grid>
    );
  }
  