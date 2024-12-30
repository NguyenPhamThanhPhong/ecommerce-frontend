import { useCustomerForm } from '@components/forms/AddCustomerForm';
import { UIAssets } from '@shared-src/UIAssets';
import { Box, Alert, Stack } from '@mui/material';
import { FormAlert } from '@shared-src/InputAssets';

export default function CreateCustomer() {
  const { formValues, errors,
    name, description, email, phone, password, confirmPassword,
    birthDate, alert, image, } = useCustomerForm({});
  return (
    <UIAssets.InfoCard title={'Please fill in Customer Information'} >
      {/* Avatar Section */}
      <Box sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8,
        position: 'relative',
        padding: 2,
      }}>
        <FormAlert {...alert} />
        <image.Component {...image} />
        <Stack flex={1}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <name.Component {...name} />
            <birthDate.Component {...birthDate} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <email.Component {...email} />
            <phone.Component {...phone} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <password.Component {...password} />
            <confirmPassword.Component {...confirmPassword} />
          </Box>

        </Stack>
      </Box>

    </UIAssets.InfoCard>
  )
}
