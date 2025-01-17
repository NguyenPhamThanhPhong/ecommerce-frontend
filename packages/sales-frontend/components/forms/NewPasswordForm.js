import { LoginSignupTextBox } from "@components/common/CommonInputs";
import { Email } from "@mui/icons-material";
import { isEmpty, isEmail, isPhoneNumber } from '@shared-utils/ValidationUtils';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export const useNewPasswordForm = () => {
    const [formValues, setFormValues] = useState({
        otp: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        otp: '',
        password: '',
        confirmPassword: '',
    });

    const handleTextChange = ({ field, required, otp,confirmPassword  }) => (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));

        if (required && isEmpty(value)) {
            setErrors((prev) => ({ ...prev, [name]: `${field} is required.` }));
            return false;
        }
        if(confirmPassword && value !== formValues.password){
            setErrors((prev) => ({ ...prev, [name]: 'Passwords do not match' }));
            return false;
        }
        if(otp && (!isPhoneNumber(value) || value.length !== 6)){
            setErrors((prev) => ({ ...prev, [name]: 'Please enter a valid 6 digits number' }));
            return false;
        }
        setErrors((prev) => ({ ...prev, [name]: '' }));
        return true;
    };

    const otpInput = {
        label: 'OTP',
        value: formValues.otp,
        name: 'otp',
        placeHolder: 'Enter your OTP',
        icon: 'otp',
        Component: LoginSignupTextBox,
        onChange: handleTextChange({ field: 'OTP', required: true }),
        error: errors.otp !== '',
        errorText: errors.otp,
        required: true
    };

    const passwordInput = {
        label: 'Password',
        value: formValues.password,
        name: 'password',
        placeHolder: 'Enter your password',
        icon: 'password',
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
        placeHolder: 'Confirm your password',
        icon: 'password',
        Component: LoginSignupTextBox,
        onChange: handleTextChange({ field: 'Confirm Password', required: true, confirmPassword: true }),
        password: true,
        error: errors.confirmPassword !== '',
        errorText: errors.confirmPassword,
        required: true
    }


    return {
        formValues,
        errors,
        otp: otpInput,
        password: passwordInput,
        confirmPassword: confirmPasswordInput
    };
};