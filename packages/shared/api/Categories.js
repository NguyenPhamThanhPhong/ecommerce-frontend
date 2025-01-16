import { get, api, toForm, url, form, categories, categoriesSearches } from './constants/Constants';

export async function getCategory(code, pub) {
    try {
        const response = await api.get(`${url}${categories}/${code}`);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function searchCategories(pageable, filters, pub) {
    try {
        const response = await api.post(`${url}${categoriesSearches}`, filters || [], {
            params: { ...pageable }
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function createCategory(data, pub) {
    try {
        const response = await api.post(`${url}${categories}`, toForm(data), {
            headers: form
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function updateCategory(data, pub) {
    try {
        const response = await api.put(`${url}${categories}`, toForm(data), {
            headers: form
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function deleteCategory(id, pub) {
    try {
        const response = await api.delete(`${url}${categories}/${id}`);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

