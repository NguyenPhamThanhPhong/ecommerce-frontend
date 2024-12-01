import React, { useEffect, useState } from 'react';
import {
    TextField, Button, Box,
    FormControl, FormLabel, Stack,
    useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ProfileAssets } from '@components/profile/assets/ProfileAssets';
import { Filter } from 'bad-words';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // Correct import
import { DatePicker } from '@mui/x-date-pickers';
import { isEmpty, isNotEmpty, isEmail, isPhoneNumber } from '@utils/ValidationUtils';

const filter = new Filter();

const ProfileTextBox = ({ name, label, value, onChange, error, errorText, required }) => {
    onChange = onChange || (() => { });
    return (
        <FormControl margin="normal" error={error} sx={{
            gap: 1,
            width: '50%',
        }}>
            <FormLabel>{label + ((required) ? ' * ' : '')}</FormLabel>
            <TextField
                name={name}
                error={error}
                helperText={errorText}
                variant="outlined"
                value={value}
                onChange={onChange}
                required={required}
            />
        </FormControl>
    )
}
const ProfileDatePicker = ({ name, label, value, onChange, error, errorText, required }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormControl margin="normal" error={error} sx={{ gap: 1, width: '50%' }}>
                <FormLabel>{label + (required ? ' * ' : '')}</FormLabel>
                <DatePicker
                    format="dd-MM-yyyy"
                    value={value}
                    onChange={(newValue) => onChange({ target: { name, value: newValue } })}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name={name}
                            error={error}
                            helperText={errorText}
                            required={required}
                        />
                    )}
                />
            </FormControl>
        </LocalizationProvider>
    );
};

export const useProfileForm = ({firstName, lastName, email, phoneNumber, dateOfBirth}) => {
    const [formValues, setFormValues] = useState({
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        phoneNumber: phoneNumber || '',
        dateOfBirth: dateOfBirth || new Date(),
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
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
    const row1 = [
        {
            label: 'First Name',
            value: formValues.firstName,
            name: 'firstName',
            Component: ProfileTextBox,
            onChange: handleTextChange({ field: 'First Name', required: true }),
            error: errors.firstName !== '',
            errorText: errors.firstName,
            required: true
        },
        {
            label: 'Last Name',
            value: formValues.lastName,
            name: 'lastName',
            Component: ProfileTextBox,
            onChange: handleTextChange({ field: 'Last Name', required: true }),
            error: errors.lastName !== '',
            errorText: errors.lastName,
            required: true
        }
    ]
    const row2 = {
        label: 'Email',
        value: formValues.email,
        ComponentEnum: ProfileTextBox,
        name: 'email',
        onChange: handleTextChange({ field: 'Email', required: true, email: true }),
        error: errors.email !== '',
        errorText: errors.email,
        required: true
    }

    const row3 = [
        {
            label: 'Phone Number',
            value: formValues.phoneNumber,
            name: 'phoneNumber',
            Component: ProfileTextBox,
            onChange: handleTextChange({ field: 'Phone Number', required: true, numberOnly: true }),
            error: errors.phoneNumber !== '',
            errorText: errors.phoneNumber,
            required: true
        },
        {
            label: 'Date of Birth',
            value: formValues.dateOfBirth,
            name: 'dateOfBirth',
            Component: ProfileDatePicker,
            onChange: handleDateChange({ field: 'Date of Birth', required: true }),
            error: isNotEmpty(errors.dateOfBirth),
            errorText: errors.dateOfBirth,
            required: true
        }
    ]



    return {
        formValues,
        errors,
        handleTextChange,
        handleDateChange,
        row1,
        row2,
        row3
    };
};

export const ProfileFormUI = ({ row1, row2, row3, handleDateChange,formValues,errors }) => {
    const validateForm = () => {
        return Object.values(errors).every((error) => error === '');
    }
    const submitForm = ()=>{
        if(validateForm()){
            console.log('Form Values:', JSON.stringify(formValues));
        }
    }
    return (
        <Stack display="flex" sx={{ width: '80%' }}>
            <Box component="form" sx={{ display: 'flex', gap: 2, width: '100%' }}>
                {row1.map((row, index) => (
                    <row.Component key={index} {...row} />
                ))}
            </Box>
            <Box component="form" sx={{ display: 'flex', gap: 2, alignItems: 'center', width: '100%' }}>
                <ProfileTextBox {...row2} />
                <Button variant="outlined" sx={{ width: '50%', mt: '20px', height: '53px' }}>
                    Change Password
                </Button>
            </Box>
            <Box component="form" sx={{ display: 'flex', gap: 2, alignItems: 'center', width: '100%' }}>
                {row3.map((row, index) => (
                    <row.Component key={index} {...row} />
                ))}
            </Box>
            <ProfileAssets.Button variant="contained" onClick={submitForm}>Save Changes</ProfileAssets.Button>
        </Stack>
    );
};

// export default ProfileForm;
