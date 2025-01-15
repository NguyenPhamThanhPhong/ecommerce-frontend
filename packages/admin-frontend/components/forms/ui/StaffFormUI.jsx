import { UIAssets } from '@shared-src/UIAssets';
import { Box, Alert, Stack } from '@mui/material';
import { useStaffForm } from '../AddStaffForm';
import { ResetButton, SubmitButton } from '@shared-src/ButtonAssets';



export default function StaffFormUI({ isUpdate }) {
    const {
        name, email, phone, password, confirmPassword,
        enableDate, disableDate,
        submitCreate, submitUpdate, reset,
        birthDate, image, } = useStaffForm({});
    return (
        <UIAssets.InfoCard title={'Please fill in Staff Information'} >
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
                        <email.Component {...email} />
                        <phone.Component {...phone} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <enableDate.Component {...enableDate} />
                            <disableDate.Component {...disableDate} />
                        </Box>
                        <password.Component {...password} />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                        <Stack direction={'row'} gap={4}>
                            <ResetButton label={'Reset'} onClick={reset} />
                            <SubmitButton label={'Save Staff'} onClick={
                                isUpdate ? submitUpdate : submitCreate
                            } />
                        </Stack>
                    </Box>
                </Stack>
            </Box>

        </UIAssets.InfoCard>
    )
}