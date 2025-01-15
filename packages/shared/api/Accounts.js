import { get, api, accounts, accountsSearches, tokens, toForm, form, url, accountsMe, accountAddresses } from './constants/Constants';


export async function login(/** @type {LoginRequest} */data, pub) {
    try {
        const response = await api.post(`${url}${tokens}`, data);
        return response;
    } catch (error) {
        console.log(error)
        if (pub) {
            pub(error.message, 'error');
        }
    }
}

export async function createAccount(data, pub) {
    try {
        const response = await api.post(`${url}${accounts}`, toForm(data));
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function getAccount(id, pub) {
    try {
        const response = await api.get(`${url}${accounts}/${id}`);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function updateAccount(data, pub) {
    console.log('request', data);
    try {
        const response = await api.patch(`${url}${accounts}`, toForm(data), {
            headers: form
        });
        return response.data;
    } catch (error) {
        pub(
            get(error), 'error');
    }
}

export async function deleteAccount(id, pub) {
    try {
        const response = await api.delete(`${url}${accounts}/${id}`);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function searchAccounts(pageable, filters, pub) {
    try {
        const response = await api.post(`${url}${accountsSearches}`, filters, {
            params: { ...pageable }
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}


export async function getAccountMe(pub) {
    try {
        const response = await api.get(`${url}${accountsMe}`);
        return response;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function updateAddresses({ primaryAddress, addresses }, pub) {

    try {
        console.log(primaryAddress, addresses)
        const response = await api.put(`${url}${accountAddresses}`, addresses, { 
            params: {defaultAddress: primaryAddress}
         });
        return response;
    } catch (error) {
        pub(get(error), 'error');
    }
}






