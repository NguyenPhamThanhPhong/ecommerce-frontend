import { get, api, toForm, url, form, orders, ordersSearches } from './constants/Constants';

export async function getOrder(code, pub) {
    try {
        const response = await api.get(`${url}${orders}/${code}`);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function getSelfOrders(pageable, pub) {
    try {
        const response = await api.get(`${url}${orders}`, {
            params: { ...pageable }
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function searchOrders(pageable, filters, pub) {
    try {
        const response = await api.post(`${url}${ordersSearches}`, filters || [], {
            params: { ...pageable }
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function createOrders(data, pub) {
    try {
        const response = await api.post(`${url}${orders}`, toForm(data), {
            headers: form
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function updateOrders(id, data, pub) {
    try {
        const response = await api.patch(`${url}${orders}/${id}`, toForm(data), {
            headers: form
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function deleteOrders(id, pub) {
    try {
        const response = await api.delete(`${url}${orders}/${id}`, {
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

