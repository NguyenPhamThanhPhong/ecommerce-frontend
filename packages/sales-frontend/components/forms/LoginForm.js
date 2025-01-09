import { LoginSignupTextBox } from "@components/common/CommonInputs";
import { Email } from "@mui/icons-material";
import { isEmpty, isEmail, isPhoneNumber } from '@shared-utils/ValidationUtils';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export const useLoginForm = ({email, password }) => {
    const [formValues, setFormValues] = useState({
        email: email || '',
        password: password || '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleTextChange = ({ field, required, email,  }) => (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));

        if (required && isEmpty(value)) {
            setErrors((prev) => ({ ...prev, [name]: `${field} is required.` }));
            return false;
        }
        if (email && !isEmail(value)) {
            setErrors((prev) => ({ ...prev, [name]: 'Please enter a valid email.' }));
            return false;
        }
        setErrors((prev) => ({ ...prev, [name]: '' }));
        return true;
    };

    const emailInput = {
        label: 'Email',
        value: formValues.email,
        name: 'email',
        placeHolder: 'Enter your Email',
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
        placeHolder: 'Enter your password',
        icon: <LockIcon color="white" />,
        Component: LoginSignupTextBox,
        onChange: handleTextChange({ field: 'Password', required: true }),
        password: true,
        error: errors.password !== '',
        errorText: errors.password,
        required: true
    };


    return {
        formValues,
        errors,
        email: emailInput,
        password: passwordInput,
    };
};