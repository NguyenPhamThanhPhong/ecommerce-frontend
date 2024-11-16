
import { Box, Typography, Paper, Grid, Avatar, Button,List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Sidebar() {
  return (
    <Paper elevation={3} style={{ width: '200px' }}>
      <List>
        <ListItem button selected>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><AccountBoxIcon /></ListItemIcon>
          <ListItemText primary="Account Details" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><LocationOnIcon /></ListItemIcon>
          <ListItemText primary="Shipping Address" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
          <ListItemText primary="Wallet" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Log-out" />
        </ListItem>
      </List>
    </Paper>
  );
}
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

export default function Dashboard() {
  return (
    <Box display="flex" p={3}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box flex={1} ml={3}>
        <DashboardContent />
      </Box>
    </Box>
  );
}