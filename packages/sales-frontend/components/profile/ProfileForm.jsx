import React, { useEffect, useState } from 'react';
import {
    TextField, Button, Box,
    FormControl, FormLabel, Stack,
    useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RoutingBreadcrumbs from '@components/RoutingBreadCrumbs';
import { ProfileAssets } from '@components/profile/ProfileAssets';
import { Filter } from 'bad-words';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // Correct import
import { DatePicker } from '@mui/x-date-pickers';

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
        <FormControl margin="normal" error={error} sx={{ gap: 1, width: '50%' }}>
            <FormLabel>{label + (required ? ' * ' : '')}</FormLabel>
            <DatePicker
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
    );
};

const ProfileForm = () => {
    const [formValues, setFormValues] = useState({
        firstName: 'k',
        lastName: '',
        email: '',
        phoneNumber: '0999988888',
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const handleChange = (field) => (e) => {
        const { name, value } = e.target;
        console.log(e)
        setFormValues({ ...formValues, [name]: value });
        if (value.trim() === '') {
            console.log('value')
            setErrors({ ...errors, [name]: `${field} is required.` });
        }
        else
            setErrors({ ...errors, [name]: '' });
    };
    const row1 = [
        {
            label: 'First Name',
            value: formValues.firstName,
            name: 'firstName',
            onChange: handleChange('First Name'),
            error: errors.firstName !== '',
            errorText: errors.firstName,
            required: true
        },
        {
            label: 'Last Name',
            value: formValues.lastName,
            name: 'lastName',
            onChange: handleChange('Last Name'),
            error: errors.lastName !== '',
            errorText: errors.lastName,
            required: true
        }
    ]
    const row2 = {
        label: 'Email',
        value: formValues.email,
        name: 'email',
        onChange: handleChange('Email'),
        error: errors.email !== '',
        errorText: errors.email,
        required: true
    }

    const row3 = {
        label: 'Phone Number',
        value: formValues.phoneNumber,
        name: 'phoneNumber',
        onChange: handleChange('Phone Number'),
        error: errors.phoneNumber !== '',
        errorText: errors.phoneNumber,
        required: true
    }

    const validateForm = () => {
        const newErrors = {};

        if (!formValues.firstName.trim()) {
            newErrors.firstName = 'First name is required.';
        }
        if (!formValues.lastName.trim()) {
            newErrors.lastName = 'Last name is required.';
        }
        if (formValues.noSwearingMessageInput && filter.isProfane(formValues.noSwearingMessageInput)) {
            newErrors.noSwearingMessageInput = 'Please avoid using inappropriate language.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [error, setError] = useState(false);

    const handleDateChange = (event) => {
        setDateOfBirth(event.target.value);
        if (!event.target.value) {
            setError(true);
        } else {
            setError(false);
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (validateForm()) {
    //         console.log('Form Submitted:', formValues);
    //         alert(JSON.stringify(formValues, null, 2));
    //     }
    // };
    const theme = useTheme();
    return (
        <Stack display='flex' sx={{
            width: '80%',
            fontFamily: theme.fontFamily.publicSans,
            alignItems: 'center',
            // flexDirection: 'column'
        }}>

            <Box component={'form'} sx={{ display: 'flex', gap: 2, width: '100%' }}>
                {row1.map((row, index) => (
                    <ProfileTextBox key={index} {...row} />
                ))}
            </Box>
            <Box component={'form'} sx={{
                display: 'flex', gap: 2,
                alignItems: 'center',
                // justifyContent: 'center',
                width: '100%'
            }}>
                <ProfileTextBox {...row2} />
                <Button variant="outlined" endIcon={<EditIcon />} sx={{
                    width: '50%',
                    mt: '20px',
                    height: '53px'
                }}>
                    Change Password
                </Button>
            </Box>
            <Box component={'form'} sx={{
                display: 'flex', gap: 2,
                alignItems: 'center',
                // justifyContent: 'center',
                width: '100%'
            }}>
                <ProfileTextBox {...row3} />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <ProfileDatePicker
                        name="dateOfBirth"
                        label="Date of Birth"
                        value={dateOfBirth}
                        onChange={handleDateChange}
                        error={error}
                        errorText={error ? 'Date is required' : ''}
                        required
                    />
                </LocalizationProvider>
            </Box>


            {/* Email and Change Password */}

            {/* <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                <TextField label="Email" defaultValue="nabeel@gmail.com" />


            </Box> */}
            {/* Secondary Email and Phone Number */}
            {/* <Box item xs={12} sm={6}>
                <TextField fullWidth label="Secondary Email" defaultValue="-" />
            </Box>
            <Box item xs={12} sm={6}>
                <TextField fullWidth label="Phone Number" defaultValue="+91 70349 85827" />
            </Box> */}

            {/* Country/Region, State, and Pin Code */}
            {/* <Box item xs={12} sm={4}>
                <TextField fullWidth label="Country/Region" defaultValue="India" select>
                abc
                </TextField>
            </Box>
            <Box item xs={12} sm={4}>
                <TextField fullWidth label="States" defaultValue="Kerala" select>
                    laksjdlk
                </TextField>
            </Box>
            <Box item xs={12} sm={4}>
                <TextField fullWidth label="Pin Code" defaultValue="673570" />
            </Box> */}
        </Stack>
    );
};

export default ProfileForm;
