import { get, api, toForm, url, form, brands, brandsSearches } from './constants/Constants';

export async function getBrand(code, pub) {
    try {
        const response = await api.get(`${url}${brands}/${code}`);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function searchBrands(pageable, filters, pub) {
    try {
        const response = await api.post(`${url}${brandsSearches}`, filters || [], {
            params: { ...pageable }
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function createBrand(data, pub) {
    try {
        const response = await api.post(`${url}${brands}`, toForm(data), {
            headers: form
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function updateBrand(data, pub) {
    try {
        const response = await api.put(`${url}${brands}`, toForm(data));
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function deleteBrand(id, pub) {
    try {
        const response = await api.delete(`${url}${brands}/${id}`, {});
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

