import { useEffect, useState } from 'react';
import { getAccountMe, login, updateAccount, updateAddresses } from '../api/Accounts';
import { useSnackbarStore } from './SnackbarContext';
import { dateBetween } from '../api/constants/Filters';
import { getStatistics } from '../api/Statistics';
import { create } from 'zustand';

export function useAccountDetailContext({ detail, }) {
    const { pub } = useSnackbarStore();
    const [account, setAccount] = useState(detail);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalPurchases, setTotalPurchases] = useState(0);

    useEffect(() => {
        pub('Account Context Initialized', 'info');
    }, []);

    const loadAccount = async () => {
        const response = await getAccountMe(pub);
        if (response) {
            setAccount(response.data);
        }
    }
    const loadStatistics = async () => {
        const response = await getStatistics(pub);
        if (response) {
            setTotalOrders(response.data?.totalOrders);
            setTotalPurchases(response.data?.totalPurchases);
        }
    }

    return {
        account,
        totalOrders, totalPurchases,
        loadAccount,
        loadStatistics
    }
}

export const useGlobalAccountContext = create((set, get) => ({
    account: {},
    totalOrders: 0,
    totalPurchases: 0,
    setAccount: (account) => set({ account }),
    loadAccount: async (pub) => {
        const response = await getAccountMe(pub);
        if (response) {
            set({ account: response.data });
            return true;
        }
        return false;
    },
    updateProfile: async (data, pub) => {
        const response = await updateAccount(data, pub);
        if (response) {
            const newAcc = get().account;
            newAcc.profile = response;
            set({ account: newAcc });
            pub('Profile updated successfully', 'success');
        }
    },
    login: async (data, pub) => {
        const response = await login(data, pub);
        if (response) {
            set({ account: response.data });
            return true;
        }
        return false;
    },
    loadStatistics: async (pub) => {
        const response = await getStatistics(pub);
        if (response) {
            set({ totalOrders: response.data?.totalOrders, totalPurchases: response.data?.totalPurchases });
            return true;
        }
        return false;
    },
    changeAddress: async (primaryAddress, addresses, pub) => {
        const response = await updateAddresses({ primaryAddress, addresses }, pub);
        console.log('response', response)
        if (response.status === 200) {
            const newAcc = get().account;
            newAcc.profile.primaryAddress = primaryAddress;
            newAcc.profile.addresses = addresses;
            console.log('newAcc', newAcc.profile)
            set({ account: newAcc });
            return true;
        }
        return false;
    }

}));