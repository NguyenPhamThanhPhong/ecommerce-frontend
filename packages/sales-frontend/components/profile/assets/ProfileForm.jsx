import React, { useEffect, useState } from 'react';
import {
    TextField, Button, Box,
    FormControl, FormLabel, Stack,
    useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ProfileAssets } from '@components/profile/assets/ProfileAssets';

import { isEmpty, isNotEmpty, isEmail, isPhoneNumber } from '@utils/ValidationUtils';
import { FormDatePicker, FormTextBox } from '@shared/InputAssets';
import { useGlobalAccountContext } from '@shared-conntext/AccountContext';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';


export const useProfileForm = () => {
    const pub = useSnackbarStore(state=>state.pub);
    const {account } = useGlobalAccountContext();
    const [formValues, setFormValues] = useState({
        fullName: account?.profile?.fullName || '',
        email: account?.email || '',
        phone: account?.profile?.phone || '',
        dateOfBirth: account?.profile?.dateOfBirth || new Date(),
    });

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
    });

    const handleTextChange = ({ field, required, numberOnly, email }) => (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));

        if (required && isEmpty(value)) {
            setErrors((prev) => ({ ...prev, [name]: `${field} is required.` }));
            return false;
        }
        if (numberOnly && !isPhoneNumber(value)) {
            setErrors((prev) => ({ ...prev, [name]: `Please enter a valid ${field}.` }));
            return false;
        }
        if (email && !isEmail(value)) {
            setErrors((prev) => ({ ...prev, [name]: 'Please enter a valid email.' }));
            return false;
        }
        setErrors((prev) => ({ ...prev, [name]: '' }));
        return true;
    };
    const handleDateChange = ({ field, required, upperBound }) => (event) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        if (required && !value) {
            setErrors((prev) => ({ ...prev, [name]: `${field} is required.` }));
            if (upperBound && new Date(value) > upperBound) {
                setErrors((prev) => ({ ...prev, [name]: `${field} must be before ${upperBound}` }));
            }
            return false;
        }
        setErrors((prev) => ({ ...prev, [name]: '' }));
        return true;
    };
    const fullNameInput = {
        label: 'Full name',
        value: formValues.fullName,
        name: 'fullName',
        Component: FormTextBox,
        onChange: handleTextChange({ field: 'Full name', required: true }),
        error: errors.fullName !== '',
        errorText: errors.fullName,
        required: true,
        formSx: {width: '100%'}
    };
    const phoneInput = {
        label: 'Phone Number',
        value: formValues.phone,
        name: 'phone',
        Component: FormTextBox,
        onChange: handleTextChange({ field: 'Phone Number', required: true, numberOnly: true }),
        error: errors.phone !== '',
        errorText: errors.phone,
        required: true
    }
    const emailInput = {
        label: 'Email',
        value: formValues.email,
        Component: FormTextBox,
        name: 'email',
        onChange: handleTextChange({ field: 'Email', required: true, email: true }),
        error: errors.email !== '',
        errorText: errors.email,
        required: true,
    }
    const dateOfBirthInput = {
        label: 'Date of Birth',
        value: formValues.dateOfBirth,
        name: 'dateOfBirth',
        Component: FormDatePicker,
        onChange: handleDateChange({ field: 'Date of Birth', required: true }),
        error: isNotEmpty(errors.dateOfBirth),
        errorText: errors.dateOfBirth,
        required: true
    }
    const imageUrl = account?.profile?.avatarUrl || '';

    return {
        formValues,
        errors,
        imageUrl,
        inputs: { phoneInput, emailInput, dateOfBirthInput, fullNameInput }
    };
};

export const ProfileFormUI = ({fullNameInput, phoneInput, emailInput, dateOfBirthInput, formValues, errors, onSubmit}) => {

    const submitForm = () => {
        const validateForm = () => {
            return Object.values(errors).every((error) => error === '');
        }
        if (validateForm()) {
            // console.log('Form Values:', JSON.stringify(formValues));
            onSubmit();
        }

    }
    return (
        <Stack display="flex" sx={{ width: '80%',gap:2 }}>
            <Box component="form" sx={{ display: 'flex', gap: 2, width: '100%' }}>
                <fullNameInput.Component {...fullNameInput} />
            </Box>
            <Box component="form" sx={{ display: 'flex', gap: 2, alignItems: 'center', width: '100%' }}>
                <emailInput.Component {...emailInput} />
                <Button variant="outlined" sx={{ width: '50%', mt: '25px', height: '53px' }}>
                    Change Password
                </Button>
            </Box>
            <Box component="form" sx={{ display: 'flex', gap: 2, alignItems: 'center', width: '100%' }}>
                <phoneInput.Component {...phoneInput} />
                <dateOfBirthInput.Component {...dateOfBirthInput} />
            </Box>
            <ProfileAssets.Button variant="contained" onClick={submitForm}>Save Changes</ProfileAssets.Button>
        </Stack>
    );
};

// export default ProfileForm;
