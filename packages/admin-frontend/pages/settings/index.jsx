import { useCustomerForm } from '@components/forms/AddCustomerForm';
import { UIAssets } from '@shared-src/UIAssets';
import { Box, Alert, Stack, FormControlLabel, Switch } from '@mui/material';
import { FormAlert } from '@shared-src/InputAssets';
import { ResetButton, SubmitButton } from '@shared-src/ButtonAssets';
import { useState } from 'react';
import { useSettingsForm } from '@components/forms/SettingForm';

export default function Settings() {
    const { name, email, phone, password, birthDate, image, submit, reset } = useSettingsForm({});
    
    return (
        <UIAssets.InfoCard title={'Edit your profile information'} >
        {/* Avatar Section */}
        <Box sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
          position: 'relative',
          padding: 2,
        }}>
          <image.Component {...image} />
          <Stack flex={1}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <name.Component {...name} />
  
              <birthDate.Component {...birthDate} />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <email.Component disabled={true} {...email} />
              <phone.Component  {...phone} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Stack direction={'row'} gap={4}>
                <ResetButton label={'Reset'} onClick={reset} />
                <SubmitButton label={'Save Customer'} onClick={submit} />
              </Stack>
            </Box>
          </Stack>
        </Box>
  
      </UIAssets.InfoCard>
    )
}
