import React from 'react';
import {
  Container, TextField, Typography, Button, Box, Avatar,
  FormControl, FormLabel,
  IconButton, Breadcrumbs, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RoutingBreadcrumbs from '@components/RoutingBreadCrumbs';
import { ProfileAssets } from '@components/profile/ProfileAssets';
import ProfileForm from '@components/profile/ProfileForm';

function AccountSettings() {
  // const { InfoCard, InfoLine, InfoAvatarGroup, variants } = ProfileAssets;
  return (
    <ProfileAssets.InfoCard title={'Account Settings'} >
      {/* Avatar Section */}
      <Box sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8,
        padding: 2,
      }}>
        <Box
          sx={{
            display: 'flex',
            width: '20%',
            height: '100%', // Ensure there’s enough height for vertical centering
            justifyContent: 'center', // Center horizontally
          }}
        >
          <Avatar
            alt="Profile Picture"
            src="/path/to/avatar.png" // Replace with actual path or URL
            sx={{
              width: 178,
              height: 178,
            }}
          />
        </Box>

        <ProfileForm />

      </Box>

      {/* Save Changes Button */}
      <ProfileAssets.Button variant="contained" >
        Save Changes
      </ProfileAssets.Button>
    </ProfileAssets.InfoCard>
  );
}

export default AccountSettings;


