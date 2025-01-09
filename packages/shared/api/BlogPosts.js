import { headers } from 'next/headers';
import { get, api, toForm, url, form, blogs, blogsSearches } from './constants/Constants';

export async function getBlogPost(code, pub) {
    try {
        const response = await api.get(`${url}${blogs}/${code}`);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function searchBlogPosts(pageable, filters, pub) {
    try {
        const response = await api.post(`${url}${blogsSearches}`, filters || [], {
            params: { ...pageable }
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function createBlogPost(data, pub) {
    try {
        const response = await api.post(`${url}${blogs}`, toForm(data), {
            headers: form
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function updateBlogPost(id, data, pub) {
    try {
        const response = await api.patch(`${url}${blogs}/${id}`, data);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function deleteBlogPost(id, pub) {
    try {
        const response = await api.delete(`${url}${blogs}/${id}`, {

        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}














