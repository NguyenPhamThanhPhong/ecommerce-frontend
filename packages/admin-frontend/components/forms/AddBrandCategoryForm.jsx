import { Box } from '@mui/material'
import React from 'react'

import { useEffect, useState } from 'react'
import { isEmpty, isNotEmpty, isEmail, isPhoneNumber, validateForm, handleFileChange } from '@shared-utils/ValidationUtils';
import { FormAlert, FormDatePicker, FormImagePicker, FormMultiSelect, FormSelect, FormSimpleThumbnailPicker, FormTextBox } from '@shared-src/InputAssets'
import { createBrand, getBrand, updateBrand } from '@shared-api/Brands';
import { createCategory, getCategory, updateCategory } from '@shared-api/Categories';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';

export function useBrandCategoryForm({ isUpdate, brand, category }) {
    const [initial, setInitial] = useState({})
    const pub = useSnackbarStore((state) => state.pub);
    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        email: '',
    });
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertProps, setAlertProps] = useState({ message: 'error', severity: 'error' });

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        email: '',
    });
    const [thumbnail, setThumbnail] = useState({ type: 'url', value: '' });

    const handleInputChange = (conditions) => (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        if (!validateForm(name, value, setErrors, conditions)) {
            return false;
        }
        setErrors((prev) => ({ ...prev, [name]: '' }));
        return true;
    };

    function validate() {
        let valid = true;
        Object.keys(formValues).forEach((key) => {
            if (key === 'image') {
                return;
            }
            if (isEmpty(formValues[key])) {
                setErrors((prev) => ({ ...prev, [key]: 'This field is required' }));
                valid = false;
            }
        });
        return valid;
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

    function reset() {
        if (isUpdate) {
            setFormValues({
                name: initial.name,
                description: initial.description,
                email: initial.email,
            })
            setThumbnail({ type: 'url', value: initial.imageUrl });
            return;
        }
        setFormValues({
            name: '',
            description: '',
            email: '',
        });
        setErrors({
            name: '',
            description: '',
        });
        setThumbnail({ type: 'url', value: null });
    }

    function submitCreate() {
        const valid = validate();
        if (!valid) {
            const errorText = Object.values(errors).filter(isNotEmpty).join('\n');
            pub(errorText, 'error');
        }
        const request = {
            name: formValues.name,
            description: formValues.description,
            image: typeof thumbnail?.value === 'string' ? null : thumbnail?.value,
        }
        if (brand) {
            createBrand(request, pub).then((res) => {
                if (res) {
                    reset();
                    pub('Brand created successfully', 'success');
                }
            });
        } else if (category) {
            createCategory(request, pub).then((res) => {
                if (res) {
                    reset();
                    pub('Category created successfully', 'success');
                }
            });
        }
    }
    function submitUpdate() {
        const valid = validate();
        if (!valid) {
            const errorText = Object.values(errors).filter(isNotEmpty).join('\n');
            pub(errorText, 'error');
        }
        const request = {
            id: initial?.id,
            name: formValues.name,
            description: formValues.description,
            image: typeof thumbnail?.value === 'string' ? null : thumbnail?.value,
        }
        if (brand) {
            updateBrand(request, pub).then((res) => {
                if (res) {
                    reset();
                    pub('Brand updated successfully', 'success');
                }
            });
        } else if (category) {
            updateCategory(request, pub).then((res) => {
                if (res) {
                    reset();
                    pub('Category updated successfully', 'success');
                }
            });
        }
    }
    function load(code) {
        if (brand) {
            getBrand(code).then((res) => {
                if (res) {
                    setInitial(res);
                    setFormValues({
                        name: res.name,
                        description: res.description,
                    });
                    setThumbnail({ type: 'url', value: res.imageUrl });
                }
            });
        } else if (category) {
            getCategory(code).then((res) => {
                if (res) {
                    setInitial(res);
                    setFormValues({
                        name: res.name,
                        description: res.description,
                    });
                    setThumbnail({ type: 'url', value: res.imageUrl });
                }
            });
        }
    }


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
        value: thumbnail,
        name: 'image',
        Component: FormSimpleThumbnailPicker,
        onChange: setThumbnail,
        formSx: { gap: 1, width: '100%' },
    }


    return {
        formValues, errors,
        name: nameInput,
        description: descriptionInput,
        image: imageInput,
        submitCreate, submitUpdate, load, reset,
        alert: { alertVisible, ...alertProps },
    };

}

