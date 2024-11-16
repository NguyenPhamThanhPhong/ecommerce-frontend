import { List, ListItem, ListItemText, ListItemIcon, Paper } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function ProfileSidebar() {
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
