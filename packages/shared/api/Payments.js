import { get, api, url, payments } from './constants/Constants';

export async function getPaymentUrl(amount, pub) {
    try {
        const response = await api.get(`${url}${payments}`, {
            params: {
                amount: amount,
                bankCode: 'NCB'
            }
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}


