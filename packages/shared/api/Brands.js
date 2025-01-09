import { get, api, toForm, url, form, brands, brandsSearches } from './constants/Constants';

export async function getBrand(code, pub) {
    try {
        const response = await api.get(`${url}${brands}/${code}`);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function searchBrandss(pageable, filters, pub) {
    try {
        const response = await api.post(`${url}${brandsSearches}`, filters || [], {
            params: { ...pageable }
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function createBrands(data, pub) {
    try {
        const response = await api.post(`${url}${brands}`, toForm(data), {
            headers: form
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function updateBrands(id, data, pub) {
    try {
        const response = await api.patch(`${url}${brands}/${id}`, toForm(data));
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function deleteBrands(id, pub) {
    try {
        const response = await api.delete(`${url}${brands}/${id}`, {});
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

