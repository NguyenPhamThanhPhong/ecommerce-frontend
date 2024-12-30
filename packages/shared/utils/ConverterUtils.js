
export function toLocaleString(value) {
    return value.toLocaleString('en-US');
}

export function toLocaleFixedString(value, digits = 2) {
    return value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function toPercentage(value, digits = 2) {
    return (value * 100).toFixed(digits) + '%';
}

export function trimString(value, length = 30) {
    return value.length > length ? value.substring(0, length) + '...' : value;
}

export function arraysToString(value) {
    return value.join(', ');
}