import { useEffect, useState } from 'react'
import { isEmpty, isNotEmpty, isEmail, isPhoneNumber, validateForm, handleFileChange } from '@shared-utils/ValidationUtils';
import { FormAlert, FormDatePicker, FormImagePicker, FormMultiSelect, FormSelect, FormTextBox } from '@shared-src/InputAssets'

export function useCustomerForm({ name, description, email, birthDate, image, phone, password, confirmPassword }) {
    const [formValues, setFormValues] = useState({
        name: name || '',
        description: description || '',
        email: email || '',
        image: image || null,
        birthDate: birthDate || new Date(),
        phone: phone || '099999',
        password: password || '',
        confirmPassword: confirmPassword || '',

    });
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertProps, setAlertProps] = useState({ message: 'error', severity: 'error' });

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        email: '',
        image: '',
        birthDate: '',
        phone: '',
        password: '',
        confirmPassword: '',
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

    const nameInput = {
        label: 'Name',
        value: formValues.name,
        name: 'name',
        Component: FormTextBox,
        onChange: handleInputChange({ field: 'Name', required: true }),
        error: errors.name !== '',
        errorText: errors.name,
        width: '100%',
        formSx: { gap: 1, width: '100%', mb: 1 },
        required: true,
    }
    const descriptionInput = {
        label: 'Description Name',
        value: formValues.description,
        name: 'description',
        Component: FormTextBox,
        onChange: handleInputChange({}),
        error: errors.description !== '',
        errorText: errors.description,
        rows: 2,
        formSx: { gap: 1, width: '100%' },
        multiline: true,
    }
    const emailInput = {
        label: 'Email',
        value: formValues.email,
        name: 'email',
        Component: FormTextBox,
        onChange: handleInputChange({ field: 'Email', required: true, validator: isEmail }),
        error: errors.email !== '',
        errorText: errors.email,
        formSx: { gap: 1, width: '100%', mb: 1 },
    }

    const passwordInput = {
        label: 'Password',
        value: formValues.password,
        name: 'password',
        Component: FormTextBox,
        onChange: handleInputChange({}),
        error: errors.password !== '',
        errorText: errors.password,
        formSx: { gap: 1, width: '100%' },
    }
    const confirmPasswordInput = {
        label: 'Confirm Password',
        value: formValues.confirmPassword,
        name: 'confirmPassword',
        Component: FormTextBox,
        onChange: handleInputChange({}),
        error: errors.confirmPassword !== '',
        errorText: errors.confirmPassword,
        formSx: { gap: 1, width: '100%' },
    }
    const phoneInput = {
        label: 'Phone',
        value: formValues.phone,
        name: 'phone',
        Component: FormTextBox,
        onChange: handleInputChange({ field: 'Phone', required: true }),
        error: errors.phone !== '',
        errorText: errors.phone,
        formSx: { gap: 1, width: '100%', mb: 1 },
    }
    const birthDateInput = {
        label: 'Birth Date',
        value: formValues.birthDate,
        name: 'birthDate',
        Component: FormDatePicker,
        onChange: handleInputChange({ field: 'Birth Date', isDate: true, required: true }),
        error: errors.birthDate !== '',
        errorText: errors.birthDate,
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
        description: descriptionInput,
        email: emailInput,
        phone: phoneInput,
        password: passwordInput,
        confirmPassword: confirmPasswordInput,
        birthDate: birthDateInput,
        alert: { alertVisible, ...alertProps },
        image: imageInput
    };

}

