import axios from 'axios';
export const url = 'http://localhost:8081';

export const accounts = "/accounts";
export const tokens = "/tokens";
export const accountsSearches = "/accounts/searches";
export const accountsMe = "/accounts/me";
export const accountAddresses = "/accounts/addresses";

export const blogs = "/blogs";
export const blogsSearches = "/blogs/searches";

export const categories = "/categories";
export const categoriesSearches = "/categories/searches";

export const brands = "/brands";
export const brandsSearches = "/brands/searches";

export const products = "/products";
export const productsSearches = "/products/searches";
export const productsFavorites = "/products/favorites";

export const coupons = "/coupons";
export const couponsSearches = "/coupons/searches";

export const orders = "/orders";
export const ordersSearches = "/orders/searches";

export const payments = "/payments";
export const paymentsVnpUrl = "/payments/vnpay-url";
export const paymentsVnpay = "/payments/vnpay";

export const statistics = "/statistics";


export const json = { 'Content-Type': 'application/json' };
export const form = { 'Content-Type': "multipart/form-data" };
export const testPlain = { 'Content-Type': 'text/plain' };

export const api = axios.create({
    timeout: 20000,
    withCredentials: true,
});

export function createPageable(page = 0, size = 10, sort = 'code,asc') {
    return { page: page, size: size, sort: sort };
}



export function toForm(obj) {
    const formData = new FormData();
    const stack = [{ value: obj, parentKey: null }];

    while (stack.length > 0) {
        const { value, parentKey } = stack.pop();

        if (value && typeof value === "object" && !(value instanceof File || value instanceof Blob)) {
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    stack.push({
                        value: item,
                        parentKey: `${parentKey}[${index}]`,
                    });
                });
            } else {
                for (const key in value) {
                    if (value.hasOwnProperty(key)) {
                        stack.push({
                            value: value[key],
                            parentKey: parentKey ? `${parentKey}[${key}]` : key,
                        });
                    }
                }
            }
        } else {
            formData.append(parentKey, value);
        }
    }

    return formData;
}


export const messages = {
    '401': 'You are Unauthorized',
    '403': 'Forbidden Action',
    '404': 'Not found',
    '500': 'Internal server error',
    '503': 'Service unavailable',
}

export function get(error) {
    const message = messages[error.status];
    if (message) {
        return message;
    }
    return "Something went wrong!";
}




/**
 * Fetches a person from the API.
 * @returns {Promise<Person>} A promise that resolves to a Person object.
 */
async function fetchPerson() {
    try {
        const response = await axios.get('https://api.example.com/person');
        /** @type {Person} */
        const person = response.data;
        return person;
    } catch (error) {
        console.error('Error fetching person:', error);
        throw error;
    }
}













