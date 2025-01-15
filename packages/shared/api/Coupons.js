import { get, api, toForm, url, form, coupons, couponsSearches } from './constants/Constants';

export async function getCoupon(code, pub) {
    try {
        const response = await api.get(`${url}${coupons}/${code}`);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function searchCoupons(pageable, filters, pub) {
    try {
        const response = await api.post(`${url}${couponsSearches}`, filters || [], {
            params: { ...pageable }
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function createCoupons(data, pub) {
    try {
        const response = await api.post(`${url}`, data, {
            headers: form
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function updateCoupons(data, pub) {
    console.log(data);
    try {
        const response = await api.patch(`${url}${coupons}`,data);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function deleteCoupons(id, pub) {
    try {
        const response = await api.delete(`${url}${coupons}/${id}`, {
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

