import {
  Box, Avatar,
  IconButton,
  Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ProfileAssets } from '@components/profile/assets/ProfileAssets';
import { ProfileFormUI, useProfileForm } from '@components/profile/assets/ProfileForm';
import { useState, useEffect } from 'react';
import { useGlobalAccountContext } from '@shared-conntext/AccountContext';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';

function ImagePicker({ image, setImage }) {
  // Default image
  const [error, setError] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate the file type (image only)
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.');
        setAlertVisible(true); // Show alert
        return;
      }

      // Optional: Validate file size (e.g., max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setError('File size should be under 2MB.');
        setAlertVisible(true); // Show alert
        return;
      }

      setError('');
      setAlertVisible(false); // Hide alert if no error
      setImage(file);  // Store the file directly, not Base64 string

    }
  };

  // Timeout effect for alert visibility
  useEffect(() => {
    if (alertVisible) {
      const timeout = setTimeout(() => {
        setAlertVisible(false); // Hide alert after 3 seconds
      }, 3000); // 3000ms = 3 seconds

      // Clear the timeout if error changes or alert is dismissed
      return () => clearTimeout(timeout);
    }
  }, [alertVisible]); // Runs every time alertVisible changes

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '20%',
        height: 'auto',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {alertVisible && error && (
        <Alert severity="error" sx={{ position: 'absolute', top: -50 }}>
          {error}
        </Alert>
      )}

      {/* Avatar with the image */}
      <Box
        component="label"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <Avatar
          alt="Profile Picture"
          src={(typeof image === 'string') ? image : URL.createObjectURL(image)}
          sx={{
            width: 178,
            height: 178,
          }}
        />
        {/* Hidden input field inside the label */}
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </Box>

      {/* IconButton placed outside the label */}
      <IconButton
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          backgroundColor: '#000000',
          color: 'white',
        }}
        onClick={() => document.querySelector('input[type="file"]').click()} // Triggers file input directly
      >
        <EditIcon />
      </IconButton>
    </Box>
  );
}

function AccountSettings() {
  // const { InfoCard, InfoLine, InfoAvatarGroup, variants } = ProfileAssets;
  const {
    formValues,
    errors, 
    inputs,
    imageUrl
  } = useProfileForm();
  const [image, setImage] = useState(imageUrl|| '/sub-banner4.png');
  const { updateProfile } = useGlobalAccountContext();
  const pub = useSnackbarStore(state => state.pub);
  function handleSubmit() {
    const subMitData = {
      ...formValues,
    }
    if (!(image === '/sub-banner4.png' || image === null)) {
      subMitData.avatar = image;
    }
    updateProfile(subMitData, pub)
  }

  return (
    <Box display="inline" sx={{
      flexGrow: 1,
    }}>
      <ProfileAssets.InfoCard title={'Account Settings'} >
        {/* Avatar Section */}
        <Box sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
          padding: 2,
        }}>
          <ImagePicker image={image} setImage={setImage} />

          <ProfileFormUI {...inputs}
            errors={errors} formValues={formValues} onSubmit={handleSubmit} />

        </Box>


      </ProfileAssets.InfoCard>

    </Box>

  );
}

export default AccountSettings;


