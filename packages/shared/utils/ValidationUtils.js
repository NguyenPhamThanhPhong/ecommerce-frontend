import { useState } from 'react';
import { toSimpleDate } from './ConverterUtils';
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

export function isDateBetween(value, lowerBound, upperBound) {
    const date = new Date(value);
    const lower = new Date(lowerBound);
    const upper = new Date(upperBound);
    return date >= lower && date <= upper;
}

export function isDateBefore(value, upperBound) {
    const date = new Date(value);
    const upper = new Date(upperBound);
    return date <= upper;
}
export function isDateAfter(value, lowerBound) {
    const date = new Date(value);
    const lower = new Date(lowerBound);
    return date >= lower;
}

export function isNumeric(value) {
    return value !== null && value !== undefined && value !== '' && !isNaN(value) && isFinite(value);
}

export function validateForm(name, value, setErrors, { field, required, numberOnly, email, isDate, upperBound, lowerBound }) {
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
        if (lowerBound !== undefined && lowerBound !== null && value < lowerBound) {
            setErrors((prev) => ({ ...prev, [name]: `${field} must be greater than ${lowerBound}.` }));
            return false;
        }
        if (upperBound !== undefined && upperBound !== null && value > upperBound) {
            setErrors((prev) => ({ ...prev, [name]: `${field} must be less than ${upperBound}.` }));
            return false;
        }
        return true;
    } else {
        if (required && !value) {
            setErrors((prev) => ({ ...prev, [name]: `${field} is required.` }));
            return false;
        }
        if (upperBound && value > upperBound) {
            setErrors((prev) => ({ ...prev, [name]: `value must be before ${toSimpleDate(upperBound)}` }));
            return false;
        }
        if (lowerBound && value < lowerBound) {
            setErrors((prev) => ({ ...prev, [name]: `value must be after ${toSimpleDate(lowerBound)}` }));
            return false;
        }
        return true;
    }
}

export const handleFileChange = ({ setError, setAlertVisible, setImage, isSingle }) => (event) => {
    console.log(event.target.files)
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
            console.log('file', file)
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file.');
                setAlertVisible(true); // Show alert
                return;
            }
            // // Optional: Validate file size (e.g., max 2MB)
            // if (file.size > 120000000) {
            //     setError('File size should be under 2MB.');
            //     setAlertVisible(true); // Show alert
            //     return;
            // }
            setError('');
            setAlertVisible(false); // Hide alert if no error
            setImage(file);  // Store the file directly, not Base64 string

        }
    }
}


export function validateCartShape(cart) {
    return Array.isArray(cart) &&
        cart.every(
            item => typeof item.id === 'string' && typeof item.quantity === 'number'
        );
}
