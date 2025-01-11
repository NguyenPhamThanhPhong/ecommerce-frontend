import { create } from 'zustand';
import { validateCartShape } from '../utils/ValidationUtils';
export const useGlobalCartContext = create((set, get) => ({
    cart: [],
    coupon: '',
    length: 0,
    setCart: (cart) => set({ cart }),
    setCoupon: (coupon) => set({ coupon }),
    addToCart: (id, quantity) => {
        const newCart = get().cart;
        if(newCart?.length>0){
            const item = newCart.find((item) => item.id === id);
            if (item) {
                item.quantity = quantity;
                set({ cart: newCart });
                localStorage.setItem('cart', JSON.stringify(newCart));
                return;
            }
        }
        newCart.push({id, quantity});
        // console.log('newCart', newCart);
        set({ cart: newCart,length: newCart.length });
        localStorage.setItem('cart', JSON.stringify(newCart));
    },
    removeFromCart: (productId) => {
        const newCart = get().cart.filter((item) => item.id !== productId);
        set({ cart: newCart,length: newCart.length });
        localStorage.setItem('cart', JSON.stringify(newCart));
    },
    saveLocalStorage: () => {
        if (!validateCartShape(get().cart)) return;
        localStorage.setItem('cart', JSON.stringify(get().cart));
    },
    loadLocalStorage: () => {
        const storedCartStr = localStorage.getItem('cart');
        // console.log('storedCartStr', storedCartStr);
        const storedCart = JSON.parse(storedCartStr);
        if(!validateCartShape(storedCart)) return;
        // console.log('storedCart', storedCart);

        if (storedCart) {
            set({ cart: storedCart });
        }
    },
    clearCart: () => {
        set({ cart: [] });
        localStorage.removeItem('cart');
    },
}));