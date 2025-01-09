import { useSnackbarStore } from "@shared-conntext/SnackbarContext";
import axios from "axios";
import {  url } from './Constants';

export async function doom(data, pub) {
    try {
        const response = await api.get(`${url}/accounts/doom/${data}`);
        return response.data;
    } catch (error) {
        pub(get(error), 'error');
    }
}

export async function ping() {
    try {
        const response = await api.get(`${url}/accounts/phong`, {
            params: { search: "example" },
        });
        return response.data;
    } catch (error) {
        pub(get(error), 'error');

    }
}