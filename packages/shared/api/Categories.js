import { get, api, toForm, url, form, categories, categoriesSearches } from './constants/Constants';

export async function getCategory(code, pub) {
    try {
        const response = await api.get(`${url}${categories}/${code}`);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function searchCategoriess(pageable, filters, pub) {
    try {
        const response = await api.post(`${url}${categoriesSearches}`, filters || [], {
            params: { ...pageable }
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function createCategories(data, pub) {
    try {
        const response = await api.post(`${url}${categories}`, toForm(data), {
            headers: form
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function updateCategories(id, data, pub) {
    try {
        const response = await api.patch(`${url}${categories}/${id}`, toForm(data), {
            headers: form
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function deleteCategories(id, pub) {
    try {
        const response = await api.delete(`${url}${categories}/${id}`);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

