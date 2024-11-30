
import { Box, Typography, Paper, Grid2, Avatar, Stack, useTheme } from '@mui/material';
import { ProfileAssets } from './ProfileAssets';

function DashboardContent() {
  const theme = useTheme();

  const orderSumaries = [
    {
      color: "#e0f7fa",
      title: "Total Orders",
      value: "154",
      img: '/profile-dashboard-total-orders.png'
    },
    {
      color: "#fff3e0",
      title: "Pending Orders",
      value: "05",
      img: '/profile-dashboard-pending-orders.png'
    },
    {
      color: "#e8f5e9",
      title: "Completed Orders",
      value: "149",
      img: '/profile-dashboard-completed-orders.png'
    }
  ]
  return (
    <Stack width={'100%'}>
      {/* Orders Overview */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%',
        gap: '16px'
      }}>
        {
          orderSumaries.map((order, index) => (
            <OrderCard img={order.img} key={index} color={order.color} title={order.title} count={order.value} />
          ))
        }

      </Box>

      {/* Welcome Text */}
      <Typography variant="h6" mt={3} fontFamily={'Public Sans'} fontWeight={theme.fontWeight.semiBold}>
        Hello, Muhammed Nabeel
      </Typography>
      <Typography variant="body2" color="textPrimary" fontSize={20}>
        From your account dashboard, you can easily check & view your <a href="#">Recent Orders</a>,
        manage your <a href="#">Shipping and Billing Addresses</a> and edit your <a href="#">Password</a> and <a href="#">Account Details</a>.
      </Typography>

      {/* Account and Address Info */}
      <Box mt={3} sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '16px',
      }}>
        <Box sx={{
          width: '50%',
        }}>
          <ProfileAssets.InfoCard title="ACCOUNT INFO">
            <AccountInfo />
          </ProfileAssets.InfoCard>
        </Box>
        <Box sx={{
          width: '50%',
        }}>
          <ProfileAssets.InfoCard title="DEFAULT ADDRESS">
            <AddressInfo />
          </ProfileAssets.InfoCard>
        </Box>
      </Box>
    </Stack>
  );
}

function OrderCard({ color, title, count, img }) {
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

function AccountInfo() {
  const infos = [
    { label: 'Email', value: 'abc@gmail.com' },
    { label: 'Phone', value: '9876543210' },
  ]
  return (
    <Stack>
      <ProfileAssets.InfoAvatarGroup avatar="/avatar.png" title="Muhammed Nabeel" subtitle="junior developer" />
      {
        infos.map((info, index) => (
          <ProfileAssets.InfoLine key={index} label={info.label} value={info.value} />
        ))
      }
      <ProfileAssets.Button >
        Edit Account
      </ProfileAssets.Button>
    </Stack>

  );
}

function AddressInfo() {
  const infos = [
    { label: "Name", value: "Muhammed Nabeel" },
    { label: "Address", value: "Mikro Grafio, 4th Gate, Calicut" },
    { label: "Pin", value: "67372" },
    { label: "Phone Number", value: "+917034985827" },
    { label: "Email", value: "abc@gmail.com" },

  ]
  return (
    <Stack>
      <Typography variant="h6">Muhammed Nabeel</Typography>
      {
        infos.map((info, index) => (
          <ProfileAssets.InfoLine key={index} label={info.label} value={info.value} />
        ))
      }
      <ProfileAssets.Button >
        Change Address
      </ProfileAssets.Button>
    </Stack>
  );
}




export default function Dashboard() {
  return (
    <Box display="flex" p={3} sx={{
      flexGrow: 1,
    }}>
      <DashboardContent />

    </Box>
  );
}