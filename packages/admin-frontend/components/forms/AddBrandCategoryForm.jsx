import { Box } from '@mui/material'
import React from 'react'

import { useEffect, useState } from 'react'
import { isEmpty, isNotEmpty, isEmail, isPhoneNumber, validateForm, handleFileChange } from '@shared-utils/ValidationUtils';
import { FormAlert, FormDatePicker, FormImagePicker, FormMultiSelect, FormSelect, FormTextBox } from '@shared-src/InputAssets'

export function useBrandCategoryForm({id, name, description, email, image, }) {
    const [formValues, setFormValues] = useState({
        name: name || '',
        description: description || '',
        image: image || null,
        email: email || '',
    });
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertProps, setAlertProps] = useState({ message: 'error', severity: 'error' });

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        image: '',

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
        rows: 3,
        formSx: { gap: 1, width: '100%' },
        multiline: true,
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
        image: imageInput,
        alert: { alertVisible, ...alertProps },
        id: id
    };

}

