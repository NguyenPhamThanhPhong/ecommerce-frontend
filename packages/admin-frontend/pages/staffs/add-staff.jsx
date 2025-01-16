import { UIAssets } from '@shared-src/UIAssets';
import { Box, Alert, Stack, FormControlLabel, Switch } from '@mui/material';
import { FormAlert } from '@shared-src/InputAssets';
import { useState } from 'react';
import { useStaffForm } from '@components/forms/AddStaffForm';
import { ResetButton, SubmitButton } from '@shared-src/ButtonAssets';
import StaffFormUI from '@components/forms/ui/StaffFormUI';

export default function CreateStaff() {

  return (
    <StaffFormUI />
  )
}
