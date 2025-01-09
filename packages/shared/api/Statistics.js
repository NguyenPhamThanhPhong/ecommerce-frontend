import { get,statistics } from './constants/Constants';

export async function getStatistics(pub) {
    try {
        const response = await statistics.get();
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

