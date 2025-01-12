import { create } from "zustand";
import { searchBrands } from "../api/Brands";
import { searchCategories} from "../api/Categories";

const allPageable = {page:0, size: 50, sort: 'name,asc',}

export const useGlobalBrandCategoryContext = create((set, get) => ({
    brands: {},
    categories: {},
    setBrands: (brands) => set({ brands }),
    setCategories: (categories) => set({ categories }),
    loadBrands: async (pub) => {
        const response = await searchBrands(allPageable,[],pub);
        if (response) {
            set({ brands: response.data });
            return true;
        }
        return false;
    },
    loadCategories: async (pub) => {
        const response = await searchCategories(allPageable,[],pub);
        if (response) {
            set({ categories: response.data });
            return true;
        }
        return false;
    },
    
}));