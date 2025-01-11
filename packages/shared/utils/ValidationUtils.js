import { useState } from 'react';
export function isEmpty(value) {
    return value === undefined || value === null || value === '';
}
export function isNotEmpty(value) {
    return !isEmpty(value);
}

export function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isPhoneNumber(value) {
    return /^\d{10}$/.test(value);
}

export function validateForm(name, value, setErrors, { field, required, numberOnly, email, isDate, upperBound }) {
    if (!isDate) {
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
        return true;
    } else {
        if (required && !value) {
            setErrors((prev) => ({ ...prev, [name]: `${field} is required.` }));
            if (upperBound && new Date(value) > upperBound) {
                setErrors((prev) => ({ ...prev, [name]: `${field} must be before ${upperBound}` }));
            }
            return false;
        }
        return true;
    }
}

export const handleFileChange = ({ setError, setAlertVisible, setImage, isSingle }) => (event) => {
    for (const file of event.target.files) {
        if (file) {
            console.log({
                file,
                size: file.size,
                type: file.type,
                setAlertVisible,
                isStartWith: file.type.startsWith('image/'),
                isGreaterThan: file.size > 2,
                setError,
                isSingle,
            })
            // Validate the file type (image only)
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file.');
                setAlertVisible(true); // Show alert
                return;
            }

            // Optional: Validate file size (e.g., max 2MB)
            if (file.size > 2) {
                setError('File size should be under 2MB.');
                setAlertVisible(true); // Show alert
                return;
            }

            setError('');
            setAlertVisible(false); // Hide alert if no error
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target.result);
            reader.readAsDataURL(file);
            if (isSingle) {
                return;
            }
        }
    }
}


export function validateCartShape(cart) {
    return Array.isArray(cart) &&
        cart.every(
            item => typeof item.id === 'string' && typeof item.quantity === 'number'
        );
}