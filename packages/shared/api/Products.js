import { headers } from 'next/headers';
import { get, api, products, productsSearches, toForm, url, form, productsFavorites, createPageable } from './constants/Constants';

export async function createProduct(data, pub) {
    try {
        const response = await api.post(`${url}${products}`, toForm(data), {
            headers: form
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function getProduct(code, pub) {
    try {
        pub('Fetching product: ' + `${url}${products}/${code}`, 'info');
        const response = await api.get(`${url}${products}/${code}`);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function getProducts(ids, pub) {
    try {
        const response = await api.get(`${url}${products}`, {
            params: { ids: ids, ...createPageable(0, 20, "name,asc") }
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function updateProduct(id, data, pub) {
    try {
        const response = await api.patch(`${url}${products}/${id}`, data);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function searchProducts(pageable, filters, pub) {
    try {
        const response = await api.post(`${url}${productsSearches}`, filters || [], {
            params: { ...pageable }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        pub(get(error), 'error');
    }
}

export async function deleteProduct(id, pub) {
    try {
        const response = await api.delete(`${url}${products}/${id}`, {

        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function likeProduct(id, pub) {
    try {
        const response = await api.put(`${url}${productsFavorites}`, {}, {
            params: { productId: id }
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function unlikeProduct(id, pub) {
    try {
        const response = await api.delete(`${url}${productsFavorites}`, {
            params: { productId: id }
        });
        return response.data;
    }
    catch (error) {
        pub(get(error), 'error');
    }
}

export async function getFavoriteProducts(pageable, pub) {
    try {
        const response = await api.get(`${url}${productsFavorites}`, {
            params: { ...pageable }
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}