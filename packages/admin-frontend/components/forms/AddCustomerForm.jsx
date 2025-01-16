import { useEffect, useState } from 'react'
import { isEmpty, isNotEmpty, isEmail, isPhoneNumber, validateForm, handleFileChange } from '@shared-utils/ValidationUtils';
import { FormAlert, FormDatePicker, FormImagePicker, FormMultiSelect, FormSelect, FormTextBox } from '@shared-src/InputAssets'
import { minus20Years, plus20Years } from '@shared-utils/CalculationUtils';
import CreateCustomer from 'pages/customers/add-customer';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { createAccount } from '@shared-api/Accounts';

export function useCustomerForm({ }) {
    const pub = useSnackbarStore(state => state.pub);
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        image: null,
        birthDate: new Date(),
        phone: '0',
        password: '',

    });
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertProps, setAlertProps] = useState({ message: 'error', severity: 'error' });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        image: '',
        birthDate: '',
        phone: '',
        password: '',
    });

    const handleInputChange = (conditions) => (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        if (!validateForm(name, value, setErrors, conditions)) {
            return false;
        }
        setErrors((prev) => ({ ...prev, [name]: '' }));
        return true;
    };
    const onFileChange = handleFileChange({
        setError: (error) => setErrors((prev) => ({ ...prev, image: error })),
        setAlertVisible,
        setImage: (image) => setFormValues((prev) => ({ ...prev, image })),
        isSingle: true,
    });
    function reset() {
        setFormValues({
            name: '',
            email: '',
            image: null,
            birthDate: new Date(),
            phone: '',
            password: '',
        });
    }
    // Timeout effect for alert visibility
    useEffect(() => {
        if (alertVisible) {
            const timeout = setTimeout(() => {
                setAlertVisible(false); // Hide alert after 3 seconds
            }, 3000); // 3000ms = 3 seconds
            console.log('alertVisible', alertVisible);
            // Clear the timeout if error changes or alert is dismissed
            return () => clearTimeout(timeout);
        }
    }, [alertVisible]);

    function submit() {
        const request = {
            email: formValues.email,
            password: formValues.password,
            enableDate: minus20Years(),
            disableDate: plus20Years(),
            isVerified: true,
            role: 'ROLE_CUSTOMER',
            profile: {
                fullName: formValues.name,
                avatar: formValues.image,
                phone: formValues.phone,
                dateOfBirth: formValues.birthDate,
            }
        }
        createAccount(request, pub).then((res) => {
            if (res) {
                pub('Customer created successfully', 'success');
                reset();
            }
        });
    }



    const nameInput = {
        label: 'Name',
        value: formValues.name,
        name: 'name',
        Component: FormTextBox,
        onChange: handleInputChange({ name: 'name', field: 'Name', required: true }),
        error: errors.name !== '',
        errorText: errors.name,
        width: '100%',
        formSx: { gap: 1, width: '100%', mb: 1 },
        required: true,
    }

    const emailInput = {
        label: 'Email',
        value: formValues.email,
        name: 'email',
        Component: FormTextBox,
        onChange: handleInputChange({ name: 'email', field: 'Email', required: true, validator: isEmail }),
        error: errors.email !== '',
        errorText: errors.email,
        formSx: { gap: 1, width: '100%', mb: 1 },
        required: true,
    }

    const passwordInput = {
        label: 'Password',
        value: formValues.password,
        name: 'password',
        Component: FormTextBox,
        onChange: handleInputChange({ name: 'password', }),
        error: errors.password !== '',
        errorText: errors.password,
        formSx: { gap: 1, width: '100%' },
        required: true
    }

    const phoneInput = {
        label: 'Phone',
        value: formValues.phone,
        name: 'phone',
        Component: FormTextBox,
        onChange: handleInputChange({ name: 'phone', field: 'Phone', required: true, numberOnly: true }),
        error: errors.phone !== '',
        errorText: errors.phone,
        formSx: { gap: 1, width: '100%', mb: 1 },
    }
    const birthDateInput = {
        label: 'Birth Date',
        value: formValues.birthDate,
        name: 'birthDate',
        Component: FormDatePicker,
        onChange: handleInputChange({ name: 'birthDate', field: 'Birth Date', isDate: true, required: true }),
        error: errors.birthDate !== '',
        errorText: errors.birthDate,
        formSx: { gap: 1 },

    }
    const imageInput = {
        label: 'Image',
        value: formValues.image,
        name: 'image',
        Component: FormImagePicker,
        onChange: onFileChange,
        error: errors.image !== '',
        errorText: errors.image,
        formSx: { gap: 1, width: '100%' },
    }


    return {
        formValues, errors,
        name: nameInput,
        email: emailInput,
        phone: phoneInput,
        password: passwordInput,
        birthDate: birthDateInput,
        alert: { alertVisible, ...alertProps },
        submit, reset,
        image: imageInput
    };
}

