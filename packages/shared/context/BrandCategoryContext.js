import { create } from "zustand";
import { searchBrands } from "../api/Brands";
import { searchCategories} from "../api/Categories";
import { categories } from "@shared-api/constants/Constants";

const allPageable = {page:0, size: 50, sort: 'name,asc',}

export const useGlobalBrandCategoryContext = create((set, get) => ({
    brandsMap:{},
    categoriesMap:{},
    brands: [],
    categories: [],
    setBrands: (brands) => set({ brands }),
    setCategories: (categories) => set({ categories }),
    loadBrands: async (pub) => {
        const response = await searchBrands(allPageable,[],pub);
        if (response) {
            set({ brands: response.data });
            set({ brandsMap: response.data.reduce((acc, brand) => {
                acc[brand.id] = brand;
                return acc;
            }, {}) });
            return true;
        }
        return false;
    },
    loadCategories: async (pub) => {
        const response = await searchCategories(allPageable,[],pub);
        if (response) {
            set({ categories: response.data });
            set({ categoriesMap: response.data.reduce((acc, category) => {
                acc[category.id] = category;
                return acc;
            }, {}) });
            return true;
        }
        return false;
    },
    
}));