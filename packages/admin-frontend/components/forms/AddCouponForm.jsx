import { Box } from '@mui/material'
import React from 'react'

import { useEffect, useState } from 'react'
import { isEmpty, isNotEmpty, isEmail, isPhoneNumber, validateForm, handleFileChange } from '@shared-utils/ValidationUtils';
import { FormAlert, FormDatePicker, FormImagePicker, FormMultiSelect, FormNumberInput, FormSelect, FormTextBox } from '@shared-src/InputAssets'
import { createCoupons, getCoupon, updateCoupons } from '@shared-api/Coupons';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';

export function useCouponForm({ isUpdate }) {
    const [coupon, setCoupon] = useState({});
    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        usageLimit: 0,
        couponType: 'PERCENT',
        value: 0,
        email: '',
    });
    const pub = useSnackbarStore(state => state.pub);
    const [alertVisible, setAlertVisible] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        usageLimit: '',
        couponType: '',
        value: '',
        email: '',
    });

    const handleInputChange = (conditions) => (e) => {
        const { name } = conditions;
        const { value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        if (!validateForm(name, value, setErrors, conditions)) {
            return false;
        }
        setErrors((prev) => ({ ...prev, [name]: '' }));
        return true;
    };

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
            setFormValues(coupon);
            return;
        }

        setFormValues({
            name: '',
            description: '',
            usageLimit: 0,
            couponType: 'PERCENT',
            value: 0,
            email: '',
        });
        setErrors({
            name: '',
            description: '',
            usageLimit: '',
            couponType: '',
            value: '',
            email: '',
        });
    }

    function submitCreate() {
        const request = {
            name: formValues.name,
            description: formValues.description,
            usageLimit: formValues.usageLimit,
            couponType: formValues.couponType,
            value: formValues.value,
            email: formValues.email,
        }
        createCoupons(request, pub).then((response) => {
            if (response.status === 200) {
                setAlertVisible(true);
                reset();
            }
        }).catch((error) => {
            console.log('error', error);
        });
    }
    function submitUpdate() {
        const request = {
            id: coupon?.id,
            name: formValues.name,
            description: formValues.description,
            usageLimit: formValues.usageLimit,
            couponType: formValues.couponType,
            value: formValues.value,
            email: formValues.email,
        }
        updateCoupons(request, pub).then((response) => {
            if (response.status === 200) {
                setAlertVisible(true);
                reset();
            }
        }).catch((error) => {
            console.log('error', error);
        })
    }

    function loadCoupon(code) {
        getCoupon(code, pub).then((response) => {
            if (response) {
                setCoupon(response);
                setFormValues(response)
            }
        }).catch((error) => {
            console.log('error', error);
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
    const descriptionInput = {
        label: 'Description Name',
        value: formValues.description,
        name: 'description',
        Component: FormTextBox,
        onChange: handleInputChange({ name: 'description', }),
        error: errors.description !== '',
        errorText: errors.description,
        rows: 3,
        formSx: { gap: 1, width: '100%' },
        multiline: true,
    }
    const usageLimitInput = {
        label: 'Usage Limit',
        value: formValues.usageLimit,
        name: 'usageLimit',
        Component: FormNumberInput,
        onChange: handleInputChange({ name: 'usageLimit', }),
        error: errors.usageLimit !== '',
        errorText: errors.usageLimit,
        formSx: { gap: 1, width: '100%', mb: 1 },
    }
    const couponTypeInput = {
        label: 'Coupon Type',
        value: formValues.couponType,
        name: 'couponType',
        Component: FormSelect,
        onChange: handleInputChange({ name: 'couponType', }),
        error: errors.couponType !== '',
        errorText: errors.couponType,
        formSx: { gap: 1, width: '100%', mb: 1 },
        options: [
            { value: 'PERCENT', label: 'Percent' },
            { value: 'FIXED', label: 'Fixed' },
        ],
    }
    const valueInput = {
        label: 'Value',
        value: formValues.value,
        name: 'value',
        Component: FormNumberInput,
        onChange: handleInputChange({ name: 'value', }),
        error: errors.value !== '',
        errorText: errors.value,
        formSx: { gap: 1, width: '100%', mb: 1 },
    }



    return {
        formValues, errors,
        name: nameInput,
        description: descriptionInput,
        usageLimit: usageLimitInput,
        couponType: couponTypeInput,
        value: valueInput,
        submitCreate,
        submitUpdate,
        loadCoupon,
        reset,
    };

}

