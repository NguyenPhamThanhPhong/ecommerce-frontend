
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

// export function 