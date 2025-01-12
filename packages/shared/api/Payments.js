import { get, api, url, payments,paymentsVnpUrl, paymentsVnpay, textPlain } from './constants/Constants';

export async function getPaymentUrl({ orderId, bankCode, orderInfo, shippingAddress }, pub) {
    const body = {
        orderId,
        bankCode: bankCode || 'NCB',
        orderInfo: orderInfo || 'Thanh toán đơn hàng',
        shippingAddress: shippingAddress || ''
    }
    try {
        const response = await api.post(`${url}${paymentsVnpUrl}`,body , {
            headers: textPlain
        });
        return response;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function callbackPayment(data, pub) {
    try {
        const response = await api.put(`${url}${paymentsVnpay}`, data);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}
