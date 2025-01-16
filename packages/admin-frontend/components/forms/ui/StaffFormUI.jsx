import { UIAssets } from '@shared-src/UIAssets';
import { Box, Alert, Stack } from '@mui/material';
import { useStaffForm } from '../AddStaffForm';
import { ResetButton, SubmitButton } from '@shared-src/ButtonAssets';
import { useEffect } from 'react';



export default function StaffFormUI({ isUpdate }) {
    const [active, setActive] = useState(true);
    const handleChange = () => setActive(!active);
    const {
        name, email, phone, password, confirmPassword,
        enableDate, disableDate,
        submitCreate, submitUpdate, reset,
        loadStaff,
        birthDate, image, } = useStaffForm({});

    useEffect(() => {
        if (isUpdate && loadStaff) {
            loadStaff();
        }
    }, [])

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
                <FormAlert {...alert} />
                <image.Component {...image} />
                <Stack flex={1}>
                    <FormControlLabel
                        control={<Switch checked={active} onChange={handleChange} />}
                        label={active ? "Active" : "Inactive"}
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <name.Component {...name} />
                        <birthDate.Component {...birthDate} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <email.Component {...email} />
                        <phone.Component {...phone} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <enableDate.Component {...enableDate} />
                        <disableDate.Component {...disableDate} />
                        <password.Component {...password} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                        <Stack direction={'row'} gap={4}>
                            <ResetButton label={'Reset'} onClick={reset} />
                            <SubmitButton label={'Save Customer'} onClick={
                                isUpdate ? submitUpdate : submitCreate
                            } />
                        </Stack>
                    </Box>
                </Stack>
            </Box>

        </UIAssets.InfoCard>
    )
}