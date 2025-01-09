
import { Box, Typography, Paper, Grid2, Avatar, Stack, useTheme } from '@mui/material';
import { ProfileAssets } from '@components/profile/assets/ProfileAssets';
import { useGlobalAccountContext } from '@shared-conntext/AccountContext';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function DashboardContent() {
  const theme = useTheme();
  const { account, totalOrders, totalPurchases, loadAccount, loadStatistics } = useGlobalAccountContext();

  const orderSumaries = [
    {
      color: "#e0f7fa",
      title: "Total Orders",
      value: totalOrders,
      img: '/profile-dashboard-total-orders.png'
    },
    {
      color: "#fff3e0",
      title: "Total Purchases",
      value: totalPurchases,
      img: '/profile-dashboard-pending-orders.png'
    },
    {
      color: "#e8f5e9",
      title: "Free Delivery",
      value: totalPurchases,
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
        Hello, {account?.profile?.fullName}
      </Typography>
      <Typography variant="body2" color="textPrimary" fontSize={20}>
        From your account dashboard, you can easily check & view your <Link href="#">Recent Orders</Link>,
        manage your <Link href="#">Billing Addresses</Link> and edit your <Link href="#">Password</Link> and <Link href="#">Account Details</Link>.
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
            <AccountInfo email={account?.email} phone={account?.profile?.phone} />
          </ProfileAssets.InfoCard>
        </Box>
        <Box sx={{
          width: '50%',
        }}>
          <ProfileAssets.InfoCard title="DEFAULT ADDRESS">
            <AddressInfo email={account?.email} name={account?.profile?.fullName}
              phone={account?.profile?.phone} primaryAddress={account?.profile?.primaryAddress} />
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

function AccountInfo({ email, phone }) {
  const router = useRouter();
  const infos = [
    { label: 'Email', value: email || '' },
    { label: 'Phone', value: phone || '' },
  ]
  return (
    <Stack>
      <ProfileAssets.InfoAvatarGroup
        avatarProp={{
          src: "/banner1.png"
        }}
        title="Muhammed Nabeel" subtitle="junior developer" />
      {
        infos.map((info, index) => (
          <ProfileAssets.InfoLine key={index} label={info.label} value={info.value} />
        ))
      }
      <ProfileAssets.Button onClick={() => router.push("/profile/details")} >
        Edit Account
      </ProfileAssets.Button>
    </Stack>

  );
}

function AddressInfo({ name, primaryAddress, phone, email }) {
  const router = useRouter();
  const infos = [
    { label: "Name", value: name },
    { label: "Primary Address", value: primaryAddress },
    { label: "Phone Number", value: phone },
    { label: "Email", value: email },
  ]
  return (
    <Stack>
      <Typography variant="h6">Muhammed Nabeel</Typography>
      {
        infos.map((info, index) => (
          <ProfileAssets.InfoLine key={index} label={info.label} value={info.value} />
        ))
      }
      <ProfileAssets.Button onClick={() => router.push("/profile/shipping")} >
        Change Address
      </ProfileAssets.Button>
    </Stack>
  );
}

export default function Dashboard() {
  return (
    <Box display="inline-flex" py={3} sx={{
      width: '80%',

    }}>
      <DashboardContent />

    </Box>
  );
}