'use client'

import { create } from 'zustand';

export const useMyDataStore = (data) => {
    return create((set, get) => ({
        data: data,
        setData: (data) => set({ data }),
    }));
}