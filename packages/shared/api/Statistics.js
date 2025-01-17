import { api, get,statistics, statisticsMeOrders, url } from './constants/Constants';

export async function getStatistics(pub) {
    try {
        const response = await api.get(`${url}${statisticsMeOrders}`);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function getDashboardStatistics(pub){
    try {
        const response = await api.get(`${url}${statistics}`);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}