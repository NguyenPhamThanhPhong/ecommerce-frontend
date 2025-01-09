import { LoginSignupTextBox } from "@components/common/CommonInputs";
import { Email } from "@mui/icons-material";
import { isEmpty, isEmail, isPhoneNumber } from '@shared-utils/ValidationUtils';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export const useSignupForm = ({ name, email, password, confirmPassword }) => {
    const [formValues, setFormValues] = useState({
        name: name || '',
        email: email || '',
        password: password || '',
        confirmPassword: confirmPassword || '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleTextChange = ({ field, required, numberOnly, email, matching }) => (e) => {
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
        if (matching && value !== formValues.password) {
            setErrors((prev) => ({ ...prev, [name]: 'Passwords do not match' }));
            return false;
        }
        setErrors((prev) => ({ ...prev, [name]: '' }));
        return true;
    };

    const nameInput = {
        label: 'Full Name',
        value: formValues.name,
        name: 'name',
        placeHolder: 'Enter your full name',
        icon: <PersonIcon color="white" />,
        Component: LoginSignupTextBox,
        onChange: handleTextChange({ field: 'Name', required: true }),
        error: errors.name !== '',
        errorText: errors.name,
        required: true
    };
    const emailInput = {
        label: 'Email',
        value: formValues.email,
        name: 'email',
        placeHolder: 'Enter your full name',
        icon: <Email color="white" />,
        Component: LoginSignupTextBox,
        onChange: handleTextChange({ field: 'Email', required: true }),
        error: errors.email !== '',
        errorText: errors.email,
        required: true
    };

    const passwordInput = {
        label: 'Password',
        value: formValues.password,
        name: 'password',
        placeHolder: 'Enter your full name',
        icon: <LockIcon color="white" />,
        Component: LoginSignupTextBox,
        onChange: handleTextChange({ field: 'Password', required: true }),
        password: true,
        error: errors.password !== '',
        errorText: errors.password,
        required: true
    };

    const confirmPasswordInput = {
        label: 'Confirm Password',
        value: formValues.confirmPassword,
        name: 'confirmPassword',
        placeHolder: 'Enter your full name',
        icon: <VpnKeyIcon color="white" />,
        Component: LoginSignupTextBox,
        onChange: handleTextChange({ field: 'Confirm Password', required: true, matching: true }),
        password:true,
        error: errors.confirmPassword !== '',
        errorText: errors.confirmPassword,
        required: true
    }



    return {
        formValues,
        errors,
        name: nameInput,
        email: emailInput,
        password: passwordInput,
        confirmPassword: confirmPasswordInput
    };
};