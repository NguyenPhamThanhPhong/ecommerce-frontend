import { get, api,  url,orders, ordersSearches } from './constants/Constants';

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

export async function createOrder(data, pub) {
    try {
        const response = await api.post(`${url}${orders}`, data);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function updateOrders(id, data, pub) {
    try {
        const response = await api.patch(`${url}${orders}/${id}`, data, );
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function deleteOrder(id, pub) {
    try {
        const response = await api.delete(`${url}${orders}/${id}`, {
        });
        return response;
    } catch (error) {
        pub(get(error), 'error');
    }
}

