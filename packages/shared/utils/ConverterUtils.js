
export function toLocaleString(value) {
    return value.toLocaleString('en-US');
}

export function toLocaleFixedString(value, digits = 2) {
    return value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function toPercentage(value, digits = 2) {
    return (value * 100).toFixed(digits) + '%';
}

export function fromIsoToSimpleDate(value) {
    return new Date(value).toLocaleDateString();
}

export function trimString(value, length = 30) {
    if(value === null || value === undefined) {
        return '';
    }
    return value.length > length ? value.substring(0, length) + '...' : value;
}

export function arraysToString(value) {
    return value.join(', ');
}

export function toSimpleDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }