import { LoginSignupTextBox } from "@components/common/CommonInputs";
import { Email } from "@mui/icons-material";
import { isEmpty, isEmail, isPhoneNumber } from '@shared-utils/ValidationUtils';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export const useForgotPasswordForm = ({email, password }) => {
    const [formValues, setFormValues] = useState({
        email: email || '',
    });

    const [errors, setErrors] = useState({
        email: '',
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


    return {
        formValues,
        errors,
        email: emailInput,
    };
};